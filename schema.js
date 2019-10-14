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
  }

  type Company {
    profile: Profile
    financial_statement: Financial_statement
  }

  type Profile {
    price: Float
    beta: Float
    vol_avg: Float
    mkt_cap: Float
    last_div: Float
    range: String
    changes: Float
    changes_percentage: String
    company_name: String
    exchange: String
    industry: String
    website: String
    description: String
    ceo: String
    sector: String
  }

  type Financial_statement {
    income_statements: [Income_statement]!
		balance_sheet_statements: [Balance_sheet_statement]! 
		cash_flow_statements: [Cash_flow_statement]!
  }

  type Income_statement {
    date: String
    revenue: Float
    revenue_growth: Float
    cost_of_revenue: Float
  }

  type Balance_sheet_statement {
    date: String
    cash_and_cash_equivalents: Float
  }

  type Cash_flow_statement {
    date: String
    depreciation_and_amortization: Float
  }

`;


module.exports = typeDefs;