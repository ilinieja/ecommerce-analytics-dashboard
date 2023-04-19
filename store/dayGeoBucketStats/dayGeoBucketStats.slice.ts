import { DayGeoBucketStats } from "@/api/services/geo-bucket-stats.service";
import { DayGeoBucketStatsResponse } from "@/pages/api/geo-bucket-stats/[[...params]]";

import { getDayStatsStore } from "../shared/dayStats";

export const dayGeoBucketStatsSliceName = "dayGeoBucketStats";

export const {
  slice: dayGeoBucketStatsSlice,
  adapter: dayGeoBucketStatsAdapter,
  fetch: fetchDayGeoBucketStats,
} = getDayStatsStore<DayGeoBucketStats, DayGeoBucketStatsResponse>({
  name: dayGeoBucketStatsSliceName,
  apiPath: "api/geo-bucket-stats/day",
  selectId: (entity) => `${entity.date}_${entity.geoBucket}`,
});
