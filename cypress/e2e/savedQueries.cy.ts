describe("Saved Queries Page", () => {
  before(() => {
    cy.login(
      Cypress.env("GITHUB_EMAIL"),
      Cypress.env("GITHUB_PASSWORD"),
      "GitHub"
    )
    cy.visit("/saved")
  })
  it("Shows 'Create' button if no queries are saved", () => {
    cy.fixture("user/empty.json").then((user) => {
      cy.intercept("GET", "/api/user", user).as("getUser")
    })
    cy.wait("@getUser")
    cy.get("button").should("contain", "Start a new query")
  })
  it("Shows saved queries", () => {
    cy.fixture("user/populated.json").then((user) => {
      cy.intercept("GET", "/api/user", user).as("getUser")
    })
    cy.wait("@getUser")
    cy.get('[data-testid="queries-wrapper"]')
      .children()
      .should("have.length", 2)
  })
})
