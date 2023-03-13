import { Agenda } from "@hokify/agenda";

import dbConnection from "../../utils/dbConnection";
import { calculateDayRevenues } from "../../models/day-revenue.model";
import { calculateDayOrders } from "../../models/day-orders.model";
import { calculateDayAverageOrderRevenues } from "../../models/day-average-order-revenue.model";

const JOB_NAMES = {
  CALCULATE_DAY_REVENUES: "CALCULATE_DAY_REVENUES",
  CALCULATE_DAY_ORDERS: "CALCULATE_DAY_ORDERS",
  CALCULATE_DAY_AVERAGE_ORDER_REVENUES: "CALCULATE_DAY_AVERAGE_ORDER_REVENUES",
};

export default async function scheduleDbViewUpdates(agenda: Agenda) {
  agenda.define(JOB_NAMES.CALCULATE_DAY_REVENUES, async (job) => {
    const connection = await dbConnection();

    await calculateDayRevenues();

    connection.disconnect();
  });
  await agenda.every("1 day", JOB_NAMES.CALCULATE_DAY_REVENUES);

  agenda.define(JOB_NAMES.CALCULATE_DAY_ORDERS, async (job) => {
    const connection = await dbConnection();

    await calculateDayOrders();

    connection.disconnect();
  });
  await agenda.every("1 day", JOB_NAMES.CALCULATE_DAY_ORDERS);

  agenda.define(JOB_NAMES.CALCULATE_DAY_AVERAGE_ORDER_REVENUES, async (job) => {
    const connection = await dbConnection();

    await calculateDayAverageOrderRevenues();

    connection.disconnect();
  });
  await agenda.every("1 day", JOB_NAMES.CALCULATE_DAY_AVERAGE_ORDER_REVENUES);
}
