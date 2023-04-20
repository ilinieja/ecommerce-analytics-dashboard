import { createSelector } from "@reduxjs/toolkit";
import { getLoadingStateSelectors } from "../shared/loadingStore";
import { RootState } from "../store";
import {
  getTotalPlatformStatsDateId,
  totalPlatformStatsAdapter,
  totalPlatformStatsSliceName,
} from "./totalPlatformStats.slice";

const getTotalPlatformStatsState = (rootState: RootState) =>
  rootState[totalPlatformStatsSliceName];

const entitySelectors = totalPlatformStatsAdapter.getSelectors(
  getTotalPlatformStatsState
);

const makeSelectTotalPlatformStats = (startDate: string, endDate: string) =>
  createSelector(entitySelectors.selectEntities, (entities) =>
    Object.entries(entities)
      .filter(([key]) =>
        key.startsWith(getTotalPlatformStatsDateId(startDate, endDate))
      )
      .map(([_, value]) => value)
      .sort((a, b) => (b?.revenue ?? 0) - (a?.revenue ?? 0))
  );

export const totalPlatformStatsSelectors = {
  makeSelectTotalPlatformStats,
  ...entitySelectors,
  ...getLoadingStateSelectors(getTotalPlatformStatsState),
};
