import {
  createHandler,
  Get,
  Query,
  ParseDatePipe,
  ValidateEnumPipe,
} from "next-api-decorators";

import {
  DayPlatformStats,
  DayPlatformStatsService,
} from "@/api/services/day-platform-stats.service";
import { Platform } from "@/api/models/order.model";

export interface DayPlatformStatsResponse {
  dayStats: DayPlatformStats[];
}

class DayPlatformStatsHandler {
  private dayStatsService = new DayPlatformStatsService();

  @Get()
  async getDayPlatformStats(
    @Query("startDate", ParseDatePipe) startDate: Date,
    @Query("endDate", ParseDatePipe) endDate: Date,
    @Query("platform", ValidateEnumPipe({ type: Platform, nullable: true }))
    platform?: Platform
  ): Promise<DayPlatformStatsResponse> {
    const dayStats = await this.dayStatsService.getDayStats(
      startDate,
      endDate,
      platform
    );

    return { dayStats };
  }
}

export default createHandler(DayPlatformStatsHandler);
