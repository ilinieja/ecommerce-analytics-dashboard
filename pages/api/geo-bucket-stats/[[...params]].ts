import {
  createHandler,
  Get,
  Query,
  ParseDatePipe,
  ValidateEnumPipe,
} from "next-api-decorators";

import {
  DayGeoBucketStats,
  GeoBucketStatsService,
  TotalGeoBucketStats,
} from "@/api/services/geo-bucket-stats.service";
import { GeoBucket } from "@/api/models/order.model";

export interface DayGeoBucketStatsResponse {
  dayStats: DayGeoBucketStats[];
}

export interface TotalGeoBucketStatsResponse {
  totalStats: TotalGeoBucketStats[];
}

class GeoBucketStatsHandler {
  private statsService = new GeoBucketStatsService();

  @Get("/day")
  async getDayGeoBucketStats(
    @Query("startDate", ParseDatePipe) startDate: Date,
    @Query("endDate", ParseDatePipe) endDate: Date,
    @Query("geoBucket", ValidateEnumPipe({ type: GeoBucket, nullable: true }))
    geoBucket?: GeoBucket
  ): Promise<DayGeoBucketStatsResponse> {
    const dayStats = await this.statsService.getDayStats(
      startDate,
      endDate,
      geoBucket
    );

    return { dayStats };
  }

  @Get("/total")
  async getTotalGeoBucketStats(
    @Query("startDate", ParseDatePipe) startDate: Date,
    @Query("endDate", ParseDatePipe) endDate: Date,
    @Query("geoBucket", ValidateEnumPipe({ type: GeoBucket, nullable: true }))
    geoBucket?: GeoBucket
  ): Promise<TotalGeoBucketStatsResponse> {
    const totalStats = await this.statsService.getTotalStats(
      startDate,
      endDate,
      geoBucket
    );

    return { totalStats };
  }
}

export default createHandler(GeoBucketStatsHandler);
