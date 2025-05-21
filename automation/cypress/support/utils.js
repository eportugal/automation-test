import { faker } from "@faker-js/faker";
import screenElements from "./screenElements";

export function generateMockData() {
  return {
    nome: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
}

export function productSearcher(product) {
  return cy.get(screenElements.cardTitle).then(($titles) => {
    const index = [...$titles].findIndex((el) => {
      const normalized = el.textContent
        .replace(/\s+/g, " ")
        .trim()
        .toLowerCase();
      return normalized.includes(product.toLowerCase());
    });

    expect(index, `No card-title found containing "${product}"`).to.be.gte(0);
    return index;
  });
}
