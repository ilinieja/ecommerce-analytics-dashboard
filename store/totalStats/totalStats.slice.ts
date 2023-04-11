import { TotalStats } from "@/api/services/stats.service";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  LoadingState,
  LoadingStatus,
  getInitialLoadingState,
} from "../shared/loading";
import { TotalStatsResponse } from "@/pages/api/stats/[[...params]]";

interface FetchTotalStatsParams {
  startDate: Date;
  endDate: Date;
}

const totalStatsApiPath = "api/stats/total";
export const fetchTotalStats = createAsyncThunk(
  "totalStats/fetchTotalStats",
  async ({ startDate, endDate }: FetchTotalStatsParams) => {
    const res = await axios.get<TotalStatsResponse>(totalStatsApiPath, {
      params: {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      },
    });

    return res.data;
  }
);

const initialState = {
  ...getInitialLoadingState(),
};

export type TotalStatsSliceState = TotalStats & LoadingState;

export const totalStatsSlice = createSlice({
  name: "totalStats",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTotalStats.pending, (state) => {
        state.loadingStatus = LoadingStatus.pending;
        state.loadingError = null;
      })
      .addCase(fetchTotalStats.fulfilled, (state, { payload }) => {
        return {
          ...state,
          loadingStatus: LoadingStatus.success,
          ...payload.totalStats,
        };
      })
      .addCase(fetchTotalStats.rejected, (state, { error }) => {
        state.loadingStatus = LoadingStatus.fail;
        state.loadingError = error;
      });
  },
});
