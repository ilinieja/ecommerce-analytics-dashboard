import { Agenda } from "@hokify/agenda";

import logger from "../../shared/logger";

const DATABASE_URI = process.env.JOBS_DATABASE_URI;
const DATABASE_COLLECTION = process.env.JOBS_DATABASE_COLLECTION;
if (!DATABASE_URI || !DATABASE_COLLECTION) {
  throw new Error(
    "JOBS_DATABASE_URI and JOBS_DATABASE_COLLECTION are required in env"
  );
}

export default async function setupQueue() {
  const agenda = new Agenda({
    db: {
      address: DATABASE_URI,
      collection: DATABASE_COLLECTION,
    },
    processEvery: "5 minutes",
  });

  agenda.on("start", (job) => {
    logger.info(`Job ${job.attrs.name} started`);
  });

  agenda.on("complete", (job) => {
    logger.info(`Job ${job.attrs.name} completed`);
  });

  agenda.on("fail", (err, job) => {
    logger.error(`Job ${job.attrs.name} failed`, err);
  });

  await agenda.start();

  return agenda;
}
