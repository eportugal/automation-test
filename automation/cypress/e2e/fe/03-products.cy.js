import screenElements from "../../support/screenElements";
import { productSearcher } from "../../support/utils";
import { faker } from "@faker-js/faker";

describe("Cart Flow", () => {
  context("Product creation", () => {
    let user;
    const produto = {
      nome: faker.commerce.productName(),
      preco: faker.number.int({ min: 10, max: 999 }),
      descricao: faker.commerce.productDescription(),
      quantidade: faker.number.int({ min: 1, max: 100 }),
    };

    before(() => {
      cy.readFile("cypress/fixtures/admin-user.json").then((data) => {
        user = data;
      });
    });

    it("Given the user is logged in as admin", () => {
      cy.loginFe(user);
    });

    it("When the user navigates to the product creation page", () => {
      cy.get(screenElements.CadastrarProdutos).click();
    });

    it("And fills in the product creation form", () => {
      cy.get(screenElements.nameInput).type(produto.nome);
      Cypress.env("createdProductName", produto.nome);
      cy.get(screenElements.precoInput).type(produto.preco.toString());
      cy.get(screenElements.descricaoInput).type(produto.descricao);
      cy.get(screenElements.qtdInput).type(produto.quantidade.toString());
      cy.get(screenElements.imgInput).selectFile(
        "cypress/fixtures/image-placeholder.jpg"
      );
    });

    it("Then the user should be able to submit the product form", () => {
      cy.get(screenElements.cadastrarProductBtn).click();
    });
  });

  context("Add to cart", () => {
    let user;
    let product;

    before(() => {
      cy.readFile("cypress/fixtures/regular-user.json").then((data) => {
        user = data;
      });
      product = Cypress.env("createdProductName");
    });

    it("Given the user is logged in as a regular user", () => {
      cy.loginFe(user);
    });

    it("When the user searches for the product by name", () => {
      expect(product, "Produto criado anteriormente").to.be.a("string").and.not
        .be.empty;
      cy.get(screenElements.pesquisarInput).type(product);
    });

    it("Then the user should be able to add the product to the cart", () => {
      productSearcher(product).then((index) => {
        cy.get(screenElements.wishListBtn).eq(index).click();
      });
    });
  });
});
