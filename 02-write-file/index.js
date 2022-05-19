const fs = require('fs');
const path = require('path');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
const writableStream = fs.createWriteStream(path.join(__dirname, 'text.txt'));
rl.write('Hi, please enter text!\n');
rl.on('line', data => {
  if(data === 'exit'){
    rl.write('Bye! Good luck!');
    process.exit();
  } else {
    writableStream.write(`${data}\n`);
  }
}).on('SIGINT', () => {
  rl.write('Bye! Good luck!');
  rl.close();
});
