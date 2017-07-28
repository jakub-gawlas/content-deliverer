const config = require('./config');
const { pubsub, CHANGED_CONTENT_TOPIC } = require('./pubsub');
const chokidar = require('chokidar');
let data = require(config.dataFilePath);

if (config.hotReloadMode) {
  chokidar.watch(config.dataFilePath).on('change', path => {
    pubsub.publish(CHANGED_CONTENT_TOPIC, { changed: true });
    delete require.cache[require.resolve(config.dataFilePath)];
    data = require(config.dataFilePath);
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
