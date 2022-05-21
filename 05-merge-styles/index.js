const fs = require('fs');
const path = require('path');
let dataArr = [];
fs.promises.readdir(path.join(__dirname, 'styles'), { withFileTypes: true })
  .then(filenames => {
    for (let filename of filenames) {
      if(filename.isFile() === true && path.extname(filename.name) === '.css') {
        fs.readFile(path.join(__dirname, 'styles', filename.name), 'utf8', (error, data) => {
          if(error) {
            throw error;
          }
          dataArr.push(data);
          const writableStream = fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'));
          writableStream.write(dataArr.join('\n'));
        });
      }
    }
  });
  
  

