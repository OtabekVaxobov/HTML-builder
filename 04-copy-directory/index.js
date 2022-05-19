const Path = require('path');
const FSP = require('fs').promises;

async function copyDir(src, dest) {
  await FSP.rm(dest, {
    recursive: true,
    force: true,
  });
  const entries = await FSP.readdir(src, { withFileTypes: true });
  await FSP.mkdir(dest);
  for (let entry of entries) {
    const srcPath = Path.join(src, entry.name);
    const destPath = Path.join(dest, entry.name);
    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath);
    } else {
      await FSP.copyFile(srcPath, destPath);
    }
  }
}
copyDir('./04-copy-directory/files', './04-copy-directory/files-copy');
