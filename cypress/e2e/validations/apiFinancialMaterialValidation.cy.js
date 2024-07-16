const { getApiUrl, apiAuth } = require('../../support/apiFinancialMaterialHelpers');

describe('API Financial Material IS', () => {
  it('should validate the response of API Financial Material', () => {
    const topValue = Math.floor(Math.random() * 200) + 1; // Gerar número aleatório entre 1 e 60
    const urlWithTop = getApiUrl(topValue);

    cy.request({
      method: 'GET',
      url: urlWithTop,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': apiAuth
      },
      failOnStatusCode: false
    }).then(response => {
      // Verificar status da resposta da API
      expect(response.status).to.eq(200);

      // Verificar se a estrutura da resposta é válida
      expect(response).to.have.property('body');

      // Verificar a quantidade de itens no array da resposta
      const responseBody = response.body;
      expect(responseBody).to.be.an('array').that.has.lengthOf(topValue);
    });
  });
});
