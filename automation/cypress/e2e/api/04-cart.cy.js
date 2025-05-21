describe("API - Carrinhos", () => {
  let carrinhoId;

  before(() => {
    cy.loginApi();
    cy.createProductApi();
  });

  it("Should create a new cart with product", () => {
    cy.request({
      method: "POST",
      url: "/carrinhos",
      headers: { Authorization: Cypress.env("apiKey") },
      body: {
        produtos: [
          {
            idProduto: Cypress.env("productId"),
            quantidade: 1,
          },
        ],
      },
    }).then((response) => {
      expect(response.status).to.eq(201);
      carrinhoId = response.body._id;
    });
  });

  it("Should retrieve the cart by ID", () => {
    cy.request({
      method: "GET",
      url: `/carrinhos/${carrinhoId}`,
      headers: { Authorization: Cypress.env("apiKey") },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("produtos");
      expect(response.body).to.have.property("precoTotal");
      expect(response.body).to.have.property("quantidadeTotal");
      expect(response.body).to.have.property("idUsuario");
    });
  });

  it("Should conclude the purchase and clear the cart", () => {
    cy.request({
      method: "DELETE",
      url: "/carrinhos/concluir-compra",
      headers: { Authorization: Cypress.env("apiKey") },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.message).to.eq("Registro excluído com sucesso");
    });
  });
});
