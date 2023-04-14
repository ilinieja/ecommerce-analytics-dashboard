import DayStatsModel from "../models/day-stats.model";
import { DbConnection } from "../shared/dbConnection";
import { getStatsProjection, Stats } from "../shared/stats";

export interface TotalStats extends Stats {}

export interface DayStats extends TotalStats {
  date: string;
}

export class StatsService {
  @DbConnection()
  async getDayStats(startDate: Date, endDate: Date) {
    const dayStats = await DayStatsModel.aggregate<DayStats>([
      { $match: { date: { $gte: startDate, $lt: endDate } } },
      { $sort: { date: 1 } },
      {
        $project: {
          ...getStatsProjection(),
          date: true,
        },
      },
    ]).exec();

    return dayStats;
  }

  @DbConnection()
  async getTotalStats(startDate: Date, endDate: Date) {
    const totalStats = await DayStatsModel.aggregate<TotalStats>([
      { $match: { date: { $gte: startDate, $lt: endDate } } },
      {
        $group: {
          _id: null,
          revenue: { $sum: "$revenue" },
          orders: { $sum: "$orders" },
          averageOrderRevenue: { $avg: "$averageOrderRevenue" },
        },
      },
      {
        $project: getStatsProjection(),
      },
    ]).exec();

    return totalStats[0];
  }
}
