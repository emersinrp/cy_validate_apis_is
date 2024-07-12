const { defineConfig } = require('cypress');
const mochawesome = require('mochawesome');
const { merge } = require('mochawesome-merge');
const generator = require('mochawesome-report-generator');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('after:run', async (results) => {
        const jsonDir = 'cypress/results/json';
        const reportDir = 'cypress/results/html';

        await merge({
          files: [
            `${jsonDir}/*.json`
          ]
        }).then(async (report) => {
          await generator.create(report, {
            reportDir,
            inline: true,
          });
        });
      });
    },
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/results/json',
      overwrite: false,
      html: false,
      json: true,
    },
    supportFile: false,
  },
});
