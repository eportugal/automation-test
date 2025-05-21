# 🛒 Cypress E2E - Serverest Automation Test

This repository contains an end-to-end automation test suite that validates the full flow of product creation and addition to cart using a sample storefront system. The project is structured in BDD style and makes use of dynamic data generation with Faker, ensuring realistic and robust testing scenarios.

---

## ✅ Technologies Used

- [**Cypress**](https://www.cypress.io/) – Main framework for end-to-end tests. Chosen for its modern, fast, and developer-friendly approach.

- [**Faker.js**](https://fakerjs.dev/) – Used for dynamic generation of product data like names, prices, descriptions, and quantities.

- [**cypress-mochawesome-reporter**](https://github.com/LironEr/cypress-mochawesome-reporter) – Generates rich HTML reports with embedded screenshots, useful for debugging and evidence.

---

## 📁 Project Structure

```
📦 cypress/
┣ 📂 e2e/
┃ ┗ 📜 cart-flow.cy.js
┣ 📂 fixtures/
┃ ┣ 📜 admin-user.json
┃ ┣ 📜 regular-user.json
┃ ┗ 📜 image-placeholder.jpg
┣ 📂 support/
┃ ┣ 📜 commands.js
┃ ┣ 📜 e2e.js
┃ ┣ 📜 screenElements.js
┃ ┗ 📜 utils.js
┣ 📂 reports/
┣ 📂 videos/
```

---

## ⚙️ Installation Instructions

1. Clone the repository and install dependencies:

```bash
cd automation
npm install
```

---

## 🚀 How to Run the Tests

### Headless mode with HTML report generation:

```bash
npm run test
```

The report will be saved to:  
📄 `cypress/reports/`

---

## ✨ Automation Strategy

- Tests follow the **BDD (Behavior-Driven Development)** format, with separate `it` blocks for `Given`, `When`, and `Then`.
- The flow simulates the following:
  - Admin logs in and creates a new product with dynamic data (Faker)
  - Regular user logs in and searches for that product
  - The user adds the product to the cart
- **Selectors** are centralized in a shared `screenElements` module for easy maintainability.
- **Cypress custom commands** and helper utilities are used to encapsulate repetitive actions (e.g., login, product search).
- All generated products are **saved temporarily using `Cypress.env()`**, allowing cross-context usage within the same spec.
- Screenshot and video capturing is enabled automatically for report generation via Mochawesome.

---

## 📝 Notes

- The flow assumes all users and permissions are pre-configured in the backend.
- Dynamic data generation ensures a fresh, unique product for each test run.
- The same dynamically created product is searched and validated later in the test to simulate real user behavior.
- A sample image (`image-placeholder.jpg`) is included in the project to support the product creation upload field.
