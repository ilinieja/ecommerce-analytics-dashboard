import mongoose from "mongoose";
import Order, { GeoBucket } from "./order.model";

const DAY_GEO_BUCKET_STATS_COLLECTION_NAME = "day_geo_bucket_stats";

const DayGeoBucketStats = new mongoose.Schema(
  {
    _id: {
      date: { type: String, required: true },
      geoBucket: { type: String, required: true, enum: GeoBucket },
    },
    date: { type: Date, required: true },
    geoBucket: { type: String, required: true, enum: GeoBucket },
    revenue: { type: Number, required: true },
    orders: { type: Number, required: true },
    averageOrderRevenue: { type: Number, required: true },
  },
  { collection: DAY_GEO_BUCKET_STATS_COLLECTION_NAME, versionKey: false }
);

export async function calculateDayGeoBucketStats() {
  await Order.aggregate([
    { $unwind: { path: "$items" } },
    {
      $group: {
        _id: {
          date: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
          geoBucket: "$geoLocation.bucket",
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
        geoBucket: "$_id.geoBucket",
      },
    },
    {
      $merge: {
        into: DAY_GEO_BUCKET_STATS_COLLECTION_NAME,
        whenMatched: "replace",
      },
    },
  ]);
}

// This prevents Mongoose from recompiling the model.
export default mongoose.models?.DayGeoBucketStats ||
  mongoose.model("DayGeoBucketStats", DayGeoBucketStats);
