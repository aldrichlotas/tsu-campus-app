const puppeteer = require('puppeteer');
const fs = require('fs-extra');
const path = require('path');
const { URL } = require('url');

const TARGET_URL = 'https://www.tsu.edu.ph/academics/colleges/'; // Replace with your portal URL
const OUTPUT_DIR = path.join(__dirname, 'extracted_brand');
const LOGO_DIR = path.join(OUTPUT_DIR, 'logos');

async function extractBrandbook() {
  await fs.ensureDir(OUTPUT_DIR);
  await fs.ensureDir(LOGO_DIR);

  console.log(`[1/4] Launching browser and navigating to ${TARGET_URL}...`);
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(TARGET_URL, { waitUntil: 'networkidle2' });

  console.log('[2/4] Extracting color palette, typography, and theme variables...');
  
  const brandData = await page.evaluate(() => {
    // Helper: Convert RGB/RGBA to Hex
    const rgbToHex = (rgbStr) => {
      if (!rgbStr || rgbStr === 'transparent' || rgbStr === 'rgba(0, 0, 0, 0)') return null;
      const match = rgbStr.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)$/);
      if (!match) return rgbStr;
      const r = parseInt(match[1]).toString(16).padStart(2, '0');
      const g = parseInt(match[2]).toString(16).padStart(2, '0');
      const b = parseInt(match[3]).toString(16).padStart(2, '0');
      return `#${r}${g}${b}`.toUpperCase();
    };

    // 1. Extract CSS Custom Properties (:root variables)
    const cssVariables = {};
    for (const sheet of Array.from(document.styleSheets)) {
      try {
        for (const rule of Array.from(sheet.cssRules || [])) {
          if (rule.selectorText === ':root' || rule.selectorText === 'html') {
            const style = rule.style;
            for (let i = 0; i < style.length; i++) {
              const name = style[i];
              if (name.startsWith('--')) {
                cssVariables[name] = style.getPropertyValue(name).trim();
              }
            }
          }
        }
      } catch (e) {
        // Cross-origin stylesheet access blocked
      }
    }

    // 2. Scrape unique rendered text colors and background colors
    const extractedColors = new Set();
    const extractedFonts = new Set();
    const allElements = Array.from(document.querySelectorAll('*'));

    allElements.forEach((el) => {
      const comp = window.getComputedStyle(el);
      
      const bgColor = rgbToHex(comp.backgroundColor);
      if (bgColor) extractedColors.add(bgColor);

      const color = rgbToHex(comp.color);
      if (color) extractedColors.add(color);

      if (comp.fontFamily) {
        const cleanFont = comp.fontFamily.split(',')[0].replace(/['"]/g, '').trim();
        if (cleanFont) extractedFonts.add(cleanFont);
      }
    });

    // 3. Extract SVG Logos and Image Logos
    const logoAssets = [];

    // Extract inline SVGs inside header/nav or with 'logo' in class/id
    document.querySelectorAll('header svg, nav svg, [id*="logo"] svg, [class*="logo"] svg, svg').forEach((svg, idx) => {
      logoAssets.push({
        type: 'svg',
        name: `logo_inline_${idx + 1}.svg`,
        content: svg.outerHTML
      });
    });

    // Extract <img> logos
    document.querySelectorAll('header img, nav img, img[src*="logo"], img[alt*="logo"]').forEach((img, idx) => {
      if (img.src) {
        logoAssets.push({
          type: 'img',
          name: `logo_image_${idx + 1}`,
          src: img.src
        });
      }
    });

    return {
      cssVariables,
      colors: Array.from(extractedColors).slice(0, 20), // Top 20 rendered colors
      fonts: Array.from(extractedFonts),
      logos: logoAssets
    };
  });

  console.log('[3/4] Saving logos locally...');
  let logoCount = 0;

  for (const logo of brandData.logos) {
    if (logo.type === 'svg') {
      const filePath = path.join(LOGO_DIR, logo.name);
      await fs.writeFile(filePath, logo.content, 'utf-8');
      logoCount++;
    } else if (logo.type === 'img') {
      try {
        const imagePage = await browser.newPage();
        const viewSource = await imagePage.goto(logo.src);
        const buffer = await viewSource.buffer();
        
        const ext = path.extname(new URL(logo.src).pathname) || '.png';
        const fileName = `${logo.name}${ext}`;
        await fs.writeFile(path.join(LOGO_DIR, fileName), buffer);
        await imagePage.close();
        logoCount++;
      } catch (err) {
        console.warn(`Failed to download image: ${logo.src}`);
      }
    }
  }

  console.log('[4/4] Generating theme JSON for Google Stitch...');

  // Format into a structured Google Stitch theme payload
  const themePayload = {
    themeName: 'University Portal Brandbook Theme',
    extractedAt: new Date().toISOString(),
    typography: {
      primaryFont: brandData.fonts[0] || 'Inter, sans-serif',
      fontFamilies: brandData.fonts
    },
    colorPalette: {
      primary: brandData.colors[0] || '#003366',
      secondary: brandData.colors[1] || '#FFCC00',
      background: brandData.colors.find(c => c === '#FFFFFF' || c === '#FAFAFA') || '#FFFFFF',
      surface: '#F4F5F7',
      textPrimary: brandData.colors.find(c => c === '#000000' || c === '#1A1A1A') || '#111827',
      allExtractedColors: brandData.colors
    },
    cssVariables: brandData.cssVariables,
    departmentThemes: {
      default: {
        primary: brandData.colors[0] || '#003366',
        accent: brandData.colors[1] || '#FFCC00'
      },
      collegeOfBusinessAdministration: {
        primary: brandData.colors[2] || '#800000', // CBA color accent mapping
        accent: brandData.colors[3] || '#E6B800'
      }
    },
    appModules: ['Merch', 'Shuttle', 'Print', 'Canteen'] // Campus application modules
  };

  const themePath = path.join(OUTPUT_DIR, 'theme-stitch.json');
  await fs.writeJson(themePath, themePayload, { spaces: 2 });

  await browser.close();

  console.log('\n Extraction Complete!');
  console.log(`- Theme Config: ${themePath}`);
  console.log(`- Logos Saved: ${logoCount} assets in ${LOGO_DIR}`);
}

extractBrandbook().catch((err) => {
  console.error('Error extracting brand assets:', err);
});