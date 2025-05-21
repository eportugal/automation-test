describe("API - Login", () => {
  it("Should login with valid credentials and return apiKey", () => {
    cy.loginApi().then((apiKey) => {
      expect(apiKey).to.be.a("string").and.not.be.empty;
    });
  });
});
