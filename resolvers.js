module.exports = {
  Query: {
    symbols: (_, __, {dataSources}) => 
      dataSources.financialModelingPrepAPI.getAllSymbols(),
    company: (_, { symbol }, { dataSources }) => 
      dataSources.financialModelingPrepAPI.getCompanyBySymbol({ symbol: symbol})
  }
};