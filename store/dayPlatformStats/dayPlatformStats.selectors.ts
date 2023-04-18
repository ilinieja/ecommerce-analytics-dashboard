import { createSelector } from "@reduxjs/toolkit";

import { getLoadingStateSelectors } from "../shared/loading";
import { DayStatsSliceState } from "../shared/dayStats";
import { RootState } from "../store";

import {
  dayPlatformStatsAdapter,
  dayPlatformStatsSliceName,
} from "./dayPlatformStats.slice";
import { DayPlatformStats } from "@/api/services/platform-stats.service";

const getDayPlatformStatsState = (rootState: RootState) =>
  rootState[dayPlatformStatsSliceName] as DayStatsSliceState<DayPlatformStats>;

const entitySelectors = dayPlatformStatsAdapter.getSelectors<RootState>(
  getDayPlatformStatsState
);

export const dayPlatformStatsSelectors = {
  ...entitySelectors,
  ...getLoadingStateSelectors(getDayPlatformStatsState),
};
