import React from "react";
import BreakdownStatsChart from "./BreakdownStatsChart";
import { ComponentTestWrapper } from "@/tests/utils/ComponentTestWrapper";

describe("<BreakdownStatsChart />", () => {
  beforeEach(() => {
    cy.intercept("GET", "**/api/platform-stats/day**", {
      fixture: "platform-stats-day.json",
    }).as("getDayPlatformStats");
    cy.intercept("GET", "**/api/geo-bucket-stats/day**", {
      fixture: "geo-bucket-stats-day.json",
    }).as("getDayGeoBucketStats");

    cy.mount(
      <ComponentTestWrapper>
        <BreakdownStatsChart />
      </ComponentTestWrapper>
    );
    cy.wait("@getDayPlatformStats");
  });

  it("renders sorted platforms in legend", () => {
    cy.get('[data-testid="ChartLegend_item"]').should(
      "have.text",
      ["Amazon", "Ebay", "Allegro", "Farfetch"].join("")
    );
  });

  it("renders date range on x axis", () => {
    cy.get('[data-testid="StackedBarChart_xAxis_label"]').should(
      "have.text",
      [
        "15 Feb",
        "16 Feb",
        "17 Feb",
        "18 Feb",
        "19 Feb",
        "20 Feb",
        "21 Feb",
        "22 Feb",
        "23 Feb",
        "24 Feb",
        "25 Feb",
        "26 Feb",
        "27 Feb",
        "28 Feb",
      ].join("")
    );
  });

  it("renders values range on y axis", () => {
    cy.get('[data-testid="StackedBarChart_yAxis_label"]').should(
      "have.text",
      ["0", "10k", "20k", "30k", "40k", "50k"].join("")
    );
  });

  it("renders stacks in chart area", () => {
    cy.get('[data-testid="StackedBarChart_chart_segment"]').each((el) => {
      cy.wrap(el).snapshot();
    });
  });

  it("opens dimension options on select click", () => {
    cy.get('[data-testid="Select_trigger"]').click();

    cy.get('[data-testid="Select_item"]').should(
      "have.text",
      [
        "Revenue by platform",
        "Orders by platform",
        "Avg order revenue by platform",
        "Revenue by location",
        "Orders by location",
        "Avg order revenue by location",
      ].join("")
    );
  });

  it("updates chart on dimension change", () => {
    cy.get('[data-testid="Select_trigger"]').click();

    cy.get('[data-testid="Select_item"]').eq(4).click();
    cy.wait("@getDayGeoBucketStats");

    cy.get('[data-testid="StackedBarChart_chart_segment"]').each((el) => {
      cy.wrap(el).snapshot();
    });
  });

  it("shows tooltip on chart segment hover", () => {
    cy.get('[data-testid="StackedBarChart_chart_segment"]')
      .eq(10)
      .trigger("mouseenter");

    cy.wait(10);

    cy.get('[data-testid="StackedBarChart_tooltip_title"]').should(
      "have.text",
      "25 Feb"
    );
    cy.get('[data-testid="StackedBarChart_tooltip_item"]').should(
      "have.text",
      ["Farfetch:7.4k", "Allegro:10.5k", "Ebay:6.1k", "Amazon:14.2k"].join("")
    );
  });
});
