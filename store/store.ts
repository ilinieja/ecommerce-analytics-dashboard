import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { dayStatsSlice, dayStatsSliceName } from "./dayStats/dayStats.slice";
import {
  totalStatsSlice,
  totalStatsSliceName,
} from "./totalStats/totalStats.slice";
import {
  dayPlatformStatsSlice,
  dayPlatformStatsSliceName,
} from "./dayPlatformStats/dayPlatformStats.slice";
import {
  dayGeoBucketStatsSlice,
  dayGeoBucketStatsSliceName,
} from "./dayGeoBucketStats/dayGeoBucketStats.slice";
import {
  totalPlatformStatsSlice,
  totalPlatformStatsSliceName,
} from "./totalPlatformStats/totalPlatformStats.slice";
import { filtersSlice } from "./filters/filters.slice";
import {
  totalGeoBucketStatsSlice,
  totalGeoBucketStatsSliceName,
} from "./totalGeoBucketStats/totalGeoBucketStats.slice";

const rootReducer = combineReducers({
  filters: filtersSlice.reducer,

  [totalStatsSliceName]: totalStatsSlice.reducer,
  [totalPlatformStatsSliceName]: totalPlatformStatsSlice.reducer,
  [totalGeoBucketStatsSliceName]: totalGeoBucketStatsSlice.reducer,

  [dayStatsSliceName]: dayStatsSlice.reducer,
  [dayPlatformStatsSliceName]: dayPlatformStatsSlice.reducer,
  [dayGeoBucketStatsSliceName]: dayGeoBucketStatsSlice.reducer,
});

export const setupStore = () =>
  configureStore({
    reducer: rootReducer,
  });

export const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppState = ReturnType<typeof setupStore>;
export type AppDispatch = AppState["dispatch"];
