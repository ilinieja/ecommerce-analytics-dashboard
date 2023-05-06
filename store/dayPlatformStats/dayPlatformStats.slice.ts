import { DayPlatformStats } from "@/api/services/platform-stats.service";
import { DayPlatformStatsResponse } from "@/pages/api/platform-stats/[[...params]]";

import { createStatsStore } from "../shared/statsStore";

export const dayPlatformStatsSliceName = "dayPlatformStats";

export const {
  slice: dayPlatformStatsSlice,
  adapter: dayPlatformStatsAdapter,
  fetch: fetchDayPlatformStats,
} = createStatsStore<DayPlatformStats, DayPlatformStatsResponse>({
  name: dayPlatformStatsSliceName,
  apiPath: "/api/platform-stats/day",
  getEntities: (response) => response.dayStats,
  selectId: (entity) => `${entity.date}_${entity.platform}`,
});
