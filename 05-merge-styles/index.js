const Path = require('path');
const fs = require('fs');
let bundle = Path.join(__dirname, 'project-dist', 'bundle.css');

function webpack(folder) {
  fs.readdir(folder, 'utf-8', (e, files) => {
    if (e) {
      throw e;
    }
    fs.writeFile(bundle, ' ', (e) => {
      if (e) {
        throw e;
      }
    });
    files.forEach((file) => {
      if (Path.parse(Path.join(folder, file)).ext === '.css') {
        let stream = fs.createReadStream(Path.join(folder, file));
        stream.on('data', (data) => {
          fs.appendFile(bundle, data, (e) => {
            if (e) {
              throw e;
            }
          });
        });
      }
    });
  });
}

webpack('./05-merge-styles/styles');
// webpack('./05-merge-styles/test-files/styles');
