import {
  createHandler,
  Get,
  Query,
  ParseDatePipe,
  ParseNumberPipe,
} from "next-api-decorators";

import { Order, OrdersService } from "@/api/services/orders.service";

export type OrdersResponse = { orders: Order[] };

class OrdersHandler {
  private ordersService = new OrdersService();

  @Get()
  async getDayGeoBucketStats(
    @Query("startDate", ParseDatePipe) startDate: Date,
    @Query("endDate", ParseDatePipe) endDate: Date,
    @Query("limit", ParseNumberPipe) limit: number
  ): Promise<OrdersResponse> {
    const orders = await this.ordersService.getOrders(
      startDate,
      endDate,
      limit
    );

    return { orders };
  }
}

export default createHandler(OrdersHandler);
