import { faker } from "@faker-js/faker";
import screenElements from "./screenElements";

Cypress.Commands.add("loginApi", (user) => {
  if (user) {
    login(user);
  } else {
    cy.fixture("default-user").then(login);
  }

  function login({ email, password }) {
    cy.request("POST", "/login", {
      email,
      password,
    }).then((res) => {
      expect(res.status).to.eq(200);
      const apiKey = res.body.authorization;
      Cypress.env("apiKey", apiKey);
      return apiKey;
    });
  }
});

Cypress.Commands.add("loginFe", (user) => {
  cy.visit("https://front.serverest.dev/login");
  cy.get(screenElements.emailInput).type(user.email);
  cy.get(screenElements.passwordInput).type(user.password);
  cy.get(screenElements.entrarBtn).click();
  cy.url().should("include", "/home");
});

Cypress.Commands.add("createProductApi", () => {
  const product = {
    nome: faker.commerce.productName(),
    preco: faker.number.int({ min: 1, max: 1000 }),
    descricao: faker.commerce.productDescription(),
    quantidade: faker.number.int({ min: 1, max: 1000 }),
  };

  cy.request({
    method: "POST",
    url: "/produtos",
    headers: {
      Authorization: Cypress.env("apiKey"),
    },
    body: product,
  }).then((res) => {
    expect(res.status).to.eq(201);
    Cypress.env("productId", res.body._id);
    return;
  });
});
