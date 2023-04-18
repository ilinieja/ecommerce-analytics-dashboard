import { DayStats } from "@/api/services/stats.service";
import { DayStatsResponse } from "@/pages/api/stats/[[...params]]";

import { getDayStatsStore } from "../shared/dayStats";

export const dayStatsSliceName = "dayStats";

export const {
  slice: dayStatsSlice,
  adapter: dayStatsAdapter,
  fetch: fetchDayStats,
} = getDayStatsStore<DayStats, DayStatsResponse>({
  name: dayStatsSliceName,
  apiPath: "api/stats/day",
});
