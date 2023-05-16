import { defineConfig } from "cypress";
import getCompareSnapshotsPlugin from 'cypress-visual-regression/dist/plugin';

export default defineConfig({
  snapshotFileName: "cypress/snapshots.js",
  screenshotsFolder: './tests/e2e/snapshots',
  trashAssetsBeforeRuns: true,
  video: false,
  failSilently: false,
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
  e2e: {
    setupNodeEvents(on, config) {
      getCompareSnapshotsPlugin(on, config);
    },
    specPattern: 'tests/e2e/**/*.cy.{js,jsx,ts,tsx}',
  },
});
