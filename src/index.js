const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const setup = require('./setup');
const config = require('./config');

(async () => {

  await setup();

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
      query:
  `query GiveMeDocu {
    documentation {
      name
      description
      documents {
        title
        tags
        content
      }
    }
  }`
    })
  );

  app.use('/files', express.static(config.resourcesDirPath));

  app.listen(config.port, () => console.log(`Listening on *:${config.port}`));

})()
