const fs = require('fs');
const path = require('path');

console.log('🚀 Running Sweet Delight Bakery production build...');

// Copy root CSS & JS files to root level as direct fallbacks
try {
  fs.copyFileSync(path.join(__dirname, 'css', 'styles.css'), path.join(__dirname, 'styles.css'));
  fs.copyFileSync(path.join(__dirname, 'js', 'main.js'), path.join(__dirname, 'main.js'));
  fs.copyFileSync(path.join(__dirname, 'js', 'three-cake.js'), path.join(__dirname, 'three-cake.js'));
  console.log('✓ Root-level fallback assets verified.');
} catch (err) {
  console.error('Error copying root fallbacks:', err);
}

function cleanAndRecreateDir(dirPath) {
  if (fs.existsSync(dirPath)) {
    fs.rmSync(dirPath, { recursive: true, force: true });
  }
  fs.mkdirSync(dirPath, { recursive: true });
}

function copyDirRecursive(src, dest, ignoreList = []) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    if (ignoreList.includes(entry.name)) continue;

    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath, ignoreList);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

const buildIgnore = [
  'node_modules',
  '.git',
  '.gitignore',
  'public',
  'dist',
  '.vercel',
  '.vercelignore',
  'server.js',
  'build.js',
  'package.json',
  'package-lock.json',
  'README.md'
];

// Clean & Sync dist/
const distDir = path.join(__dirname, 'dist');
cleanAndRecreateDir(distDir);
copyDirRecursive(__dirname, distDir, buildIgnore);
// Include vercel.json in dist as well
if (fs.existsSync(path.join(__dirname, 'vercel.json'))) {
  fs.copyFileSync(path.join(__dirname, 'vercel.json'), path.join(distDir, 'vercel.json'));
}
console.log('✓ dist/ directory cleaned and synchronized with production assets.');

// Clean & Sync public/
const publicDir = path.join(__dirname, 'public');
cleanAndRecreateDir(publicDir);
copyDirRecursive(__dirname, publicDir, buildIgnore);
if (fs.existsSync(path.join(__dirname, 'vercel.json'))) {
  fs.copyFileSync(path.join(__dirname, 'vercel.json'), path.join(publicDir, 'vercel.json'));
}
console.log('✓ public/ directory cleaned and synchronized with production assets.');

console.log('🎉 Production build completed successfully!');
