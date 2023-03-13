import { createHandler, Get, Query, ParseDatePipe } from "next-api-decorators";

import { TotalStatsService } from "@/api/services/total-stats.service";

interface TotalAverageOrderRevenueResponse {
  totalAverageOrderRevenue: number;
}

class AverageOrderRevenueHandler {
  private totalStatsService = new TotalStatsService();

  @Get()
  async getAverageOrderRevenue(
    @Query("startDate", ParseDatePipe) startDate: Date,
    @Query("endDate", ParseDatePipe) endDate: Date
  ): Promise<TotalAverageOrderRevenueResponse> {
    const totalAverageOrderRevenue =
      await this.totalStatsService.getTotalAverageOrderRevenue(
        startDate,
        endDate
      );

    return { totalAverageOrderRevenue };
  }
}

export default createHandler(AverageOrderRevenueHandler);
