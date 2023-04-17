import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "../store";

import { FiltersState } from "./filters.slice";

const getFiltersState = (rootState: RootState) =>
  rootState.filters as FiltersState;

const getDateRange = createSelector(
  getFiltersState,
  ({ dateRange: { startDate, endDate } }) => ({
    startDate: new Date(startDate),
    endDate: new Date(endDate),
  })
);

export const filtersSelectors = {
  getDateRange,
};
