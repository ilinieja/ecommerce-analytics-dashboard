import { createHandler, Get, Query, ParseDatePipe } from "next-api-decorators";

import { TotalStatsService } from "@/api/services/total-stats.service";

interface TotalRevenueResponse {
  totalRevenue: number;
}

class TotalRevenueHandler {
  private totalStatsService = new TotalStatsService();

  @Get()
  async getTotalRevenue(
    @Query("startDate", ParseDatePipe) startDate: Date,
    @Query("endDate", ParseDatePipe) endDate: Date
  ): Promise<TotalRevenueResponse> {
    const totalRevenue = await this.totalStatsService.getTotalRevenue(
      startDate,
      endDate
    );

    return { totalRevenue };
  }
}

export default createHandler(TotalRevenueHandler);
