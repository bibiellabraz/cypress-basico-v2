const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Implement node event listeners here
    },
    specPattern: 'cypress/e2e/**/*.spec.js', // Ajuste para a estrutura real dos seus arquivos de teste
  },
  viewportHeight: 880,
  viewportWidth: 1280
});
