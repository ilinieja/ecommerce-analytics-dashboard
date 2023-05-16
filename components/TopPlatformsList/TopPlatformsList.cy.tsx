import React from "react";
import TopPlatformsList from "./TopPlatformsList";
import { ComponentTestWrapper } from "@/tests/utils/ComponentTestWrapper";

describe("<TopPlatformsList />", () => {
  beforeEach(() => {
    cy.intercept("GET", "**/api/platform-stats/total**", {
      fixture: "platform-stats-total.json",
    }).as("getTotalPlatformStats");
    cy.intercept("GET", "**/api/stats/total**", {
      fixture: "stats-total.json",
    }).as("getTotalStats");

    cy.mount(
      <ComponentTestWrapper>
        <TopPlatformsList />
      </ComponentTestWrapper>
    );
    cy.wait(["@getTotalPlatformStats", "@getTotalStats"]);
  });

  it("renders top platforms sorted by revenue", () => {
    cy.get('[data-testid="TopPlatformsListItem_title"]').should(
      "have.text",
      ["Farfetch", "Ebay", "Amazon", "Allegro"].join("")
    );
  });

  it("renders revenue and orders for each platform", () => {
    cy.get('[data-testid="TopPlatformsListItem_note"]').should(
      "have.text",
      [
        "$160k Revenue | 555 Orders",
        "$142k Revenue | 506 Orders",
        "$121k Revenue | 423 Orders",
        "$110k Revenue | 420 Orders",
      ].join("")
    );
  });

  it("renders total percentage for each platform", () => {
    cy.get('[data-testid="PercentageCircleChart_text"]').should(
      "have.text",
      ["30%", "27%", "23%", "21%"].join("")
    );
  });
});
