import DayPlatformStatsModel from "../models/day-platform-stats.model";
import { DbConnection } from "../shared/dbConnection";
import { getStatsProjection, Stats } from "../shared/stats";
import { Platform } from "../models/order.model";

export interface TotalPlatformStats extends Stats {
  platform: Platform;
}

export interface DayPlatformStats extends TotalPlatformStats {
  date: Date;
}

export class DayPlatformStatsService {
  @DbConnection()
  async getDayStats(startDate: Date, endDate: Date, platform?: Platform) {
    const dayStats = await DayPlatformStatsModel.aggregate<DayPlatformStats>([
      this.getMatchStage(startDate, endDate, platform),
      { $sort: { date: 1 } },
      {
        $project: {
          ...getStatsProjection(),
          date: true,
          platform: true,
        },
      },
    ]).exec();

    return dayStats;
  }

  @DbConnection()
  async getTotalStats(startDate: Date, endDate: Date, platform?: Platform) {
    const totalStats =
      await DayPlatformStatsModel.aggregate<TotalPlatformStats>([
        this.getMatchStage(startDate, endDate, platform),
        {
          $group: {
            _id: "$platform",
            revenue: { $sum: "$revenue" },
            orders: { $sum: "$orders" },
            averageOrderRevenue: { $avg: "$averageOrderRevenue" },
            platform: { $first: "$platform" },
          },
        },
        {
          $project: {
            ...getStatsProjection(),
            platform: true,
          },
        },
      ]).exec();

    return totalStats;
  }

  private getMatchStage(startDate: Date, endDate: Date, platform?: Platform) {
    const $match: Record<string, unknown> = {
      date: { $gte: startDate, $lt: endDate },
    };
    if (platform) {
      $match.platform = platform;
    }

    return { $match };
  }
}
