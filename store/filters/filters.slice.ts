import { createSlice } from "@reduxjs/toolkit";
import { subDays } from "date-fns";

const DEFAULT_END_DATE = new Date("2023-03-01");
const DEFAULT_START_DATE = subDays(DEFAULT_END_DATE, 14);
const DEFAULT_DATERANGE = {
  startDate: DEFAULT_START_DATE.toISOString(),
  endDate: DEFAULT_END_DATE.toISOString(),
};

export type ChartDimension =
  | "revenue_by_platform"
  | "orders_by_platform"
  | "average_order_revenue_by_platform";
const DEFAULT_BREAKDOWN_STATS_CHART_DIMENSION = "revenue_by_platform";

export interface FiltersState {
  dateRange: {
    startDate: string;
    endDate: string;
  };
  breakdownStatsChartDimension: ChartDimension;
}

const initialState: FiltersState = {
  dateRange: DEFAULT_DATERANGE,
  breakdownStatsChartDimension: DEFAULT_BREAKDOWN_STATS_CHART_DIMENSION,
};

export const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    breakdownStatsChartDimensionUpdated: (state, { payload }) => ({
      ...state,
      breakdownStatsChartDimension: payload.value,
    }),
  },
});

export const { breakdownStatsChartDimensionUpdated } = filtersSlice.actions;
