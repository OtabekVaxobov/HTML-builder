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

// let foo = () => {
//   try {
//     fs.readFile('01-read-file/text.tt', 'utf8', (_error, data) => {
//       console.log(data);
//     });
//   } catch (error) {
//     console.error(error);
//   }
// };

// foo();
