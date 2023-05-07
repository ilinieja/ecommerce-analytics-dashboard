import React from "react";

import { TestStoreProvider } from "@/testing/utils";

import { OrdersTable } from "./OrdersTable";

describe("<OrdersTable />", () => {
  beforeEach(() => {
    cy.intercept("GET", "**/api/orders**", {
      fixture: "orders.json",
    }).as("getOrders");

    cy.mount(
      <TestStoreProvider>
        <OrdersTable />
      </TestStoreProvider>
    );
    cy.wait(["@getOrders"]);
  });

  it("renders 5 orders", () => {
    cy.get('[data-testid="OrdersTable_row"]').should("have.length", 5);
  });

  it("renders customer names and platforms", () => {
    cy.get('[data-testid="OrdersTable_cell_customer"]').should(
      "have.text",
      [
        "Dan Bode",
        "Ebay",
        "Javier Leuschke",
        "Allegro",
        "Yvette Bosco",
        "Ebay",
        "Sharon Hoppe DVM",
        "Allegro",
        "Dallas Kris",
        "Allegro",
      ].join("")
    );
  });

  it("renders items", () => {
    cy.get('[data-testid="OrdersTable_cell_items"]').should(
      "have.text",
      [
        "Intelligent Soft Bacon, Generic Concrete Ball (+2)",
        "Handcrafted Steel Shoes, Handmade Bronze Hat (+3)",
        "Electronic Bronze Chicken, Electronic Cotton Pizza (+1)",
        "Intelligent Metal Salad, Tasty Bronze Computer (+5)",
        "Unbranded Bronze Ball, Elegant Plastic Computer (+4)",
      ].join("")
    );
  });

  it("renders locations", () => {
    cy.get('[data-testid="OrdersTable_cell_location"]').should(
      "have.text",
      [
        "Fort Annalise, Gambia",
        "Aricberg, Guinea",
        "Jadeborough, Finland",
        "Boyerchester, Kazakhstan",
        "Odaside, Saint Martin",
      ].join("")
    );
  });

  it("renders leads", () => {
    cy.get('[data-testid="OrdersTable_cell_lead"]').should(
      "have.text",
      ["Instagram", "Facebook", "Instagram", "GoogleAds", "Email"].join("")
    );
  });

  it("renders values", () => {
    cy.get('[data-testid="OrdersTable_cell_value"]').should(
      "have.text",
      ["$1.2k", "$1.4k", "$95", "$3.2k", "$2.2k"].join("")
    );
  });
});
