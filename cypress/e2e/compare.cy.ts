describe("Compare countries", () => {
  before(() => {
    cy.visit("/query")
  })
  it("Compares two countries", () => {
    cy.get("[data-testid=land1]").click()
    cy.get('li[role="option"]').contains("United States of America").click()
    cy.wait(300) // wait for the list to close
    cy.get("[data-testid=land2]").click()
    cy.get('li[role="option"]').contains("Norway").click()
    cy.get("button[type=submit]").click()

    cy.url().should("include", "/query/USA-NOR")
    cy.get("h2").should("contain", "Norway")
    cy.get("h2").should("contain", "United States")
  })
})
