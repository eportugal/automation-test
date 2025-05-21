import screenElements from "../../support/screenElements";

describe("Login flow", () => {
  context("Admin Login", () => {
    let admin;

    before(() => {
      cy.readFile("cypress/fixtures/admin-user.json").then((data) => {
        admin = data;
      });
    });

    it("Given the admin is on the login page", () => {
      cy.visit("https://front.serverest.dev/login");
    });

    it("When the admin fills in the email and the password", () => {
      cy.get(screenElements.emailInput).type(admin.email);
      cy.get(screenElements.passwordInput).type(admin.password);
    });

    it("And clicks the login button", () => {
      cy.get(screenElements.entrarBtn).click();
    });

    it("Then the admin should be redirected to the home page", () => {
      cy.url().should("include", "/home");
    });

    it("And the welcome message should be visible", () => {
      cy.get(screenElements.welcomeText).should("include.text", "Bem Vindo");
    });
  });

  context("Regular User Login", () => {
    let user;

    before(() => {
      cy.readFile("cypress/fixtures/regular-user.json").then((data) => {
        user = data;
      });
    });

    it("Given the user is on the login page", () => {
      cy.visit("https://front.serverest.dev/login");
    });

    it("When the user fills in the email and the password", () => {
      cy.get(screenElements.emailInput).type(user.email);
      cy.get(screenElements.passwordInput).type(user.password);
    });

    it("And clicks the login button", () => {
      cy.get(screenElements.entrarBtn).click();
    });

    it("Then the user should be redirected to the home page", () => {
      cy.url().should("include", "/home");
    });

    it("And the welcome message should be visible", () => {
      cy.get(screenElements.welcomeText).should(
        "include.text",
        "Serverest Store"
      );
    });
  });
});
