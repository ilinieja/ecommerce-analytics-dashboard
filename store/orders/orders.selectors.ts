import { getLoadingStateSelectors } from "../shared/loadingStore";
import { RootState } from "../store";

import { ordersAdapter, ordersSliceName } from "./orders.slice";

const selectOrdersState = (rootState: RootState) => rootState[ordersSliceName];

export const ordersSelectors = {
  ...ordersAdapter.getSelectors(selectOrdersState),
  ...getLoadingStateSelectors(selectOrdersState),
};
