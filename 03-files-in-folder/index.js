let path = require('path');
let info = (file) => {
  let dat = [];
  if (file.isFile()) {
    require('fs').stat(
      path.resolve(__dirname, 'secret-folder', file.name),
      (_e, stats) => {
        dat.push(file.name.split('.').slice(0, -1).join('.'));
        dat.push(path.extname(file.name).slice(1));
        dat.push(Math.round(stats.size / 1024) + 'Kb');
        console.log(dat.join(' - '));
      }
    );
  }
};
require('fs').readdir(
  path.join(__dirname, 'secret-folder'),
  { withFileTypes: true },
  (_e, files) => {
    files.forEach((item) => {
      info(item);
    });
  }
);
