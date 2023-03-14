import { createHandler, Get, Query, ParseDatePipe } from "next-api-decorators";

import {
  TotalStats,
  TotalStatsService,
} from "@/api/services/total-stats.service";

export interface TotalStatsResponse {
  totalStats: TotalStats;
}

class TotalStatsHandler {
  private totalStatsService = new TotalStatsService();

  @Get()
  async getTotalStats(
    @Query("startDate", ParseDatePipe) startDate: Date,
    @Query("endDate", ParseDatePipe) endDate: Date
  ): Promise<TotalStatsResponse> {
    const totalStats = await this.totalStatsService.getTotalStats(
      startDate,
      endDate
    );

    return { totalStats };
  }
}

export default createHandler(TotalStatsHandler);
