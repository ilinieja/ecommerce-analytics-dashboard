import { createSelector } from "@reduxjs/toolkit";

import { TimelineDataItem } from "@/shared/timeline";

import { getLoadingStateSelectors } from "../shared/loadingStore";
import { RootState } from "../store";

import { dayStatsAdapter, dayStatsSliceName } from "./dayStats.slice";

const getDayStatsState = (rootState: RootState) => rootState[dayStatsSliceName];

const entitySelectors =
  dayStatsAdapter.getSelectors<RootState>(getDayStatsState);

interface GetTimelineOptions {
  valueField: "revenue" | "orders" | "averageOrderRevenue";
  maxPoints?: number;
}

// TODO: Remove maxPoints after adding switch between days/weeks/months fetching.
const getTimeline = ({ maxPoints, valueField }: GetTimelineOptions) =>
  createSelector(entitySelectors.selectAll, (dayStats): TimelineDataItem[] => {
    if (!dayStats.length) {
      return [];
    }

    if (!maxPoints) {
      return dayStats.map((dayStat) => ({
        value: dayStat[valueField],
        date: new Date(dayStat.date),
      }));
    }

    const step = Math.max((dayStats.length - 1) / (maxPoints - 1), 1);
    const result = [];
    for (let i = 0; i < dayStats.length; i += step) {
      result.push({
        value: dayStats[Math.floor(i)][valueField],
        date: new Date(dayStats[Math.floor(i)].date),
      });
    }

    return result;
  });

const getRevenuesTimeline = (maxPoints: number) =>
  getTimeline({
    valueField: "revenue",
    maxPoints,
  });

const getOrdersTimeline = (maxPoints: number) =>
  getTimeline({
    valueField: "orders",
    maxPoints,
  });

const getAverageOrderRevenuesTimeline = (maxPoints: number) =>
  getTimeline({
    valueField: "averageOrderRevenue",
    maxPoints,
  });

export const dayStatsSelectors = {
  ...entitySelectors,
  ...getLoadingStateSelectors(getDayStatsState),
  getRevenuesTimeline,
  getOrdersTimeline,
  getAverageOrderRevenuesTimeline,
};
