const { makeExecutableSchema } = require('graphql-tools');
const model = require('./model');
const { pubsub, CHANGED_CONTENT_TOPIC } = require('./pubsub');
const config = require('./config');

let typeDefs = `
  type Documentation {
    name: String
    description: String
    documents: [Document]
  }

  type Document {
    title: String
    tags: [String]
    content: String
  }

  type Query {
    documentation: Documentation
  }
`;

if (config.hotReloadMode)
  typeDefs += `
  type Subscription {
    changedDocumentation: Documentation
  }
`;

const resolvers = {
  Documentation: {
    documents: () => model.getDocuments(),
  },
  Query: {
    documentation: model.getDocumentationInfo,
  },
};

if(config.hotReloadMode){
  resolvers.Subscription = {
    changedDocumentation: {
      resolve: model.getDocumentationInfo,
      subscribe: () => pubsub.asyncIterator(CHANGED_CONTENT_TOPIC),
    },
  }
}

const schema = makeExecutableSchema({ typeDefs, resolvers });

module.exports = schema;
