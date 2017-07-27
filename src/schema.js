const { makeExecutableSchema } = require('graphql-tools');
const model = require('./model');

const typeDefs = `
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

const resolvers = {
  Query: {
    documentation: model.getDocumentationInfo,
  },
  Documentation: {
    documents: () => model.getDocuments(),
  },
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

module.exports = schema;
