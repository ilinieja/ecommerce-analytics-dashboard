import { GeoBucket } from "@/api/models/order.model";
import { TotalGeoBucketStatsResponse } from "@/pages/api/geo-bucket-stats/[[...params]]";
import { TotalGeoBucketStats } from "@/api/services/geo-bucket-stats.service";

import { createStatsStore } from "../shared/statsStore";
import { getDateId } from "../shared/dimensionStats.selectors";

export const totalGeoBucketStatsSliceName = "totalGeoBucketStats";

export const getTotalGeoBucketStatsId = (
  startDate: string,
  endDate: string,
  geoBucket: GeoBucket
) => `${getDateId(startDate, endDate)}_${geoBucket}`;

export const {
  slice: totalGeoBucketStatsSlice,
  adapter: totalGeoBucketStatsAdapter,
  fetch: fetchTotalGeoBucketStats,
} = createStatsStore<TotalGeoBucketStats, TotalGeoBucketStatsResponse>({
  name: totalGeoBucketStatsSliceName,
  apiPath: "api/geo-bucket-stats/total",
  getEntities: (response) => response.totalStats,
  selectId: (entity) =>
    getTotalGeoBucketStatsId(
      entity._params.startDate,
      entity._params.endDate,
      entity.geoBucket
    ),
});
