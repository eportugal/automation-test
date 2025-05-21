import { generateMockData } from "../../support/utils";
import screenElements from "../../support/screenElements";

describe("Registration flow", () => {
  context("Administrator", () => {
    const mockData = generateMockData();

    it("Given the user accesses the login page", () => {
      cy.visit("https://front.serverest.dev/login");
    });

    it("When the user clicks on the register button", () => {
      cy.get(screenElements.cadastrarBtn).click();
    });

    it("And the user fills in the name field", () => {
      cy.get(screenElements.nameInput).type(mockData.nome);
    });

    it("And the user fills in the email field", () => {
      cy.get(screenElements.emailInput).type(mockData.email);
    });

    it("And the user fills in the password field", () => {
      cy.get(screenElements.passwordInputCadastro).type(mockData.password);
    });

    it("And the user checks the terms checkbox", () => {
      cy.get(screenElements.checkbox).check();
    });

    it("And the user submits the registration form", () => {
      cy.get(screenElements.cadastrarBtn).click();
    });

    it("Then a success popup should be displayed", () => {
      cy.get(screenElements.alertPopUp).should(
        "contain.text",
        "Cadastro realizado com sucesso"
      );
    });

    it("And the user data should be saved to fixture", () => {
      cy.writeFile("cypress/fixtures/admin-user.json", mockData);
    });
  });

  context("Regular user", () => {
    const mockData = generateMockData();

    it("Given the user accesses the login page", () => {
      cy.visit("https://front.serverest.dev/login");
    });

    it("When the user clicks on the register button", () => {
      cy.get(screenElements.cadastrarBtn).click();
    });

    it("And the user fills in the name field", () => {
      cy.get(screenElements.nameInput).type(mockData.nome);
    });

    it("And the user fills in the email field", () => {
      cy.get(screenElements.emailInput).type(mockData.email);
    });

    it("And the user fills in the password field", () => {
      cy.get(screenElements.passwordInputCadastro).type(mockData.password);
    });

    it("And the user submits the registration form", () => {
      cy.get(screenElements.cadastrarBtn).click();
    });

    it("Then a success popup should be displayed", () => {
      cy.get(screenElements.alertPopUp).should(
        "contain.text",
        "Cadastro realizado com sucesso"
      );
    });

    it("And the user data should be saved to fixture", () => {
      cy.writeFile("cypress/fixtures/regular-user.json", mockData);
    });
  });
});
