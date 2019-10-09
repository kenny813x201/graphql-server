const { ApolloServer, gql } = require('apollo-server');
const axios  = require('axios');
const { find, fileter } = require('lodash');


const typeDefs = gql`
  type Symbol {
    symbol: String
    name: String
    price: Float
    company(symbol: String): Company
  }

  type Company {
    symbol: String
    companyName: String
    price: Float
  }

  type Query {
    getSymbols: [Symbol]
    company(symbol: String): Company
  }
`;

const baseURL = `https://financialmodelingprep.com/api/v3/`;

const resolvers = {
  Query: {
    getSymbols() {
      return axios.get(`${baseURL}company/stock/list`)
        .then(res => res.data.symbolsList)
    },
    company(parent, args, context, info) {
      return axios.get(`${baseURL}company/profile/${args.symbol}`)
        .then(res => res.data.profile)
    }
  }
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});