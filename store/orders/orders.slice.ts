import { Order } from "@/api/services/orders.service";
import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { LoadingStatus, getInitialLoadingState } from "../shared/loadingStore";
import { OrdersResponse } from "@/pages/api/orders";
import axios from "axios";

export const ordersSliceName = "orders";

export const ordersAdapter = createEntityAdapter<Order>({
  selectId: ({ _id }) => _id,
});

export interface FetchOrdersParams {
  startDate: string;
  endDate: string;
  limit: number;
}
export const fetchOrders = createAsyncThunk(
  "orders/fetch",
  async (params: FetchOrdersParams) => {
    const { data } = await axios.get<OrdersResponse>("/api/orders", { params });
    return data;
  }
);

const initialState = {
  ...ordersAdapter.getInitialState(),
  ...getInitialLoadingState(),
};

export const ordersSlice = createSlice({
  name: ordersSliceName,
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loadingStatus = LoadingStatus.pending;
        state.loadingError = null;
      })
      .addCase(fetchOrders.fulfilled, (state, { payload }) => {
        state.loadingStatus = LoadingStatus.success;
        return ordersAdapter.setAll(state, payload.orders);
      })
      .addCase(fetchOrders.rejected, (state, { error }) => {
        state.loadingStatus = LoadingStatus.fail;
        state.loadingError = error;
      }),
});
