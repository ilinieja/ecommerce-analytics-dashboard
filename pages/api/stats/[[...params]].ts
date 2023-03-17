import { createHandler, Get, Query, ParseDatePipe } from "next-api-decorators";

import {
  DayStats,
  StatsService,
  TotalStats,
} from "@/api/services/stats.service";

export interface DayStatsResponse {
  dayStats: DayStats[];
}

export interface TotalStatsResponse {
  totalStats: TotalStats;
}

class StatsHandler {
  private StatsService = new StatsService();

  @Get("/day")
  async getDayStats(
    @Query("startDate", ParseDatePipe) startDate: Date,
    @Query("endDate", ParseDatePipe) endDate: Date
  ): Promise<DayStatsResponse> {
    const dayStats = await this.StatsService.getDayStats(startDate, endDate);

    return { dayStats };
  }

  @Get("/total")
  async getTotalStats(
    @Query("startDate", ParseDatePipe) startDate: Date,
    @Query("endDate", ParseDatePipe) endDate: Date
  ): Promise<TotalStatsResponse> {
    const totalStats = await this.StatsService.getTotalStats(
      startDate,
      endDate
    );

    return { totalStats };
  }
}

export default createHandler(StatsHandler);
