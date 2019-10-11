module.exports = {
  Query: {
    symbols: (_, __, {dataSources}) => 
      dataSources.financialModelingPrepAPI.getAllSymbols(),
    company: (_, { symbol }, { dataSources }) => {

      const incomeStatements = dataSources.financialModelingPrepAPI
                                .getFinancialsIncomeStatement({ symbol: symbol })
      const balanceSheetStatements = dataSources.financialModelingPrepAPI
                                .getFinancialsBalanceSheetStatement({ symbol: symbol })
      const financialStatements = {
        income_statements: incomeStatements,
        balance_sheet_statements: balanceSheetStatements
      };

      return {
        profile: dataSources.financialModelingPrepAPI.getCompanyProfile({ symbol: symbol}),
        financial_statement: financialStatements
      }
    }
  }
};