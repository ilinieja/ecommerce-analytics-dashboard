import { getLoadingStateSelectors } from "../shared/loadingStore";
import { RootState } from "../store";
import {
  getTotalStatsId,
  totalStatsAdapter,
  totalStatsSliceName,
} from "./totalStats.slice";

const getTotalStatsState = (rootState: RootState) =>
  rootState[totalStatsSliceName];

const entitySelectors = totalStatsAdapter.getSelectors(getTotalStatsState);

const makeSelectTotalStats =
  (startDate: string, endDate: string) => (state: RootState) =>
    entitySelectors.selectById(state, getTotalStatsId(startDate, endDate));

export const totalStatsSelectors = {
  makeSelectTotalStats,
  ...entitySelectors,
  ...getLoadingStateSelectors(getTotalStatsState),
};
