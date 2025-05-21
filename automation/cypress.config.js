import { defineConfig } from "cypress";
import mochawesome from "cypress-mochawesome-reporter/plugin.js";
import fs from "fs";

export default defineConfig({
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    reportDir: "cypress/reports",
    charts: true,
    reportFilename: "e2e-serverest-report",
    reportPageTitle: "Serverest Automation Test Report",
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },
  chromeWebSecurity: false,
  video: true,
  videoCompression: 32,
  e2e: {
    setupNodeEvents(on, config) {
      mochawesome(on);
      on("task", {
        fileExists(path) {
          return fs.existsSync(path);
        },
      });
      return config;
    },
    baseUrl: "https://serverest.dev/",
    testIsolation: false,
  },
});
