import { createHandler, Get, Query, ParseDatePipe } from "next-api-decorators";

import { TotalStatsService } from "@/api/services/total-stats.service";

interface TotalOrdersResponse {
  totalOrders: number;
}

class TotalOrdersHandler {
  private totalStatsService = new TotalStatsService();

  @Get()
  async getTotalOrders(
    @Query("startDate", ParseDatePipe) startDate: Date,
    @Query("endDate", ParseDatePipe) endDate: Date
  ): Promise<TotalOrdersResponse> {
    const totalOrders = await this.totalStatsService.getTotalOrders(
      startDate,
      endDate
    );

    return { totalOrders };
  }
}

export default createHandler(TotalOrdersHandler);
