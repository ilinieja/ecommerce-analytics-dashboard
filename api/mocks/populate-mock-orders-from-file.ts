import fs from "fs";
import path from "path";

import { insertOrders } from "./insert-orders";

const mockOrders = JSON.parse(
  fs.readFileSync(path.join(__dirname, "mock-orders.json"), "utf-8")
).map((order: any) => ({...order, date: new Date(order.date)}));

(async function () {
  await insertOrders(mockOrders);
})();
