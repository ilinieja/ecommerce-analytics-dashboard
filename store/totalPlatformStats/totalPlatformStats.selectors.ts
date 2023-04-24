import { createSelector } from "@reduxjs/toolkit";
import { getLoadingStateSelectors } from "../shared/loadingStore";
import { RootState } from "../store";
import {
  getTotalPlatformStatsDateId,
  totalPlatformStatsAdapter,
  totalPlatformStatsSliceName,
} from "./totalPlatformStats.slice";
import { EntityWithParams } from "../shared/statsStore";
import { TotalPlatformStats } from "@/api/services/platform-stats.service";

const getTotalPlatformStatsState = (rootState: RootState) =>
  rootState[totalPlatformStatsSliceName];

const entitySelectors = totalPlatformStatsAdapter.getSelectors(
  getTotalPlatformStatsState
);

const makeSelectTotalPlatformStats = (
  startDate: string,
  endDate: string,
  sortBy: "orders" | "revenue" | "averageOrderRevenue"
) =>
  createSelector(
    entitySelectors.selectEntities,
    (entities) =>
      Object.entries(entities)
        .filter(([key]) =>
          key.startsWith(getTotalPlatformStatsDateId(startDate, endDate))
        )
        .map(([_, value]) => value)
        .sort((a, b) => (b ? b[sortBy] : 0) - (a ? a[sortBy] : 0)) as Array<
        EntityWithParams<TotalPlatformStats>
      >
  );

export const totalPlatformStatsSelectors = {
  makeSelectTotalPlatformStats,
  ...entitySelectors,
  ...getLoadingStateSelectors(getTotalPlatformStatsState),
};
