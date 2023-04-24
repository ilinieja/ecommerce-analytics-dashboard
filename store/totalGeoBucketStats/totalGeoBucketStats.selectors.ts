import { getLoadingStateSelectors } from "../shared/loadingStore";
import { RootState } from "../store";
import { makeSelectTotalDimensionStats } from "../shared/dimensionStats.selectors";

import {
  totalGeoBucketStatsAdapter,
  totalGeoBucketStatsSliceName,
} from "./totalGeoBucketStats.slice";

const getTotalGeoBucketStatsState = (rootState: RootState) =>
  rootState[totalGeoBucketStatsSliceName];

const entitySelectors = totalGeoBucketStatsAdapter.getSelectors(
  getTotalGeoBucketStatsState
);

const makeSelectTotalGeoBucketStats = makeSelectTotalDimensionStats(
  entitySelectors.selectEntities
);

export const totalGeoBucketStatsSelectors = {
  makeSelectTotalGeoBucketStats,
  ...entitySelectors,
  ...getLoadingStateSelectors(getTotalGeoBucketStatsState),
};
