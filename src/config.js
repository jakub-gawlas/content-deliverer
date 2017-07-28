const path = require('path');

module.exports = {
  port: process.env.APP_PORT || 3000,
  wsPort: process.env.APP_WS_PORT || 5000,
  dataFilePath: path.resolve(
    process.env.APP_DATA_FILE_PATH || './out/data.json'
  ),
  resourcesDirPath: path.resolve(
    process.env.APP_RESOURCES_DIR_PATH || './out/resources'
  ),
  hotReloadMode: Boolean(process.env.APP_HOT_RELOAD) || false,
};
