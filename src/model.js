const config = require('./config');
const data = require(config.dataFilePath);

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
