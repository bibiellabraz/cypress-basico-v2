/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
  beforeEach(function() {
//a ação foi verificar a página  
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', function() {
//e a verificação, verificar que o título está correto
    cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', function() {
    cy.get('#firstName').type('Gabriella')
    cy.get('#lastName').type('Braz')
    cy.get('#email').type('bibiellabra@gmail.com')
    cy.get('#open-text-area').type('testando a caixa de texto')
    cy.contains('button', 'Enviar').click()

    cy.get('.success').should('be.visible')
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
    cy.get('#firstName')
    .type('Ana')
    .should('have.value', 'Ana')
    .clear()
    .should('have.value', '')
    
    cy.get('#lastName')
    .type('Braz')
    .should('have.value', 'Braz')
    .clear()
    .should('have.value', '')

    cy.get('#email')
    .type('bibiellabra@gmail.com')
    .should('have.value', 'bibiellabra@gmail.com')
    .clear()
    .should('have.value', '')

    cy.get('#phone')
    .type(1234567890)
    .should('have.value', '1234567890')
    .clear()
    .should('have.value', '')
  })
  
  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
  })

  it('envia o formuário com sucesso usando um comando customizado', function() {
    cy.fillMandatoryFieldsAndSubmit()
    cy.get('.success').should('be.visible')
  })

  it('seleciona um produto (YouTube) por seu texto', function() {
    cy.get('#product')
    .select('YouTube')
    .should('have.value', 'youtube')
  })
  
  it('seleciona um produto (Mentoria) por seu valor (value)', function() {
    cy.get('#product')
    .select('mentoria')
    .should('have.value', 'mentoria')
  })

  it('seleciona um produto (Blog) por seu índice', function() {
    cy.get('#product')
    //valor 1 é a segunda "option"
    .select(1)
    .should('have.value', 'blog')
  })

  it('marca o tipo de atendimento "Feedback"', function(){
// não utilizamos o seletor cy.get('#support-type > :nth-child(4)') pois não é mto legível
    cy.get('input[type="radio"][value="feedback"]')
    .check()
    .should('have.value', 'feedback')
  })

  it('marca cada tipo de atendimento', function() {
    cy.get('input[type="radio"]')
    .should('have.length', 3)
    .each(function($radio) {
      cy.wrap($radio).check()
      cy.wrap($radio).should('be.checked')
    })
  })

  it('marca ambos checkboxes, depois desmarca o último', function() {
    cy.get('input[type="checkbox"]')
    .check()
    .should('be.checked')
    .last()
    .uncheck()
    .should('not.be.checked')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
    cy.get('#firstName').type('Gabriella')
    cy.get('#lastName').type('Braz')
    cy.get('#email').type('bibiellabra@gmail.com')
    cy.get('#phone-checkbox').check()
    cy.get('#open-text-area').type('Testando caixa de texto')
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })

  it('seleciona um arquivo da pasta fixtures', function() {
 //ou colocar cy.get('input[type="file"]')
    cy.get('#file-upload')
    .should('not.have.value')
    .selectFile('cypress/fixtures/example.json')
    .should(function($input) {
      console.log($input)
      expect($input[0].files[0].name).to.equal('example.json')
    })
  })

  it('seleciona um arquivo simulando um drag-and-drop', function() {
    cy.get('#file-upload')
    .should('not.have.value')
    .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
    .should(function($input) {
      console.log($input)
      expect($input[0].files[0].name).to.equal('example.json')
    })
  })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function() {
    cy.fixture('example.json').as('sampleFile')
    cy.get('#file-upload')
    .selectFile('@sampleFile')
    .should(function($input) {
      expect($input[0].files[0].name).to.equal('example.json')
    })
  })

  it.only('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function() {
    cy.get('#privacy a').should('have.attr', 'target', '_blank')
  })

  it('acessa a página da política de privacidade removendo o target e então clicando no link', function() {
    cy.get('#privacy a')
    .invoke('removeAttr', 'target')
    .click()

    cy.contains('Talking About Testing').should('be.visible')
  }) 
  
  })



