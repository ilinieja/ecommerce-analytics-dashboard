import { createHandler, Get, Query, ParseDatePipe } from "next-api-decorators";

import { DayRevenue, RevenueService } from "@/api/services/revenue.service";

interface DayRevenuesResponse {
  dayRevenues: DayRevenue[];
}

class DayRevenueHandler {
  private revenueService = new RevenueService();

  @Get()
  async getDayRevenues(
    @Query("startDate", ParseDatePipe) startDate: Date,
    @Query("endDate", ParseDatePipe) endDate: Date
  ): Promise<DayRevenuesResponse> {
    const dayRevenues = await this.revenueService.getDayRevenues(
      startDate,
      endDate
    );

    return { dayRevenues };
  }
}

export default createHandler(DayRevenueHandler);
