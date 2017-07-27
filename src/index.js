const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');

const config = require('./config');

const app = express();

app.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress({ schema: require('./schema') })
);

app.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: '/graphql',
  })
);

app.use('/files', express.static(config.resourcesDirPath));

app.listen(config.port, () => console.log(`Listening on *:${config.port}`));
