// https://docs.cypress.io/api/introduction/api.html

describe('Login Test', () => {
  const serverURL = Cypress.env('VUE_APP_URL')
  beforeEach(() => {
    cy.server()
    cy.route('GET', `${serverURL}/api/tahfidz/selections/latest/`, {
      "latest_opened": {
        "id": 1,
        "start_date": new Date(2020, 1, 1),
        "end_date": new Date(2020, 12, 22)
      }
    })
    cy.visit('/')
  })

  it('Login with a valid information', () => {
    cy.get(".login").click()
    cy.get("#input-1").type("pplkece")
    cy.get("#input-2").type("pplHebat123")
    cy.route('POST', `${serverURL}/api/auth/jwt/create/`, {
      refresh: "3492075n3f2730972320g5",
      access: "9325n329f3b0273b0972f3"
    })
    cy.get("#submit").click()
    cy.get(".profile").should("be.visible")
  })

  it('Login with a invalid information', () => {
    cy.get(".login").click()
    cy.get("#input-1").type("wete421")
    cy.get("#input-2").type("ppfeegbat123")
    cy.get("#submit").click()
    cy.contains("Invalid Credentials")
  })

  it('Failed Login with a empty  information', () => {
    cy.get(".login").click()
    cy.get("#input-2").type("ppfeegbat123")
    cy.get("#submit").click()
    cy.contains("Username is required")
  })
})