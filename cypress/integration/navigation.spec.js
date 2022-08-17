/* eslint-disable no-undef */
// describe("My first Cypress tests", () => {

//   it("true is true", () => {
//     assert.equal(true, true);
//   });

// 	it('can visit a web page', () => {
// 		cy.visit('https://example.cypress.io')

// 		cy.get('.nav-link')
// 		.first()
// 		.find('input')
// 		.uncheck()
// 		.should('not.be.checked')
// 	})
// });
// beforeEach(() => {
//   cy.visit("http://localhost:8001/api/debug/reset");
// });

describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });

  it("should navigate to Tuesday", () => {
    cy.visit("/");
    cy.get("li").contains("Tuesday").click();

    cy.contains("[data-testid=day]", "Tuesday")
      .click()
      .should("have.class", "day-list__item--selected");
  });
});
