import mongoose from "mongoose";
import Order from "./order.model";

const DAY_AVERAGE_ORDER_REVENUES_COLLECTION_NAME = "day_average_order_revenues";

const DayAverageOrderRevenue = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    date: { type: Date, required: true },
    averageOrderRevenue: { type: Number, required: true },
  },
  { collection: DAY_AVERAGE_ORDER_REVENUES_COLLECTION_NAME, versionKey: false }
);

export async function calculateDayAverageOrderRevenues() {
  await Order.aggregate([
    { $unwind: { path: "$items" } },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
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
    {
      $merge: {
        into: DAY_AVERAGE_ORDER_REVENUES_COLLECTION_NAME,
        whenMatched: "replace",
      },
    },
  ]);
}

// This prevents Mongoose from recompiling the model.
export default mongoose.models.DayAverageOrderRevenue ||
  mongoose.model("DayAverageOrderRevenue", DayAverageOrderRevenue);
