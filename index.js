const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const FinancialModelingPrepAPI = require('./datasources/FinancialModelingPrep');

const server = new ApolloServer({ 
  typeDefs,
  resolvers,
  dataSources: () => ({
    financialModelingPrepAPI: new FinancialModelingPrepAPI()
  })
 });

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});