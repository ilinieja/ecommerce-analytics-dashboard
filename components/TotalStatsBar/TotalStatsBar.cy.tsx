import React from "react";
import TotalStatsBar from "./TotalStatsBar";
import { TestStoreProvider } from "@/testing/utils";

describe("<TotalStatsBar />", () => {
  beforeEach(() => {
    cy.intercept("GET", "**/api/stats/total**", {
      fixture: "stats-total.json",
    }).as("getTotalStats");
    cy.intercept("GET", "**/api/stats/day**", {
      fixture: "stats-day.json",
    }).as("getDayStats");

    cy.mount(
      <TestStoreProvider>
        <TotalStatsBar />
      </TestStoreProvider>
    );
    cy.wait(["@getTotalStats", "@getDayStats"]);
  });

  it("renders total stat values", () => {
    cy.get('[data-testid="TotalStat_value"]').should(
      "have.text",
      ["$533.496k", "1.904k", "$277.43"].join("")
    );
  });

  it("renders stat start-end change", () => {
    cy.get('[data-testid="ValuesDiff_value"]').should(
      "have.text",
      ["-39%", "-34%", "-8%"].join("")
    );
  });
});
