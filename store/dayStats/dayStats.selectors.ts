import { getLoadingStateSelectors } from "../shared/loading";
import { RootState } from "../store";
import { DayStatsSliceState, dayStatsAdapter } from "./dayStats.slice";

const getDayStatsState = (rootState: RootState) =>
  rootState.dayStats as DayStatsSliceState;

export const dayStatsSelectors = {
  ...dayStatsAdapter.getSelectors<RootState>(getDayStatsState),
  ...getLoadingStateSelectors(getDayStatsState),
};
