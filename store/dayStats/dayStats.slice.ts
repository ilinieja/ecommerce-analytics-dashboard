import { DayStats } from "@/api/services/stats.service";
import { DayStatsResponse } from "@/pages/api/stats/[[...params]]";

import { createStatsStore } from "../shared/statsStore";

export const dayStatsSliceName = "dayStats";

export const {
  slice: dayStatsSlice,
  adapter: dayStatsAdapter,
  fetch: fetchDayStats,
} = createStatsStore<DayStats, DayStatsResponse>({
  name: dayStatsSliceName,
  apiPath: "api/stats/day",
  getEntities: (response) => response.dayStats,
  selectId: (entity) => entity.date,
});
