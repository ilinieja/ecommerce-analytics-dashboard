import * as dotenv from "dotenv";
dotenv.config();

import logger from "../../utils/logger";

import setupQueue from "./setup-queue";
import scheduleDbViewUpdates from "./db-view-updates";

(async function () {
  const queue = await setupQueue();

  scheduleDbViewUpdates(queue);

  logger.info("Jobs worker started");
})();
