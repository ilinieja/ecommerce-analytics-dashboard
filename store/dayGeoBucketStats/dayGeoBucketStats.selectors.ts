import { getLoadingStateSelectors } from "../shared/loadingStore";
import { RootState } from "../store";

import {
  dayGeoBucketStatsAdapter,
  dayGeoBucketStatsSliceName,
} from "./dayGeoBucketStats.slice";

const getDayGeoBucketStatsState = (rootState: RootState) =>
  rootState[dayGeoBucketStatsSliceName];

const entitySelectors = dayGeoBucketStatsAdapter.getSelectors<RootState>(
  getDayGeoBucketStatsState
);

export const dayGeoBucketStatsSelectors = {
  ...entitySelectors,
  ...getLoadingStateSelectors(getDayGeoBucketStatsState),
};
