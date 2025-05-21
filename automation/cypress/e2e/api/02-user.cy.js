import { faker } from "@faker-js/faker";

describe("API - Usuários", () => {
  let userId;
  const user = {
    nome: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    administrador: "true",
  };

  it("Should create a new user", () => {
    cy.request("POST", "/usuarios", user).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.headers["content-type"]).to.include("application/json");
      expect(response.body.message).to.eq("Cadastro realizado com sucesso");
      expect(response.body._id).to.not.be.empty;

      userId = response.body._id;
    });
  });

  it("Should retrieve user by ID", () => {
    cy.request(`https://serverest.dev/usuarios/${userId}`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("nome");
      expect(response.body).to.have.property("email");
      expect(response.body).to.have.property("password");
      expect(response.body).to.have.property("administrador");
      expect(response.body).to.have.property("_id").and.to.not.be.empty;
    });
  });

  it("Should update the created user", () => {
    const updatedUser = {
      nome: user.nome,
      email: user.email,
      password: faker.internet.password(),
      administrador: "false",
    };

    cy.request({
      method: "PUT",
      url: `https://serverest.dev/usuarios/${userId}`,
      body: updatedUser,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.headers["content-type"]).to.include("application/json");
      expect(response.body.message).to.eq("Registro alterado com sucesso");
    });
  });
});
