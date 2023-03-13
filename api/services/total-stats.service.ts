import DayRevenue from "../models/day-revenue.model";
import DayOrders from "../models/day-orders.model";
import DayAverageOrderRevenue from "../models/day-average-order-revenue.model";
import { DbConnection } from "../utils/dbConnection";

export class TotalStatsService {
  @DbConnection()
  async getTotalRevenue(startDate: Date, endDate: Date) {
    const revenueSum = await DayRevenue.aggregate<{
      _id: null;
      revenue: number;
    }>([
      { $match: { date: { $gte: startDate, $lt: endDate } } },
      {
        $group: {
          _id: null,
          revenue: { $sum: "$revenue" },
        },
      },
    ]).exec();

    return revenueSum[0]?.revenue ?? 0;
  }

  @DbConnection()
  async getTotalOrders(startDate: Date, endDate: Date) {
    const ordersSum = await DayOrders.aggregate<{
      _id: null;
      orders: number;
    }>([
      { $match: { date: { $gte: startDate, $lt: endDate } } },
      {
        $group: {
          _id: null,
          orders: { $sum: "$orders" },
        },
      },
    ]).exec();

    return ordersSum[0]?.orders ?? 0;
  }

  @DbConnection()
  async getTotalAverageOrderRevenue(startDate: Date, endDate: Date) {
    const averageOrderRevenue = await DayAverageOrderRevenue.aggregate<{
      _id: null;
      averageOrderRevenue: number;
    }>([
      { $match: { date: { $gte: startDate, $lt: endDate } } },
      {
        $group: {
          _id: null,
          averageOrderRevenue: { $avg: "$averageOrderRevenue" },
        },
      },
    ]).exec();

    return averageOrderRevenue[0]?.averageOrderRevenue ?? 0;
  }
}
