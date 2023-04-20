import {
  createHandler,
  Get,
  Query,
  ParseDatePipe,
  ValidateEnumPipe,
} from "next-api-decorators";

import {
  DayPlatformStats,
  PlatformStatsService,
  TotalPlatformStats,
} from "@/api/services/platform-stats.service";
import { Platform } from "@/api/models/order.model";
import { DayStatsResponse, TotalStatsResponse } from "@/api/shared/stats";

export type DayPlatformStatsResponse = DayStatsResponse<DayPlatformStats>;
export type TotalPlatformStatsResponse = TotalStatsResponse<TotalPlatformStats>;

class DayPlatformStatsHandler {
  private statsService = new PlatformStatsService();

  @Get("/day")
  async getDayPlatformStats(
    @Query("startDate", ParseDatePipe) startDate: Date,
    @Query("endDate", ParseDatePipe) endDate: Date,
    @Query("platform", ValidateEnumPipe({ type: Platform, nullable: true }))
    platform?: Platform
  ): Promise<DayPlatformStatsResponse> {
    const dayStats = await this.statsService.getDayStats(
      startDate,
      endDate,
      platform
    );

    return { dayStats };
  }

  @Get("/total")
  async getTotalPlatformStats(
    @Query("startDate", ParseDatePipe) startDate: Date,
    @Query("endDate", ParseDatePipe) endDate: Date,
    @Query("platform", ValidateEnumPipe({ type: Platform, nullable: true }))
    platform?: Platform
  ): Promise<TotalPlatformStatsResponse> {
    const totalStats = await this.statsService.getTotalStats(
      startDate,
      endDate,
      platform
    );

    return { totalStats };
  }
}

export default createHandler(DayPlatformStatsHandler);
