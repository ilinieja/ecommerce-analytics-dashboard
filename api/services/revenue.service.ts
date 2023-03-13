import DayRevenueModel from "../models/day-revenue.model";
import { DbConnection } from "../utils/dbConnection";

export interface DayRevenue {
  date: Date;
  revenue: number;
}

export class RevenueService {
  @DbConnection()
  async getDayRevenues(startDate: Date, endDate: Date) {
    const dayRevenues = await DayRevenueModel.aggregate<DayRevenue>([
      { $match: { date: { $gte: startDate, $lt: endDate } } },
      { $sort: { date: 1 } },
      {
        $project: {
          _id: false,
          date: true,
          revenue: true,
        },
      },
    ]).exec();

    return dayRevenues;
  }
}
