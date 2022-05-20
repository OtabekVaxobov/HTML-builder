const Path = require('path');
const FSP = require('fs').promises;

const fs = require('fs');
//webpack
const bundle = Path.join(__dirname, 'project-dist', 'bundle.css');
const folder = Path.join(__dirname, 'styles');

async function webpack(src, dest) {
  await FSP.rm(dest, {
    recursive: true,
    force: true,
  });
  const entries = await FSP.readdir(src, { withFileTypes: true }, () => {});
  await FSP.mkdir(dest, { recursive: true });
  for (let entry of entries) {
    const srcPath = Path.join(src, entry.name);
    const destPath = Path.join(dest, entry.name);
    if (entry.isDirectory()) {
      await webpack(srcPath, destPath);
    } else {
      await FSP.copyFile(srcPath, destPath);
    }
  }
  //
  await FSP.rm(bundle, {
    force: true,
  });
  fs.readdir(folder, 'utf-8', (e, files) => {
    fs.writeFile(bundle, ' ', () => {});
    files.forEach((file) => {
      if (Path.parse(Path.join(folder, file)).ext === '.css') {
        let stream = fs.createReadStream(Path.join(folder, file));
        stream.on('data', (data) => {
          fs.appendFile(bundle, data, () => {});
        });
      }
    });
  });
}

webpack('./06-build-page/assets', './06-build-page/project-dist/assets');
