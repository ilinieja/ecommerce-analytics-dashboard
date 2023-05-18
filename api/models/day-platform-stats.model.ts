import mongoose from "mongoose";
import Order, { Platform } from "./order.model";
import { getStatsRoundStage } from "./shared";

const DAY_PLATFORM_STATS_COLLECTION_NAME = "day_platform_stats";

const DayPlatformStats = new mongoose.Schema(
  {
    _id: {
      date: { type: String, required: true },
      platform: { type: String, required: true, enum: Platform },
    },
    date: { type: Date, required: true },
    platform: { type: String, required: true, enum: Platform },
    revenue: { type: Number, required: true },
    orders: { type: Number, required: true },
    averageOrderRevenue: { type: Number, required: true },
  },
  { collection: DAY_PLATFORM_STATS_COLLECTION_NAME, versionKey: false }
);

export async function calculateDayPlatformStats() {
  await Order.aggregate([
    { $unwind: { path: "$items" } },
    {
      $group: {
        _id: {
          date: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
          platform: "$platform",
        },
        revenue: {
          $sum: { $multiply: ["$items.quantity", "$items.item.price"] },
        },
        orders: { $sum: 1 },
        averageOrderRevenue: {
          $avg: { $multiply: ["$items.quantity", "$items.item.price"] },
        },
      },
    },
    {
      $addFields: {
        date: {
          $dateFromString: {
            dateString: "$_id.date",
            format: "%Y-%m-%d",
          },
        },
        platform: "$_id.platform",
      },
    },
    getStatsRoundStage(),
    {
      $merge: {
        into: DAY_PLATFORM_STATS_COLLECTION_NAME,
        whenMatched: "replace",
      },
    },
  ]);
}

// This prevents Mongoose from recompiling the model.
export default mongoose.models?.DayPlatformStats ||
  mongoose.model("DayPlatformStats", DayPlatformStats);
