/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

Cypress.Commands.add(
  "login",
  (email: string, password: string, method: "GitHub" | "Google") => {
    cy.session(
      `login-${method}`,
      () => {
        cy.visit("/api/auth/signin")
        cy.get("button").contains(method).click()
        cy.origin(
          "https://github.com",
          {
            args: {
              email,
              password,
            },
          },
          ({ email, password }) => {
            cy.get('input[name="login"]').type(email, {
              log: false,
            })
            cy.get('input[name="password"]').type(password, {
              log: false,
            })
            cy.get('input[type="submit"]').click()
          }
        )
        cy.wait(2000)
        cy.visit("/")
      },
      {
        validate: () => {
          cy.get('[data-testid="avatar"]').should("exist")
        },
        cacheAcrossSpecs: true,
      }
    )
  }
)

declare namespace Cypress {
  interface Chainable {
    login(
      email: string,
      password: string,
      method: "GitHub" | "Google"
    ): Chainable<void>
  }
}
