const fs = require('fs');
const path = require('path');

fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true },  err => {
  if (err) {
    return console.error(err);
  }
});
fs.promises.readdir(path.join(__dirname, 'files-copy'))
  .then(filenames => {
    for (let filename of filenames) {
      fs.promises.unlink(path.join(__dirname, 'files-copy', filename));
    }});
fs.promises.readdir(path.join(__dirname, 'files'))
  .then(filenames => {
    for (let filename of filenames) {
      fs.promises.copyFile(path.join(__dirname, 'files', filename), path.join(__dirname, 'files-copy', filename));
    }});

