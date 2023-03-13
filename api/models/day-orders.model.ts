import mongoose from "mongoose";
import Order from "./order.model";

const DAY_ORDERS_COLLECTION_NAME = "day_orders";

const DayOrders = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    date: { type: Date, required: true },
    orders: { type: Number, required: true },
  },
  { collection: DAY_ORDERS_COLLECTION_NAME, versionKey: false }
);

export async function calculateDayOrders() {
  await Order.aggregate([
    { $unwind: { path: "$items" } },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
        orders: { $sum: 1 },
      },
    },
    {
      $addFields: {
        date: {
          $dateFromString: { dateString: "$_id", format: "%Y-%m-%d" },
        },
      },
    },
    { $merge: { into: DAY_ORDERS_COLLECTION_NAME, whenMatched: "replace" } },
  ]);
}

// This prevents Mongoose from recompiling the model.
export default mongoose.models.DayOrders ||
  mongoose.model("DayOrders", DayOrders);
