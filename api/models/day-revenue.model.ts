import mongoose from "mongoose";
import Order from "./order.model";

const DAY_REVENUES_COLLECTION_NAME = "day_revenues";

const DayRevenue = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    date: { type: Date, required: true },
    revenue: { type: Number, required: true },
  },
  { collection: DAY_REVENUES_COLLECTION_NAME, versionKey: false }
);

export async function calculateDayRevenues() {
  await Order.aggregate([
    { $unwind: { path: "$items" } },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
        revenue: {
          $sum: { $multiply: ["$items.quantity", "$items.item.price"] },
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
    { $merge: { into: DAY_REVENUES_COLLECTION_NAME, whenMatched: "replace" } },
  ]);
}

// This prevents Mongoose from recompiling the model.
export default mongoose.models.DayRevenue ||
  mongoose.model("DayRevenue", DayRevenue);
