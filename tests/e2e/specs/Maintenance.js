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

    it('goto program page', () => {
        cy.visit("/program")
    })
})