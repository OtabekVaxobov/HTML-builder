var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('01-read-file/text.txt'),
});

lineReader.on('line', function (err, line) {
  if (err) {
    console.error(err);
    return;
  }
  console.log('Line from file:', line);
});

// OR
// const fs = require('fs');

// fs.readFile('01-read-file/text.txt', 'utf8', (err, data) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   console.log(data);
// });
