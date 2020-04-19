afterEach(() => {
    cy.exec('npx nyc report --reporter=html')
})