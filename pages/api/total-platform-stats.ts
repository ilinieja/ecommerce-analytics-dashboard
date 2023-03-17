import {
  createHandler,
  Get,
  Query,
  ParseDatePipe,
  ValidateEnumPipe,
} from "next-api-decorators";

import {
  TotalPlatformStats,
  DayPlatformStatsService,
} from "@/api/services/day-platform-stats.service";
import { Platform } from "@/api/models/order.model";

export interface TotalPlatformStatsResponse {
  totalStats: TotalPlatformStats[];
}

class TotalPlatformStatsHandler {
  private dayPlatformStatsService = new DayPlatformStatsService();

  @Get()
  async getTotalStats(
    @Query("startDate", ParseDatePipe) startDate: Date,
    @Query("endDate", ParseDatePipe) endDate: Date,
    @Query("platform", ValidateEnumPipe({ type: Platform, nullable: true }))
    platform?: Platform
  ): Promise<TotalPlatformStatsResponse> {
    const totalStats = await this.dayPlatformStatsService.getTotalStats(
      startDate,
      endDate,
      platform
    );

    return { totalStats };
  }
}

export default createHandler(TotalPlatformStatsHandler);
