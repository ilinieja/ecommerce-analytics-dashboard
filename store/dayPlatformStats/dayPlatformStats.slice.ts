import { DayPlatformStats } from "@/api/services/platform-stats.service";
import { DayPlatformStatsResponse } from "@/pages/api/platform-stats/[[...params]]";

import { getDayStatsStore } from "../shared/dayStats";

export const dayPlatformStatsSliceName = "dayPlatformStats";

export const {
  slice: dayPlatformStatsSlice,
  adapter: dayPlatformStatsAdapter,
  fetch: fetchDayPlatformStats,
} = getDayStatsStore<DayPlatformStats, DayPlatformStatsResponse>({
  name: dayPlatformStatsSliceName,
  apiPath: "api/platform-stats/day",
  selectId: (entity) => `${entity.date}_${entity.platform}`,
});
