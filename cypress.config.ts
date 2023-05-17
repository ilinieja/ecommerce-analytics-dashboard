import { defineConfig } from "cypress";
import { getAppUrl } from "./tests/utils/url";

export default defineConfig({
  snapshotFileName: "cypress/snapshots.js",
  env: {
    APP_URL: getAppUrl()
  },
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
  e2e: {
    setupNodeEvents(on, config) {
    },
    specPattern: "tests/e2e/**/*.cy.{js,jsx,ts,tsx}",
  },
});
