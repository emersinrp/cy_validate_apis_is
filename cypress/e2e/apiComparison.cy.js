const {
    apiIsUrl,
    apiPoUrl,
    apiIsAuth,
    apiPoAuth,
    requestData,
    compareResponses
  } = require('../support/apiHelpers');
  
  describe('API Comparison', () => {
    it('should validate and compare the API responses', () => {
      cy.request({
        method: 'POST',
        url: apiIsUrl,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': apiIsAuth
        },
        body: requestData,
        failOnStatusCode: false
      }).then(response1 => {
        // Verifica status da resposta da API IS
        if (response1.status !== 200) {
          cy.log('Erro ao chamar a API IS:', response1.status, response1.statusText);
          return;
        }
  
        cy.request({
          method: 'POST',
          url: apiPoUrl,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': apiPoAuth
          },
          body: requestData,
          failOnStatusCode: false
        }).then(response2 => {
          // Verifica status da resposta da API PO
          if (response2.status !== 200) {
            cy.log('Erro ao chamar a API PO:', response2.status, response2.statusText);
            return;
          }
  
          // Verifica se a estrutura da resposta é válida
          expect(response1).to.have.property('body');
          expect(response2).to.have.property('body');
  
          const differences = compareResponses(response1, response2);
          if (differences.length > 0) {
            differences.forEach(diff => {
              cy.log(`Diferença encontrada em: ${diff.path}: ${diff.type}`);
              cy.log(`API IS: ${diff.value1}`);
              cy.log(`API PO: ${diff.value2}`);
            });
            cy.log('Diferenças: ', JSON.stringify(differences, null, 2));
          } else {
            cy.log('Não existe diferença entre os responses');
          }
        });
      });
    });
  });
  