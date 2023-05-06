import { Platform } from "@/api/models/order.model";
import { TotalPlatformStatsResponse } from "@/pages/api/platform-stats/[[...params]]";
import { TotalPlatformStats } from "@/api/services/platform-stats.service";

import { createStatsStore } from "../shared/statsStore";

export const totalPlatformStatsSliceName = "totalPlatformStats";

export const getTotalPlatformStatsDateId = (
  startDate: string,
  endDate: string
) => `${startDate}_${endDate}`;

export const getTotalPlatformStatsId = (
  startDate: string,
  endDate: string,
  platform: Platform
) => `${getTotalPlatformStatsDateId(startDate, endDate)}_${platform}`;

export const {
  slice: totalPlatformStatsSlice,
  adapter: totalPlatformStatsAdapter,
  fetch: fetchTotalPlatformStats,
} = createStatsStore<TotalPlatformStats, TotalPlatformStatsResponse>({
  name: totalPlatformStatsSliceName,
  apiPath: "/api/platform-stats/total",
  getEntities: (response) => response.totalStats,
  selectId: (entity) =>
    getTotalPlatformStatsId(
      entity._params.startDate,
      entity._params.endDate,
      entity.platform
    ),
});
