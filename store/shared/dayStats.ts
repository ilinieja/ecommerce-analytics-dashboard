import {
  EntityState,
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

import { DayStats } from "@/api/services/stats.service";
import { DayPlatformStats } from "@/api/services/platform-stats.service";
import { DayGeoBucketStats } from "@/api/services/geo-bucket-stats.service";

import { DayStatsResponse } from "@/pages/api/stats/[[...params]]";
import { DayPlatformStatsResponse } from "@/pages/api/platform-stats/[[...params]]";
import { DayGeoBucketStatsResponse } from "@/pages/api/geo-bucket-stats/[[...params]]";

import { LoadingState, LoadingStatus, getInitialLoadingState } from "./loading";

interface FetchDayStatsParams {
  startDate: Date;
  endDate: Date;
}

export type DayStatsSliceState<T> = EntityState<T> & LoadingState;

export interface GetDayStatsSliceParams {
  name: string;
  apiPath: string;
}

export function getDayStatsStore<
  T extends DayStats | DayPlatformStats | DayGeoBucketStats,
  R extends
    | DayStatsResponse
    | DayPlatformStatsResponse
    | DayGeoBucketStatsResponse
>({ name, apiPath }: GetDayStatsSliceParams) {
  const fetch = createAsyncThunk(
    `${name}/fetch`,
    async ({ startDate, endDate }: FetchDayStatsParams) => {
      const res = await axios.get<R>(apiPath, {
        params: {
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
        },
      });

      return res.data;
    }
  );

  const adapter = createEntityAdapter<T>({
    selectId: (dayStats) => dayStats.date,
  });

  const initialState: DayStatsSliceState<T> = {
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
        .addCase(fetch.fulfilled, (state, { payload }) => {
          state.loadingStatus = LoadingStatus.success;
          adapter.upsertMany(
            state as DayStatsSliceState<T>,
            payload.dayStats as T[]
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
