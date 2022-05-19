// 'use strict';
const stdin = process.openStdin();
const writeStream = require('fs').createWriteStream(
  './02-write-file/output.txt'
);
const main = async () =>
  stdin.addListener('data', (d) => {
    writeStream.write(d.toString(), 'utf-8');
  });

main().catch(console.error);
