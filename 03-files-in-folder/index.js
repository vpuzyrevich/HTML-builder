const fs = require('fs');
const path = require('path');

fs.promises.readdir(path.join(__dirname, 'secret-folder'), { withFileTypes: true })
  .then(filenames => {
    for (let filename of filenames) {
      if(filename.isFile()) {
        const name = path.parse(filename.name).name;
        const extension = path.extname(filename.name).slice(1);
        fs.stat(path.join(__dirname, 'secret-folder', filename.name), (error, stats) => {
          console.log(`${name} - ${extension} - ${stats.size}byte`);
        });
      }
    }});
