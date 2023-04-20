import { TotalStats } from "@/api/services/stats.service";
import { TotalStatsResponse } from "@/pages/api/stats/[[...params]]";

import { createStatsStore } from "../shared/statsStore";

export const totalStatsSliceName = "totalStats";

export const getTotalStatsId = (startDate: string, endDate: string) =>
  `${startDate}_${endDate}`;

export const {
  slice: totalStatsSlice,
  adapter: totalStatsAdapter,
  fetch: fetchTotalStats,
} = createStatsStore<TotalStats, TotalStatsResponse>({
  name: totalStatsSliceName,
  apiPath: "api/stats/total",
  getEntities: (response) => response.totalStats,
  selectId: (entity) =>
    getTotalStatsId(entity._params.startDate, entity._params.endDate),
});
