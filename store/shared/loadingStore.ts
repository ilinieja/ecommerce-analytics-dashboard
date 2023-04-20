import { createSelector, SerializedError } from "@reduxjs/toolkit";
import { RootState } from "../store";

export enum LoadingStatus {
  idle = "idle",
  pending = "pending",
  success = "success",
  fail = "fail",
}

export interface LoadingState {
  loadingStatus: LoadingStatus;
  loadingError: SerializedError | null;
}

export function getInitialLoadingState(): LoadingState {
  return {
    loadingStatus: LoadingStatus.idle,
    loadingError: null,
  };
}

export function getLoadingStateSelectors(
  entityStateSelector: (rootState: RootState) => LoadingState
) {
  return {
    getLoadingStatus: createSelector(
      entityStateSelector,
      (entityState) => entityState.loadingStatus
    ),
    getIsLoadingIdle: createSelector(
      entityStateSelector,
      (entityState) => entityState.loadingStatus === LoadingStatus.idle
    ),
    getIsLoadingPending: createSelector(
      entityStateSelector,
      (entityState) => entityState.loadingStatus === LoadingStatus.pending
    ),
    getIsLoadingSuccess: createSelector(
      entityStateSelector,
      (entityState) => entityState.loadingStatus === LoadingStatus.success
    ),
    getIsLoadingFail: createSelector(
      entityStateSelector,
      (entityState) => entityState.loadingStatus === LoadingStatus.fail
    ),
    getLoadingError: createSelector(
      entityStateSelector,
      (entityState) => entityState.loadingError
    ),
  };
}
