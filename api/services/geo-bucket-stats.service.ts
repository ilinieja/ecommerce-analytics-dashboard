import DayGeoBucketStatsModel from "../models/day-geo-bucket-stats.model";
import { DbConnection } from "../shared/dbConnection";
import { getStatsProjection, Stats } from "../shared/stats";
import { GeoBucket } from "../models/order.model";

export interface TotalGeoBucketStats extends Stats {
  geoBucket: GeoBucket;
}

export interface DayGeoBucketStats extends TotalGeoBucketStats {
  date: string;
}

export class GeoBucketStatsService {
  @DbConnection()
  async getDayStats(startDate: Date, endDate: Date, geoBucket?: GeoBucket) {
    const dayStats = await DayGeoBucketStatsModel.aggregate<DayGeoBucketStats>([
      this.getMatchStage(startDate, endDate, geoBucket),
      { $sort: { date: 1, geoBucket: 1 } },
      {
        $project: {
          ...getStatsProjection(),
          date: true,
          geoBucket: true,
        },
      },
    ]).exec();

    return dayStats;
  }

  @DbConnection()
  async getTotalStats(startDate: Date, endDate: Date, geoBucket?: GeoBucket) {
    const totalStats =
      await DayGeoBucketStatsModel.aggregate<TotalGeoBucketStats>([
        this.getMatchStage(startDate, endDate, geoBucket),
        {
          $group: {
            _id: "$geoBucket",
            revenue: { $sum: "$revenue" },
            orders: { $sum: "$orders" },
            averageOrderRevenue: { $avg: "$averageOrderRevenue" },
            geoBucket: { $first: "$geoBucket" },
          },
        },
        { $sort: { geoBucket: 1 } },
        {
          $project: {
            ...getStatsProjection(),
            geoBucket: true,
          },
        },
      ]).exec();

    return totalStats;
  }

  private getMatchStage(startDate: Date, endDate: Date, geoBucket?: GeoBucket) {
    const $match: Record<string, unknown> = {
      date: { $gte: startDate, $lt: endDate },
    };
    if (geoBucket) {
      $match.geoBucket = geoBucket;
    }

    return { $match };
  }
}
