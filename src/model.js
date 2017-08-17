const config = require('./config');
const { pubsub, CHANGED_CONTENT_TOPIC } = require('./pubsub');
const chokidar = require('chokidar');
let data = require(config.dataFilePath);

if (config.hotReloadMode) {
  chokidar.watch(config.dataFilePath).on('change', path => {
    delete require.cache[require.resolve(config.dataFilePath)];
    try {
      const newData = require(config.dataFilePath);
      data = newData;
      pubsub.publish(CHANGED_CONTENT_TOPIC, { changed: true });
    } catch(err){
      console.error(err);
    }
  });
}

function getDocumentationInfo() {
  const docuInfo = Object.assign({}, data);
  delete docuInfo.documents;
  return docuInfo;
}

function getDocuments() {
  return data.documents;
}

module.exports = {
  getDocumentationInfo,
  getDocuments,
};
