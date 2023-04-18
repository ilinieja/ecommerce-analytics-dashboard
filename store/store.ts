import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { totalStatsSlice } from "./totalStats/totalStats.slice";
import { dayStatsSlice, dayStatsSliceName } from "./dayStats/dayStats.slice";
import {
  dayPlatformStatsSlice,
  dayPlatformStatsSliceName,
} from "./dayPlatformStats/dayPlatformStats.slice";
import { filtersSlice } from "./filters/filters.slice";

const rootReducer = combineReducers({
  totalStats: totalStatsSlice.reducer,
  filters: filtersSlice.reducer,
  [dayStatsSliceName]: dayStatsSlice.reducer,
  [dayPlatformStatsSliceName]: dayPlatformStatsSlice.reducer,
});

export const setupStore = () =>
  configureStore({
    reducer: rootReducer,
  });

export const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppState = ReturnType<typeof setupStore>;
export type AppDispatch = AppState["dispatch"];
