import { createSlice } from "@reduxjs/toolkit";
import { subDays } from "date-fns";

const DEFAULT_END_DATE = new Date("2023-03-01");
const DEFAULT_START_DATE = subDays(DEFAULT_END_DATE, 14);
const DEFAULT_DATERANGE = {
  startDate: DEFAULT_START_DATE.toISOString(),
  endDate: DEFAULT_END_DATE.toISOString(),
};

export interface FiltersState {
  dateRange: {
    startDate: string;
    endDate: string;
  };
}

const initialState: FiltersState = {
  dateRange: DEFAULT_DATERANGE,
};

export const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {},
});
