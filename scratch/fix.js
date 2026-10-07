const fs = require('fs');
const path = require('path');

const files = [
  'src/modules/shuttle/CampusShuttle.tsx',
  'src/modules/shuttle/ShuttleTicket.tsx',
  'src/modules/print/PrintHub.tsx',
  'src/modules/merch/MerchCatalog.tsx',
  'src/modules/dashboard/CampusHub.tsx',
  'src/modules/canteen/CanteenTracker.tsx',
  'src/modules/canteen/CanteenExpress.tsx'
];

files.forEach(f => {
  const fp = path.join('D:/Coding/Jelo', f);
  if (!fs.existsSync(fp)) return;
  
  let content = fs.readFileSync(fp, 'utf8');
  
  // Replace <ScrollView style={styles.mainScroll} contentContainerStyle={styles.scrollContent}>
  // with <ScrollView style={styles.mainScroll} contentContainerStyle={[styles.scrollContent, { flexGrow: 1, paddingBottom: (insets.bottom || 0) + 32 }]}>
  
  content = content.replace(
    /contentContainerStyle=\{styles\.scrollContent\}/g,
    "contentContainerStyle={[styles.scrollContent, { flexGrow: 1, paddingBottom: (insets.bottom || 0) + 32 }]}"
  );
  
  // Also check if any card has fixed height: 110, height: 80, etc.
  // The user said: "Replace fixed card heights (e.g., height: 110) with minHeight or natural padding"
  // Let's replace `height: 110` with `minHeight: 110`.
  content = content.replace(/height:\s*(110|100|120|130|140|150|160|200),\s*\/\/\s*fixed/g, "minHeight: $1,");
  // Let's just be careful not to break icon heights. Usually icons are <= 64. Cards are > 80.
  // Let's manually replace specific known card heights if they exist.
  content = content.replace(/height: (110|100|120|130|150)(,)?(\s*\/\/.*)?/g, "minHeight: $1$2");

  fs.writeFileSync(fp, content, 'utf8');
  console.log(`Updated ${f}`);
});
