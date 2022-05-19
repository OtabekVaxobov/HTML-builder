const main = async () => {
  const stream = require('fs').createReadStream(
    '01-read-file/text.txt',
    'utf-8'
  );
  for await (const chunk of stream) {
    console.log(chunk);
  }
};

main().catch(console.error);
