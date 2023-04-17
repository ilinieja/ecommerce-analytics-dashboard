import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { totalStatsSlice } from "./totalStats/totalStats.slice";
import { dayStatsSlice } from "./dayStats/dayStats.slice";
import { filtersSlice } from "./filters/filters.slice";

const rootReducer = combineReducers({
  totalStats: totalStatsSlice.reducer,
  dayStats: dayStatsSlice.reducer,
  filters: filtersSlice.reducer,
});

export const setupStore = () =>
  configureStore({
    reducer: rootReducer,
  });

export const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppState = ReturnType<typeof setupStore>;
export type AppDispatch = AppState["dispatch"];
