import DayStatsModel from "../models/day-stats.model";
import { DbConnection } from "../utils/dbConnection";

export interface DayStats {
  date: Date;
  revenue: number;
  orders: number;
  averageOrderRevenue: number;
}

export class DayStatsService {
  @DbConnection()
  async getDayStats(startDate: Date, endDate: Date) {
    const dayStats = await DayStatsModel.aggregate<DayStats>([
      { $match: { date: { $gte: startDate, $lt: endDate } } },
      { $sort: { date: 1 } },
      {
        $project: {
          _id: false,
          date: true,
          revenue: true,
          orders: true,
          averageOrderRevenue: true,
        },
      },
    ]).exec();

    return dayStats;
  }
}
