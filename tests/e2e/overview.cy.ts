import { getAppUrl } from "../utils/url";

describe("Overview page", () => {
  beforeEach(() => {
    cy.intercept("api/**").as("requests");
    cy.visit(`${Cypress.env("APP_URL")}/overview`);
    cy.wait("@requests");
  });

  it("hides loading indicators after all data requests complete", () => {
    cy.get('[data-testid="LoadingOverlay_overlay"]').should("not.exist");
  });

  it("displays total stats", () => {
    cy.get('[data-testid="TotalStat_value"]').should(
      "have.text",
      ["$48.047k", "169", "$303.81"].join("")
    );
  });

  it("displays breakdown stats chart", () => {
    cy.get('[data-testid="BreakdownStatsChart_chart"]').should("exist");
  });

  it("displays top platforms list", () => {
    cy.get('[data-testid="TopPlatformsList_list"]').should("exist");
  });

  it("displays top locations chart", () => {
    cy.get('[data-testid="TopLocationsChart_chart"]').should("exist");
  });

  it("displays orders table", () => {
    cy.get('[data-testid="OrdersTable_table"]').should("exist");
  });
});
