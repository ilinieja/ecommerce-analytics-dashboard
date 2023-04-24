import { TotalStats } from "@/api/services/stats.service";
import { RootState } from "../store";
import { EntityWithParams } from "./statsStore";
import { Dictionary, createSelector } from "@reduxjs/toolkit";

export const getDateId = (startDate: string, endDate: string) =>
  `${startDate}_${endDate}`;

export const makeSelectTotalDimensionStats =
  <T extends TotalStats>(selectEntities: (state: RootState) => Dictionary<T>) =>
  (
    startDate: string,
    endDate: string,
    sortBy: "orders" | "revenue" | "averageOrderRevenue"
  ) =>
    createSelector(
      selectEntities,
      (entities) =>
        Object.entries(entities)
          .filter(([key]) => key.startsWith(getDateId(startDate, endDate)))
          .map(([_, value]) => value)
          .sort((a, b) => (b ? b[sortBy] : 0) - (a ? a[sortBy] : 0)) as Array<
          EntityWithParams<T>
        >
    );
