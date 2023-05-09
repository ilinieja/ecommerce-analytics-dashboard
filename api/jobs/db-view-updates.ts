import { Agenda } from "@hokify/agenda";

import dbConnection from "../shared/dbConnection";
import { calculateDayStats } from "../models/day-stats.model";
import { calculateDayGeoBucketStats } from "../models/day-geo-bucket-stats.model";
import { calculateDayPlatformStats } from "../models/day-platform-stats.model";

const JOB_NAMES = {
  CALCULATE_DAY_STATS: "CALCULATE_DAY_STATS",
  CALCULATE_DAY_GEO_BUCKET_STATS: "CALCULATE_DAY_GEO_BUCKET_STATS",
  CALCULATE_DAY_PLATFORM_STATS: "CALCULATE_DAY_PLATFORM_STATS",
};

export default async function scheduleDbViewUpdates(agenda: Agenda) {
  agenda.define(JOB_NAMES.CALCULATE_DAY_STATS, async (job) => {
    const connection = await dbConnection();

    await calculateDayStats();

    connection.disconnect();
  });
  await agenda.every("1 day", JOB_NAMES.CALCULATE_DAY_STATS);

  agenda.define(JOB_NAMES.CALCULATE_DAY_GEO_BUCKET_STATS, async (job) => {
    const connection = await dbConnection();

    await calculateDayGeoBucketStats();

    connection.disconnect();
  });
  await agenda.every("1 day", JOB_NAMES.CALCULATE_DAY_GEO_BUCKET_STATS);

  agenda.define(JOB_NAMES.CALCULATE_DAY_PLATFORM_STATS, async (job) => {
    const connection = await dbConnection();

    await calculateDayPlatformStats();

    connection.disconnect();
  });
  await agenda.every("1 day", JOB_NAMES.CALCULATE_DAY_PLATFORM_STATS);
}
