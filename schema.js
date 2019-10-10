const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    symbols: [Symbol]!
    company(symbol: String!): Company
  }

  type Symbol {
    symbol: String!
    name: String
    price: Float
    # company: Company
  }

  type Company {
    price: Float
    beta: Float
    volAvg: Float
    mktCap: Float
    lastDiv: Float
    range: String
    changes: Float
    changesPercentage: String
    companyName: String
    exchange: String
    industry: String
    website: String
    description: String
    ceo: String
    sector: String
  }
`;


module.exports = typeDefs;