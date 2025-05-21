describe("API - Produtos", () => {
  before(() => {
    cy.loginApi();
  });

  it("Should create a product", () => {
    cy.createProductApi().then((productId) => {
      expect(productId).to.not.be.empty;
    });
  });

  it("Should fetch product by ID", () => {
    cy.request({
      method: "GET",
      url: `/produtos/${Cypress.env("productId")}`,
      headers: {
        Authorization: Cypress.env("apiKey"),
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("nome");
      expect(response.body).to.have.property("preco");
      expect(response.body).to.have.property("descricao");
      expect(response.body).to.have.property("quantidade");
    });
  });

  it("Should delete the product by ID", () => {
    cy.request({
      method: "DELETE",
      url: `/produtos/${Cypress.env("productId")}`,
      headers: { Authorization: Cypress.env("apiKey") },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.message).to.eq("Registro excluído com sucesso");
    });
  });
});
