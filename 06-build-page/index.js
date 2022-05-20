const Path = require('path');
const FSP = require('fs').promises;

const fs = require('fs');
//webpack
const folderPath = Path.join(__dirname, 'components');
const pathCopy = Path.join(__dirname, 'project-dist');
const bundle = Path.join(__dirname, 'project-dist', 'style.css');
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
  fs.stat(pathCopy, (e) => {
    if (e) {
      fs.mkdir(pathCopy, (e) => {
        if (e) {
          return console.log(e);
        }
      });
      createHTML();
    } else {
      fs.readdir(pathCopy, (e) => {
        if (e) console.log(e);
        else {
          createHTML();
        }
      });
    }
  });
  const createHTML = () => {
    fs.copyFile(
      `${__dirname}\\template.html`,
      `${pathCopy}\\index.html`,
      (e) => {
        if (e) throw e;
        fs.readFile(`${pathCopy}\\index.html`, 'utf8', function (e, data) {
          if (e) throw e;
          fs.readdir(folderPath, { withFileTypes: true }, (e, files) => {
            if (e) throw e;

            files.forEach(function (file) {
              fs.readFile(
                `${folderPath}\\${file.name}`,
                'utf8',
                (e, dataFile) => {
                  if (e) throw e;
                  let tagName = `{{${file.name.split('.')[0]}}}`;
                  data = data.replace(tagName, dataFile);
                  fs.writeFile(`${pathCopy}\\index.html`, data, (e) => {
                    if (e) console.log(e);
                  });
                }
              );
            });
          });
        });
      }
    );
  };
}

webpack('./06-build-page/assets', './06-build-page/project-dist/assets');
