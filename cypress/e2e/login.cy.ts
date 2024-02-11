describe("Login", () => {
  it("Logs in with GitHub", () => {
    const email = Cypress.env("GITHUB_EMAIL")
    const password = Cypress.env("GITHUB_PASSWORD")
    cy.login(email, password, "GitHub")
    cy.visit("/")
  })
})
