const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { createServer } = require('http');
const { SubscriptionServer } = require('subscriptions-transport-ws');
const { execute, subscribe } = require('graphql');
const setup = require('./setup');
const config = require('./config');

(async () => {
  await setup();

  const schema = require('./schema');

  const app = express();

  app.use(cors({}));

  app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));

  app.use(
    '/graphiql',
    graphiqlExpress({
      endpointURL: '/graphql',
      subscriptionsEndpoint: config.hotReloadMode
        ? `ws://localhost:${config.wsPort}/graphql`
        : undefined,
      query: `query GiveMeDocu {
    documentation {
      name
      description
      documents {
        title
        tags
        content
      }
    }
  }`,
    })
  );

  app.use('/files', express.static(config.resourcesDirPath));

  app.listen(config.port, () =>
    console.log(`Server running on *:${config.port}`)
  );

  if (!config.hotReloadMode) return;
  /**
   * WebSocket server
   */
  const wsServer = createServer(app);
  wsServer.listen(config.wsPort, () =>
    console.log(`WebSocket server running on *:${config.wsPort}`)
  );

  SubscriptionServer.create(
    { schema, execute, subscribe },
    { server: wsServer, path: '/graphql' }
  );
})();
