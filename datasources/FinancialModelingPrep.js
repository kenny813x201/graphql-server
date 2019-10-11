const { RESTDataSource } = require('apollo-datasource-rest');

class FinancialModelingPrepAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://financialmodelingprep.com/api/v3/';
  }

  async getAllSymbols() {
    const response = await this.get('company/stock/list');
    return Array.isArray(response.symbolsList)
      ? response.symbolsList.map(symbol => this.symbolReducer(symbol))
      : [];
  }

  symbolReducer(symbol) {
    return {
      symbol: symbol.symbol,
      name: symbol.name,
      price: symbol.price,
    };
  }

  async getCompanyProfile({symbol}) {
    const response = await this.get(`/company/profile/${symbol}`);
    return this.companyProfileReducer(response.profile);
  }

  companyProfileReducer(profile) {
    return {
      price: profile.price,
      beta: profile.beta,
      vol_avg: profile.volAvg,
      mkt_cap: profile.mktCap,
      las_div: profile.lastDiv,
      range: profile.range,
      changes: profile.changes,
      changes_percentage: profile.changesPercentage,
      company_name: profile.companyName,
      exchange: profile.exchange,
      industry: profile.industry,
      website: profile.website,
      description: profile.description,
      ceo: profile.ceo,
      sector: profile.sector,
    }
  }

  async getFinancialsIncomeStatement({symbol}) {
    const response = await this.get(`/financials/income-statement/${symbol}`);
    return Array.isArray(response.financials)
      ? response.financials.map(incomeStatement => this.financialsIncomeStatementReducer(incomeStatement))
      : []
  }

  financialsIncomeStatementReducer(financials) {
    return {
      date: financials.date,
      revenue: financials.Revenue,
      revenue_growth: financials['Revenue Growth'],
      cost_of_revenue : financials['Cost Of Revenue']
    }
  }

  async getFinancialsBalanceSheetStatement({symbol}) {
    const response = await this.get(`/financials/balance-sheet-statement/${symbol}`);
    return Array.isArray(response.financials)
      ? response.financials.map(balanceSheetStatement => 
        this.financialsBalanceSheetStatementReducer(balanceSheetStatement))
      : []
  }

  financialsBalanceSheetStatementReducer(financials) {
    return {
      date: financials.date,
      cash_and_cash_equivalents: financials['Cash and cash equivalents']
    }
  }

}

module.exports = FinancialModelingPrepAPI;