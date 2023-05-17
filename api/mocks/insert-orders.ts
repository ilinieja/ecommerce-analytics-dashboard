import * as dotenv from "dotenv";
dotenv.config();

import Order from "../models/order.model";
import dbConnection from "../shared/dbConnection";
import logger from "../shared/logger";

export async function insertOrders(orders: any[]) {
  const connection = await dbConnection();

  try {
    await Order.collection.insertMany(orders);
    logger.info("Orders inserted successfully");
  } catch (err) {
    logger.error(err);
  } finally {
    connection.disconnect();
  }
}
