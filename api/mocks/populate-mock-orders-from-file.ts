import fs from "fs";
import path from "path";

import { insertOrders } from "./insert-orders";

const mockOrders = JSON.parse(
  fs.readFileSync(path.join(__dirname, "mock-orders.json"), "utf-8")
);

(async function () {
  await insertOrders(mockOrders);
})();
