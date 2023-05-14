import fs from "fs";
import path from "path";
import * as dotenv from "dotenv";
dotenv.config();

import logger from "../shared/logger";

import { createMockOrder } from "./create-mock-order";

async function writeTestData() {
  const orders = Array.from({ length: 500 }, createMockOrder);

  try {
    fs.writeFileSync(
      path.join(__dirname, "mock-orders.json"),
      JSON.stringify(orders, null, 2)
    );
    logger.info("Test data file written successfully");
  } catch (err) {
    logger.error(err);
  }
}

(async function () {
  await writeTestData();
})();
