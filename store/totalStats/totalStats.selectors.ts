import { createSelector } from "@reduxjs/toolkit";
import { getLoadingStateSelectors } from "../shared/loading";
import { RootState } from "../store";
import { TotalStatsSliceState } from "./totalStats.slice";

const getTotalStatsState = (rootState: RootState) =>
  rootState.totalStats as TotalStatsSliceState;

const getTotalRevenue = createSelector(
  getTotalStatsState,
  (totalStats) => totalStats.revenue
);

const getTotalOrders = createSelector(
  getTotalStatsState,
  (totalStats) => totalStats.orders
);

const getTotalAverageOrderRevenue = createSelector(
  getTotalStatsState,
  (totalStats) => totalStats.averageOrderRevenue
);

export const totalStatsSelectors = {
  getTotalRevenue,
  getTotalOrders,
  getTotalAverageOrderRevenue,
  ...getLoadingStateSelectors(getTotalStatsState),
};
