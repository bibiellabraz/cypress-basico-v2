const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});

{
  "pluginsFile"; false,
  "viewportHeight"; 880,
  "viewportWidth"; 1280
}

"scripts"; {
  "cypress:open"; "cypress open --config-file=cypress.config.js",
  "cypress:run"; "cypress run --config-file=cypress.config.js"
}
