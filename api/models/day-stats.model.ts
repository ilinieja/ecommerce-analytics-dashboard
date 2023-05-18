import mongoose from "mongoose";
import Order from "./order.model";
import { getStatsRoundStage } from "./shared";

const DAY_STATS_COLLECTION_NAME = "day_stats";

const DayStats = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    date: { type: Date, required: true },
    revenue: { type: Number, required: true },
    orders: { type: Number, required: true },
    averageOrderRevenue: { type: Number, required: true },
  },
  { collection: DAY_STATS_COLLECTION_NAME, versionKey: false }
);

export async function calculateDayStats() {
  await Order.aggregate([
    { $unwind: { path: "$items" } },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
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
          $dateFromString: { dateString: "$_id", format: "%Y-%m-%d" },
        },
      },
    },
    getStatsRoundStage(),
    { $merge: { into: DAY_STATS_COLLECTION_NAME, whenMatched: "replace" } },
  ]);
}

// TODO: Add week, month, year and total calculations (here and in breakdown models).

// This prevents Mongoose from recompiling the model.
export default mongoose.models?.DayStats ||
  mongoose.model("DayStats", DayStats);
