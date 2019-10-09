const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    symbols: [Symbol]!
    symbol(symbol: String!): Symbol
  }

  type Symbol {
    symbol: String!
    name: String
    price: Float
    company(symbol: String): Company
  }

  type Company {
    symbol: String
    companyName: String
    price: Float
  }
`;

module.exports = typeDefs;