const Path = require('path');
const fs = require('fs');
let bundle = Path.join(__dirname, 'project-dist', 'bundle.css');
let error = {
  if(e) {
    throw e;
  },
};
function webpack(folder) {
  fs.readdir(folder, 'utf-8', (e, files) => {
    error;
    fs.writeFile(bundle, ' ', () => {
      error;
    });
    files.forEach((file) => {
      if (Path.parse(Path.join(folder, file)).ext === '.css') {
        let stream = fs.createReadStream(Path.join(folder, file));
        stream.on('data', (data) => {
          fs.appendFile(bundle, data, () => {
            error;
          });
        });
      }
    });
  });
}

webpack('./05-merge-styles/styles');
