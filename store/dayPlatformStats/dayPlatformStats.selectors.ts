import { getLoadingStateSelectors } from "../shared/loadingStore";
import { RootState } from "../store";

import {
  dayPlatformStatsAdapter,
  dayPlatformStatsSliceName,
} from "./dayPlatformStats.slice";

const getDayPlatformStatsState = (rootState: RootState) =>
  rootState[dayPlatformStatsSliceName];

const entitySelectors = dayPlatformStatsAdapter.getSelectors<RootState>(
  getDayPlatformStatsState
);

export const dayPlatformStatsSelectors = {
  ...entitySelectors,
  ...getLoadingStateSelectors(getDayPlatformStatsState),
};
