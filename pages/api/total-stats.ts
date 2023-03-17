import { createHandler, Get, Query, ParseDatePipe } from "next-api-decorators";

import { TotalStats, DayStatsService } from "@/api/services/day-stats.service";

export interface TotalStatsResponse {
  totalStats: TotalStats;
}

class TotalStatsHandler {
  private dayStatsService = new DayStatsService();

  @Get()
  async getTotalStats(
    @Query("startDate", ParseDatePipe) startDate: Date,
    @Query("endDate", ParseDatePipe) endDate: Date
  ): Promise<TotalStatsResponse> {
    const totalStats = await this.dayStatsService.getTotalStats(
      startDate,
      endDate
    );

    return { totalStats };
  }
}

export default createHandler(TotalStatsHandler);
