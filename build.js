const fs = require('fs');
const path = require('path');

console.log('🚀 Running Sweet Delight Bakery production build...');

// Copy root CSS & JS files to root level as well for direct root-level fallbacks
try {
  fs.copyFileSync(path.join(__dirname, 'css', 'styles.css'), path.join(__dirname, 'styles.css'));
  fs.copyFileSync(path.join(__dirname, 'js', 'main.js'), path.join(__dirname, 'main.js'));
  fs.copyFileSync(path.join(__dirname, 'js', 'three-cake.js'), path.join(__dirname, 'three-cake.js'));
  console.log('✓ Root-level fallback assets prepared.');
} catch (err) {
  console.error('Error copying root fallbacks:', err);
}

// Function to recursively copy directories
function copyDir(src, dest, ignoreList = []) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    if (ignoreList.includes(entry.name)) continue;

    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath, ignoreList);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

const ignoreList = ['node_modules', '.git', 'public', 'dist', '.vercel', 'server.js'];

// Synchronize to public/ directory
const publicDir = path.join(__dirname, 'public');
copyDir(__dirname, publicDir, ignoreList);
console.log('✓ public/ directory synchronized with all HTML, CSS, and JS assets.');

// Synchronize to dist/ directory
const distDir = path.join(__dirname, 'dist');
copyDir(__dirname, distDir, ignoreList);
console.log('✓ dist/ directory synchronized with all HTML, CSS, and JS assets.');

console.log('🎉 Production build completed successfully!');
