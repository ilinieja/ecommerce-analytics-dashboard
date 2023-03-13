import { createHandler, Get, Query, ParseDatePipe } from "next-api-decorators";

import {
  DayAverageOrderRevenue,
  OrderService,
} from "@/api/services/order.service";

interface DayAverageOrderRevenueResponse {
  dayAverageOrderRevenues: DayAverageOrderRevenue[];
}

class DayAverageOrderRevenuesHandler {
  private ordersService = new OrderService();

  @Get()
  async getDayOrders(
    @Query("startDate", ParseDatePipe) startDate: Date,
    @Query("endDate", ParseDatePipe) endDate: Date
  ): Promise<DayAverageOrderRevenueResponse> {
    const dayAverageOrderRevenues =
      await this.ordersService.getDayAverageOrderRevenues(startDate, endDate);

    return { dayAverageOrderRevenues };
  }
}

export default createHandler(DayAverageOrderRevenuesHandler);
