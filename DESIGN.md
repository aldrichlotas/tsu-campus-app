---
name: Collegiate Academic Portal
colors:
  surface: '#F4F5F7'
  surface-dim: '#dcd9d9'
  surface-bright: '#fcf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f2'
  surface-container: '#f0eded'
  surface-container-high: '#eae7e7'
  surface-container-highest: '#e5e2e1'
  on-surface: '#1b1c1c'
  on-surface-variant: '#5a413d'
  inverse-surface: '#303030'
  inverse-on-surface: '#f3f0ef'
  outline: '#8e706c'
  outline-variant: '#e2bfb9'
  surface-tint: '#b22b1d'
  primary: '#570000'
  on-primary: '#ffffff'
  primary-container: '#800000'
  on-primary-container: '#ff8371'
  inverse-primary: '#ffb4a8'
  secondary: '#785a00'
  on-secondary: '#ffffff'
  secondary-container: '#fcc42f'
  on-secondary-container: '#6e5200'
  tertiary: '#1e2639'
  on-tertiary: '#ffffff'
  tertiary-container: '#343c50'
  on-tertiary-container: '#9fa6bf'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad4'
  primary-fixed-dim: '#ffb4a8'
  on-primary-fixed: '#410000'
  on-primary-fixed-variant: '#8f0f07'
  secondary-fixed: '#ffdf9c'
  secondary-fixed-dim: '#f6be29'
  on-secondary-fixed: '#251a00'
  on-secondary-fixed-variant: '#5b4300'
  tertiary-fixed: '#dae2fc'
  tertiary-fixed-dim: '#bec6df'
  on-tertiary-fixed: '#131b2e'
  on-tertiary-fixed-variant: '#3f465b'
  background: '#fcf9f8'
  on-background: '#1b1c1c'
  surface-variant: '#e5e2e1'
  surface-card: '#FFFFFF'
  cba-primary: '#4A4A4A'
  cba-accent: '#222222'
  border-subtle: '#E2E5EB'
  text-muted: '#7A7A7A'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 36px
    fontWeight: '600'
    lineHeight: 44px
  headline-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 26px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Playfair Display
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
  headline-sm:
    fontFamily: Playfair Display
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
  title-lg:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: '700'
    lineHeight: 26px
  title-md:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
  body-md:
    fontFamily: Manrope
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
  body-sm:
    fontFamily: Manrope
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
  label-lg:
    fontFamily: Manrope
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Manrope
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-caps:
    fontFamily: Manrope
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.08em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.5rem
  margin: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system embodies an authoritative, dignified academic collegiate aesthetic merged with high-clarity modern utility. It reflects the rich heritage of public higher education—balancing traditional institutional solemnity with seamless day-to-day administrative and student life operations.

The visual style blends **Editorial Neo-Classicism** with **Contemporary Corporate SaaS**:
- High-contrast typography featuring an expressive editorial serif for institutional weight, titles, and honorific headings, anchored by a neutral, legible geometric sans-serif for rigorous dashboard productivity and data grids.
- Prestigious color accents derived from institutional identity: commanding academic maroon, warm luminous gold, grounded deep charcoal, and crisp light utility surfaces.
- Department-aware chromatic theming that allows distinct sub-units (such as Business Administration) to maintain their localized identity within the parent institutional superstructure.

## Colors

The core color palette anchors the institution's historic pride and functional hierarchy:

- **Primary (`#800000`)**: Deep Institutional Maroon. Used for primary navigation bars, main action triggers, formal headers, and institutional verification marks.
- **Secondary (`#FFC632`)**: Academic Gold / Amber. Reserved for badges, honors, interactive focus states, secondary buttons, active indicator pills, and highlighting achievements.
- **Tertiary (`#1B2336`)**: Deep Academic Navy / Charcoal. Provides institutional depth for sub-navigation bars, tabular headers, and elevated card headers.
- **Neutral (`#222222`)**: Obsidian Charcoal. Primary color for high-contrast typographic rendering and critical interactive icons.
- **Surface (`#F4F5F7`)**: The cool, clean slate underpinning portal screens, maintaining reading comfort and modular visual grouping.
- **Department Overrides (CBA)**: Employs `#4A4A4A` and `#222222` alongside primary maroon and gold accents for college-specific banners, module cards, and tab selectors.

## Typography

The typographic pairing reflects the dual nature of an academic portal: historic prestige and administrative clarity.

- **Headlines & Display Titles**: Set in **Playfair Display**, a refined transitional editorial serif. It conveys institutional authority, scholarly heritage, and celebration of academic excellence across portal homepages, certificates, and college titlebars.
- **Body & Functional UI**: Set in **Manrope**, an open, balanced geometric sans-serif engineered for digital legibility. It provides crystal clarity for schedules, student ledger tables, forms, and technical service cards.
- **Formal Data Labels**: The `label-caps` token uses generous tracking (`0.08em`) with heavy font weight in all-caps for metadata markers, term status badges, and column headers in student records.

## Layout & Spacing

The portal is built around a structured 12-column grid system designed for data density, modular dashboards, and consistent navigation across academic tools:

- **Desktop (1200px+)**: 12 columns with 24px (`1.5rem`) gutters and a 32px (`2rem`) outer margin. Maximum layout container width capped at 1440px to preserve comfortable scan lengths for academic ledgers and long-form transcripts.
- **Tablet (768px - 1199px)**: 8 columns with 16px (`1rem`) gutters and 24px (`1.5rem`) outer margins. Side navigation rails collapse into persistent compact icon bars or drawer overlays.
- **Mobile (< 768px)**: 4 columns with 12px gutters and 16px margins. Dashboards stack vertically into single-column modular cards.
- **Spacing Rhythm**: Governed by an 8pt base unit. Use `space-sm` for compact form groupings, `space-md` for standard card padding, and `space-xl` for sectional breaks between distinct academic semesters or administrative services.

## Elevation & Depth

Visual hierarchy combines clean structural borders with soft, warm academic shadowing:

- **Flat Tonal Base**: Level 0 resides on `#F4F5F7` canvas. Primary functional cards rest on pure `#FFFFFF` bounded by crisp `1px solid #E2E5EB` hairline borders.
- **Low Elevation (Resting Cards & Tiles)**: `0 2px 4px rgba(27, 35, 54, 0.04), 0 1px 2px rgba(27, 35, 54, 0.02)`. Tinted softly with Tertiary Navy rather than cold black to create harmony with academic tones.
- **Mid Elevation (Hover States & Dropdowns)**: `0 8px 16px rgba(27, 35, 54, 0.08), 0 2px 6px rgba(27, 35, 54, 0.04)`. Accompanied by a subtle gold border shift (`#FFC632`) on interactive card hovers.
- **High Elevation (Modal Dialogs & Institutional Announcements)**: `0 20px 32px rgba(27, 35, 54, 0.14), 0 4px 12px rgba(27, 35, 54, 0.06)`. Applied over a dimmed `#1B2336` backdrop blur (`4px`).

## Shapes

The design system maintains a **Soft (`1`)** shape language, prioritizing professional restraint over casual curvature:

- **Base Radius (`0.25rem` / `4px`)**: Applied to compact controls, text input fields, status chips, and table row selections.
- **Container Radius (`0.5rem` / `8px`)**: Applied to departmental dashboard cards, modular containers, modal dialogs, and portal navigation panels.
- **Pill Radius (`9999px`)**: Reserved strictly for notification counts, academic standing tags (e.g., "Dean's Lister", "Enrolled"), and high-visibility status chips.

## Components

### Buttons
- **Primary Institutional**: Solid `#800000` background, pure `#FFFFFF` text, `4px` border radius, `10px 20px` padding. On hover, shifts to darker maroon (`#660000`).
- **Secondary Academic**: Solid `#FFC632` gold background with `#1B2336` deep charcoal text for featured calls-to-action (e.g., "Enroll Now", "Submit Clearance").
- **Tertiary & Outline**: `#FFFFFF` background with a crisp `1px solid #E2E5EB` border and `#222222` text. Hover transitions to `#F4F5F7` with `#800000` text.

### Badges & Chips
- **Status Chips**: Pill-shaped with subtle tinted backgrounds. Active/Enrolled uses gold tint (`rgba(255, 198, 50, 0.18)` with dark gold/charcoal text). Verified/Approved uses maroon border accent.
- **Department Badges**: Rectangular (`4px` radius) with `label-caps` typography, utilizing CBA slate (`#4A4A4A`) or institution maroon.

### Form Inputs
- **Text Inputs & Selects**: Height `40px`, `#FFFFFF` fill, `1px solid #E2E5EB` border, `4px` border radius. Focus state shifts the border to `#800000` with a subtle `0 0 0 3px rgba(128, 0, 0, 0.12)` halo.
- **Checkboxes & Radios**: Square (`3px` radius) or circular controls in `18px` size. Checked state fills with `#800000` and displays a crisp white indicator.

### Cards & Service Tiles
- **Portal Service Cards**: Designed for campus utilities (Canteen, Shuttle, Print, Records). Feature a pure white `#FFFFFF` surface, `1px solid #E2E5EB` border, an 8px radius, and an institutional icon container tinted with `#F4F5F7` or `#FFC632` on hover.
- **Departmental Header Banners**: Feature rich tertiary navy (`#1B2336`) or CBA charcoal (`#4A4A4A`) backgrounds with classic Playfair Display headings in `#FFFFFF` and gold accent borders (`#FFC632`).

### Data Tables (Grades & Enrolment)
- Header row styled in `#1B2336` or `#F4F5F7` with `label-caps` text. Row borders set at `1px solid #E2E5EB` with subtle alternating zebra striping on dense record tables.