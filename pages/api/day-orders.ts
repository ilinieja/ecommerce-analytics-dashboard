import { createHandler, Get, Query, ParseDatePipe } from "next-api-decorators";

import { DayOrders, OrderService } from "@/api/services/order.service";

interface DayOrdersResponse {
  dayOrders: DayOrders[];
}

class DayOrdersHandler {
  private ordersService = new OrderService();

  @Get()
  async getDayOrders(
    @Query("startDate", ParseDatePipe) startDate: Date,
    @Query("endDate", ParseDatePipe) endDate: Date
  ): Promise<DayOrdersResponse> {
    const dayOrders = await this.ordersService.getDayOrders(startDate, endDate);

    return { dayOrders };
  }
}

export default createHandler(DayOrdersHandler);
