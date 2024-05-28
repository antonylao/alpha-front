<<<<<<< HEAD
describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:8090')
  })
=======


describe('test SignUp', () => {
  it('SignUp', () => {
    cy.visit('http://localhost:8090/volonteer_signin')
    cy.get('[data-cy="Sign Up"]').click()
    cy.get('input[data-cy="firstname"]').type('Hugo')
    cy.get('input[data-cy="lastname"]').type('Antonietto')
    cy.get('input[data-cy="email"]').type('hugo.antoniettto@hotmail.fr')
    cy.get('input[data-cy="password"]').type('azertyuiop6')
    cy.get('input[data-cy="confirmPassword"]').type('azertyuiop6')
    cy.get('input[data-cy="phone"]').type('0610101010')
    cy.get('[data-cy="SignUpButton"]').click()
    // cy.get('[data-cy="firstnameerror"]').should('be.visible')
    // cy.get('[data-cy="lastnameerror"]').should('be.visible')
    // cy.get('[data-cy="emailerror"]').should('be.visible')
    // cy.get('[data-cy="passworderror"]').should('be.visible')
    // cy.get('[data-cy="passworderror"]').contains('Le mot de passe doit comporter au moins 8 caractères')
    // cy.get('[data-cy="passworderror"]').contains('Le mot de passe doit comporter au maximum 15 caractères')
    // cy.get('[data-cy="confirmPassworderror"]').contains('Les mots de passes ne sont pas identiques')
    // cy.get('[data-cy="emailerror"]').should('be.visible')
   })
})

describe('test SignUp', () => {
  it('SignUp', () => {
    cy.visit('http://localhost:8090/volonteer_signin')
    // cy.get('[data-cy="Sign Up"]').click()
    // cy.get('input[data-cy="firstname"]').type('Hugo')
    // cy.get('input[data-cy="lastname"]').type('Antonietto')
    cy.get('input[data-cy="SignInemail"]').type('hugo.antoniettto@hotmail.fr')
    cy.get('input[data-cy="SignInpassword"]').type('azertyuiop6')
    // cy.get('input[data-cy="confirmPassword"]').type('azertyuiop6')
    // cy.get('input[data-cy="phone"]').type('0610101010')
    cy.get('[data-cy="SignInButton"]').click()
    // cy.get('[data-cy="firstnameerror"]').should('be.visible')
    // cy.get('[data-cy="lastnameerror"]').should('be.visible')
    // cy.get('[data-cy="emailerror"]').should('be.visible')
    // cy.get('[data-cy="passworderror"]').should('be.visible')
    // cy.get('[data-cy="passworderror"]').contains('Le mot de passe doit comporter au moins 8 caractères')
    // cy.get('[data-cy="passworderror"]').contains('Le mot de passe doit comporter au maximum 15 caractères')
    // cy.get('[data-cy="confirmPassworderror"]').contains('Les mots de passes ne sont pas identiques')
    // cy.get('[data-cy="emailerror"]').should('be.visible')
   })
>>>>>>> develop
})