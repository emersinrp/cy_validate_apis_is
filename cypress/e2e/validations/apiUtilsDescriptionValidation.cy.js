const { getApiUrl, apiAuth } = require('../../support/apiUtilsDescriptionHelpers');

describe('API Utils Description IS', () => {
  it('should validate the response of API Utils Description', () => {
    const topValue = Math.floor(Math.random() * 200) + 1; // Gerar número aleatório entre 1 e 200
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
