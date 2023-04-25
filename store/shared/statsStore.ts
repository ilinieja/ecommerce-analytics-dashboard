import {
  EntityState,
  IdSelector,
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

import {
  LoadingState,
  LoadingStatus,
  getInitialLoadingState,
} from "./loadingStore";
import {
  DayStatsResponse,
  Stats,
  TotalStatsResponse,
} from "@/api/shared/stats";

interface FetchStatsParams {
  startDate: string;
  endDate: string;
}

export type EntityWithParams<T> = T & { _params: FetchStatsParams };

export type DayStatsSliceState<T> = EntityState<T> & LoadingState;

export interface GetStatsStoreParams<T, R> {
  name: string;
  apiPath: string;
  getEntities: (response: R) => T[];
  selectId: IdSelector<EntityWithParams<T>>;
}

export function createStatsStore<
  T extends Stats,
  R extends DayStatsResponse<T> | TotalStatsResponse<T>
>({ name, apiPath, getEntities, selectId }: GetStatsStoreParams<T, R>) {
  const fetch = createAsyncThunk(
    `${name}/fetch`,
    async (params: FetchStatsParams) => {
      const { data } = await axios.get<R>(apiPath, {
        params: {
          startDate: params.startDate,
          endDate: params.endDate,
        },
      });

      return { data, params };
    }
  );

  const adapter = createEntityAdapter<EntityWithParams<T>>({ selectId });

  const initialState: DayStatsSliceState<EntityWithParams<T>> = {
    ...adapter.getInitialState(),
    ...getInitialLoadingState(),
  };

  const slice = createSlice({
    name,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetch.pending, (state) => {
          state.loadingStatus = LoadingStatus.pending;
          state.loadingError = null;
        })
        .addCase(fetch.fulfilled, (state, { payload: { data, params } }) => {
          state.loadingStatus = LoadingStatus.success;
          return adapter.setAll(
            state as DayStatsSliceState<EntityWithParams<T>>,
            getEntities(data).map((entity) => ({
              ...entity,
              _params: params,
            }))
          );
        })
        .addCase(fetch.rejected, (state, { error }) => {
          state.loadingStatus = LoadingStatus.fail;
          state.loadingError = error;
        });
    },
  });

  return {
    slice,
    adapter,
    fetch,
  };
}
