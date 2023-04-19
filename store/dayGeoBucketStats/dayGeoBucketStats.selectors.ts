import { createSelector } from "@reduxjs/toolkit";

import { DayGeoBucketStats } from "@/api/services/geo-bucket-stats.service";

import { getLoadingStateSelectors } from "../shared/loading";
import { DayStatsSliceState } from "../shared/dayStats";
import { RootState } from "../store";

import {
  dayGeoBucketStatsAdapter,
  dayGeoBucketStatsSliceName,
} from "./dayGeoBucketStats.slice";

const getDayGeoBucketStatsState = (rootState: RootState) =>
  rootState[
    dayGeoBucketStatsSliceName
  ] as DayStatsSliceState<DayGeoBucketStats>;

const entitySelectors = dayGeoBucketStatsAdapter.getSelectors<RootState>(
  getDayGeoBucketStatsState
);

export const dayGeoBucketStatsSelectors = {
  ...entitySelectors,
  ...getLoadingStateSelectors(getDayGeoBucketStatsState),
};
