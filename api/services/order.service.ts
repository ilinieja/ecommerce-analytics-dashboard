import DayOrdersModel from "../models/day-orders.model";
import DayAverageOrderRevenueModel from "../models/day-average-order-revenue.model";
import { DbConnection } from "../utils/dbConnection";

export interface DayOrders {
  date: Date;
  orders: number;
}

export interface DayAverageOrderRevenue {
  date: Date;
  averageOrderRevenue: number;
}

export class OrderService {
  @DbConnection()
  async getDayOrders(startDate: Date, endDate: Date) {
    const dayOrders = await DayOrdersModel.aggregate<DayOrders>([
      { $match: { date: { $gte: startDate, $lt: endDate } } },
      { $sort: { date: 1 } },
      {
        $project: {
          _id: false,
          date: true,
          orders: true,
        },
      },
    ]).exec();

    return dayOrders;
  }

  @DbConnection()
  async getDayAverageOrderRevenues(startDate: Date, endDate: Date) {
    const dayAverageOrderRevenues =
      await DayAverageOrderRevenueModel.aggregate<DayAverageOrderRevenue>([
        { $match: { date: { $gte: startDate, $lt: endDate } } },
        { $sort: { date: 1 } },
        {
          $project: {
            _id: false,
            date: true,
            averageOrderRevenue: true,
          },
        },
      ]).exec();

    return dayAverageOrderRevenues;
  }
}
