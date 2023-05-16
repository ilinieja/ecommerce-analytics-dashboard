import React from "react";
import { TopLocationsChart } from "./TopLocationsChart";
import { ComponentTestWrapper } from "@/tests/utils/ComponentTestWrapper";

describe("<TopLocationsChart />", () => {
  beforeEach(() => {
    cy.intercept("GET", "**/api/geo-bucket-stats/total**", {
      fixture: "geo-bucket-stats-total.json",
    }).as("getTotalGeoBucketStats");

    cy.mount(
      <ComponentTestWrapper>
        <TopLocationsChart />
      </ComponentTestWrapper>
    );
    cy.wait(["@getTotalGeoBucketStats"]);
  });

  it("renders sorted locations in legend", () => {
    cy.get('[data-testid="ChartLegend_item"]').should(
      "have.text",
      ["Americas", "Europe", "Asia", "Other"].join("")
    );
  });

  it("renders location percentages around the chart", () => {
    cy.get('[data-testid="DonutChart_label"]').should(
      "have.text",
      ["$159.2k", "$151.4k", "$132.6k", "$127.8k"].join("")
    );
  });
});
