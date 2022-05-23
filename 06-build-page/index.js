const fs = require('fs');
const path = require('path');
let dataArr = [];

(async () => {
  await fs.promises.mkdir(path.join(__dirname, 'project-dist'), { recursive: true });

  const readTemplate = fs.promises.readFile(path.join(__dirname, 'template.html'), 'utf-8');
  const readDirComponents = fs.promises.readdir(path.join(__dirname, 'components'), { withFileTypes: true });

  const replaceTemplate = () => {
    readTemplate.then(dataTemp => {
      let replaceTemp = dataTemp;
      readDirComponents.then(filenames => {
        for (let filename of filenames) {
          const name = path.parse(filename.name).name;
          const reg2 = `{{${name}}}`;
          if(filename.isFile() && path.extname(filename.name) === '.html') {
      
            fs.promises.readFile(path.join(__dirname, 'components', filename.name), 'utf8').then(dataComp => {
              replaceTemp = replaceTemp.replace(reg2, dataComp);
              fs.promises.writeFile(path.join(__dirname, 'project-dist', 'index.html'), replaceTemp); 
            });  
          } 
        }
      });
    });
  };
  const copyStyles = () => {
    fs.promises.readdir(path.join(__dirname, 'styles'), { withFileTypes: true })
      .then(filenames => {
        for (let filename of filenames) {
          if(filename.isFile() === true && path.extname(filename.name) === '.css') {
            fs.readFile(path.join(__dirname, 'styles', filename.name), 'utf8', (error, data) => {
              if(error) {
                throw error;
              }
              dataArr.push(data);
              const writableStream = fs.createWriteStream(path.join(__dirname, 'project-dist', 'style.css'));
              writableStream.write(dataArr.join('\n'));
            });
          }
        }
      });
  };
  replaceTemplate();
  copyStyles();

  async function copyAssets(folderName) {
    await fs.promises.rm(path.join(__dirname, 'project-dist',  'assets'), { recursive: true, force: true });
    await fs.promises.mkdir(path.join(__dirname,'project-dist', 'assets', folderName), { recursive: true });
    await fs.promises.readdir(path.join(__dirname, 'assets', folderName), { withFileTypes: true })
      .then(async (filenames) => {
        for (let filename of filenames) { 
          if(filename.isDirectory() === true){
            copyAssets(filename.name);
          } else {
            fs.promises.copyFile(path.join(__dirname, 'assets', folderName, filename.name), path.join(__dirname, 'project-dist', 'assets', folderName, filename.name));
          }
        }});
  }
  copyAssets('');
}) ();

