import { createHandler, Get, Query, ParseDatePipe } from "next-api-decorators";

import { DayStats, DayStatsService } from "@/api/services/day-stats.service";

export interface DayStatsResponse {
  dayStats: DayStats[];
}

class DayStatsHandler {
  private dayStatsService = new DayStatsService();

  @Get()
  async getDayStats(
    @Query("startDate", ParseDatePipe) startDate: Date,
    @Query("endDate", ParseDatePipe) endDate: Date
  ): Promise<DayStatsResponse> {
    const dayStats = await this.dayStatsService.getDayStats(startDate, endDate);

    return { dayStats };
  }
}

export default createHandler(DayStatsHandler);
