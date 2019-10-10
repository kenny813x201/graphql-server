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
      // company: company
    };
  }

  async getCompanyBySymbol({symbol}) {
    const response = await this.get(`/company/profile/${symbol}`);
    return this.companyReducer(response.profile);
  }

  companyReducer(company) {
    return {
      price: company.price,
      beta: company.beta,
      volAvg: company.volAvg,
      mktCap: company.mktCap,
      lastDiv: company.lastDiv,
      range: company.range,
      changes: company.changes,
      changesPercentage: company.changesPercentage,
      companyName: company.companyName,
      exchange: company.exchange,
      industry: company.industry,
      website: company.website,
      description: company.description,
      ceo: company.ceo,
      sector: company.sector,
    }
  }

}

module.exports = FinancialModelingPrepAPI;