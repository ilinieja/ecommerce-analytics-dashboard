import { DayGeoBucketStats } from "@/api/services/geo-bucket-stats.service";
import { DayGeoBucketStatsResponse } from "@/pages/api/geo-bucket-stats/[[...params]]";

import { createStatsStore } from "../shared/statsStore";

export const dayGeoBucketStatsSliceName = "dayGeoBucketStats";

export const {
  slice: dayGeoBucketStatsSlice,
  adapter: dayGeoBucketStatsAdapter,
  fetch: fetchDayGeoBucketStats,
} = createStatsStore<DayGeoBucketStats, DayGeoBucketStatsResponse>({
  name: dayGeoBucketStatsSliceName,
  apiPath: "/api/geo-bucket-stats/day",
  getEntities: (response) => response.dayStats,
  selectId: (entity) => `${entity.date}_${entity.geoBucket}`,
});
