let writeStream = require('fs').createWriteStream('./02-write-file/output.txt');
let { stdout, stdin, exit } = require('process');
stdout.write('Введите текст:');
stdin.on('data', (data) => {
  if (data.toString().trim() === 'exit') {
    endFunc();
  }
  writeStream.write(data);
});
process.on('SIGINT', endFunc);
function endFunc() {
  stdout.write('Вы вышли из терминала node!');
  exit();
}
