import { DayStats } from "@/api/services/stats.service";
import {
  EntityState,
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";
import {
  LoadingState,
  LoadingStatus,
  getInitialLoadingState,
} from "../shared/loading";
import { DayStatsResponse } from "@/pages/api/stats/[[...params]]";

interface FetchDayStatsParams {
  startDate: Date;
  endDate: Date;
}

const dayStatsApiPath = "api/stats/day";
export const fetchDayStats = createAsyncThunk(
  "dayStats/fetchDayStats",
  async ({ startDate, endDate }: FetchDayStatsParams) => {
    const res = await axios.get<DayStatsResponse>(dayStatsApiPath, {
      params: {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      },
    });

    return res.data;
  }
);

export const dayStatsAdapter = createEntityAdapter<DayStats>({
  selectId: (dayStats) => dayStats.date,
});

const initialState = {
  ...dayStatsAdapter.getInitialState(),
  ...getInitialLoadingState(),
};

export type DayStatsSliceState = EntityState<DayStats> & LoadingState;

export const dayStatsSlice = createSlice({
  name: "dayStats",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDayStats.pending, (state) => {
        state.loadingStatus = LoadingStatus.pending;
        state.loadingError = null;
      })
      .addCase(fetchDayStats.fulfilled, (state, { payload }) => {
        state.loadingStatus = LoadingStatus.success;
        dayStatsAdapter.upsertMany(state, payload.dayStats);
      })
      .addCase(fetchDayStats.rejected, (state, { error }) => {
        state.loadingStatus = LoadingStatus.fail;
        state.loadingError = error;
      });
  },
});
