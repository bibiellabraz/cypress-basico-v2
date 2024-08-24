Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    cy.get('#firstName').type('Gabriella')
	cy.get('#lastName').type('Braz')
	cy.get('#email').type('bibiellabra@gmail.com')
	cy.get('#open-text-area').type('Teste')
	cy.contains('button', 'Enviar').click()
})
