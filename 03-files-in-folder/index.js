// const x = require('fs').readdir('./03-files-in-folder/secret-folder', (err) =>
//   console.log(err)
// );
// console.log(x);

const fs = require('fs');
const path = './03-files-in-folder/secret-folder/';

const filesArray = fs
  .readdirSync(path)
  .filter((file) => fs.lstatSync(path + file).isFile());

console.log(filesArray);
