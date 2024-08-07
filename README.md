# Validação e comparação de APIs do IS com Cypress

## Descrição
Este projeto realiza a validação e comparação das respostas de várias APIs RESTful utilizando a ferramenta Cypress. Os testes incluem a verificação do status da resposta, a comparação do conteúdo e do tipo de dados retornados, e a validação da quantidade de itens retornados conforme o parâmetro $top.

## Estrutura do Projeto
O projeto é composto pelos seguintes diretórios e arquivos:

    
    cy_validate_apis_is
    ├── cypress
    │   ├── e2e
    │   │   ├── comparisons
    │   │   │   └── apiPersonAccountsSoukComparison.cy.js
    │   │   ├── validations
    │   │   │   ├── apiFinancialCreditValidation.cy.js
    │   │   │   ├── apiPersonCustomerValidation.cy.js
    │   │   │   └── apiPersonDeliveryWindowValidation.cy.js
    │   ├── fixtures
    │   │   └── requestDataPersonAccountsSoukHelpers.json
    │   ├── support
    │   │   ├── apiFinancialCreditHelpers.js
    │   │   ├── apiPersonAccountsSoukHelpers.js
    │   │   ├── apiPersonCustomerHelpers.js
    │   │   └── apiPersonDeliveryWindowHelpers.js
    ├── node_modules
    ├── .gitignore
    ├── cypress.config.js
    ├── package-lock.json
    ├── package.json
    └── README.md


## Instalação
1. **Clone o repositório:**

    ```bash
    git clone <URL_DO_REPOSITORIO>
    cd cy_validate_apis_is
    ```

2. **Crie um ambiente virtual (opcional, mas recomendado):**

    ```bash
    python -m venv venv
    source venv/bin/activate  # Linux/Mac
    venv\Scripts\activate     # Windows
    ```

3. **Instale as dependências:**
    ```bash
    npm install
    ```

## Configuração

1. **Configure as variáveis de ambiente:**

Crie um arquivo .env na raiz do projeto e adicione as seguintes variáveis:

    
    API_IS_AUTH=<AUTHENTICATION_TOKEN_IS>
    API_PO_AUTH=<AUTHENTICATION_TOKEN_PO>
    

2. **Execução dos Testes**

Executando todos os testes
Para executar todos os testes de uma vez, utilize o comando abaixo:

    npx cypress run

3. **Abrir interface do Cypress**

Abrir a interface do cypress, para seleção de testes individuais:

    npx cypress open
    
4. **Executando testes específicos:**

Para executar testes específicos, utilize o comando abaixo com o caminho do arquivo de teste desejado:

    npx cypress run --spec "cypress/e2e/validations/apiFinancialCreditValidation.cy.js"

## Ferramentas e Bibliotecas Utilizadas

    Cypress: Framework de testes end-to-end.
    mochawesome: Gerador de relatórios para testes.
    dotenv: Biblioteca para carregar variáveis de ambiente a partir de um arquivo .env.

## Como Contribuir
1. **Faça um fork do projeto.**
2. **Crie uma nova branch:**
    ```bash
    git checkout -b minha-feature
    ```

3. **Faça suas alterações e adicione commits:**
    ```bash
    git commit -m 'Minha nova feature'
    ```

4. **Envie para a branch original:**
    ```bash
    git push origin minha-feature
    ```
5. **Crie um pull request.**


    
    Este README oferece uma visão geral abrangente do projeto, desde a instalação até a execução e contribuição. A estrutura do projeto e a configuração das APIs foram detalhadas para facilitar a compreensão e a manutenção futura.
