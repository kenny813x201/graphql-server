const { ApolloServer } = require('apollo-server-lambda');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const FinancialModelingPrepAPI = require('./datasources/FinancialModelingPrep');

const server = new ApolloServer({ 
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
  dataSources: () => ({
    financialModelingPrepAPI: new FinancialModelingPrepAPI()
  }),
  context: ({ event, context }) => ({
    headers: event.headers,
    functionName: context.functionName,
    event,
    context,
  }),
 });

exports.graphqlHandler = server.createHandler({
  cors: {
    origin: true,
    credentials: true,
  },
});