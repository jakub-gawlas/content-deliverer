const config = require('./config');

function setup(){
  return new Promise((resolve, reject) => {
    if(existsDataFile()) resolve();
    let i = 0;
    let timer = setInterval(() => {
      if(existsDataFile()){
        clearInterval(timer);
        resolve();
        return;
      }
      if(i++>30) reject('Cannot load data file.');
    }, 100);
  });
}

function existsDataFile(){
  try {
    require(config.dataFilePath);
    return true;
  }
  catch(err){
    return false;
  }
}

module.exports = setup;
