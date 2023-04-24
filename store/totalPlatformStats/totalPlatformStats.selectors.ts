import { getLoadingStateSelectors } from "../shared/loadingStore";
import { RootState } from "../store";
import { makeSelectTotalDimensionStats } from "../shared/dimensionStats.selectors";

import {
  totalPlatformStatsAdapter,
  totalPlatformStatsSliceName,
} from "./totalPlatformStats.slice";

const getTotalPlatformStatsState = (rootState: RootState) =>
  rootState[totalPlatformStatsSliceName];

const entitySelectors = totalPlatformStatsAdapter.getSelectors(
  getTotalPlatformStatsState
);

const makeSelectTotalPlatformStats = makeSelectTotalDimensionStats(
  entitySelectors.selectEntities
);

export const totalPlatformStatsSelectors = {
  makeSelectTotalPlatformStats,
  ...entitySelectors,
  ...getLoadingStateSelectors(getTotalPlatformStatsState),
};
