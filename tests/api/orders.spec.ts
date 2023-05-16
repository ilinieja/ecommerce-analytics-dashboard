import { isAfter, isBefore, isEqual, max, min } from "date-fns";

import { Order } from "../../api/services/orders.service";
import { getApiUrl } from "../utils/url";

const axios = require("axios");

describe("/api/orders", () => {
  it("responds with orders list of size limit", async () => {
    const res = await axios.get(
      `${getApiUrl()}/orders?startDate=2023-01-01T00:00:00.000Z&endDate=2023-03-10T00:00:00.000Z&limit=5`
    );
    const res1 = await axios.get(
      `${getApiUrl()}/orders?startDate=2023-01-01T00:00:00.000Z&endDate=2023-03-10T00:00:00.000Z&limit=14`
    );

    expect(res.data.orders.length).toEqual(5);
    expect(res1.data.orders.length).toEqual(14);
  });

  it("sorts orders list by date desc", async () => {
    const res = await axios.get(
      `${getApiUrl()}/orders?startDate=2023-01-01T00:00:00.000Z&endDate=2023-03-10T00:00:00.000Z&limit=100`
    );

    const isSorted = !res.data.orders.some(
      (order: Order, index: number, orders: Order[]) =>
        orders[index + 1] &&
        new Date(order.date) < new Date(orders[index + 1].date)
    );

    expect(isSorted).toBe(true);
  });

  it("filters orders by start/end dates", async () => {
    const startDate = new Date("2023-01-01T00:00:00.000Z");
    const endDate = new Date("2023-01-10T00:00:00.000Z");
    // `limit` should be large to ensure we get all orders in range
    const res = await axios.get(
      `${getApiUrl()}/orders?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}&limit=1000`
    );

    const orderDates = res.data.orders.map(({ date }: Order) => new Date(date));
    const areOrdersBetweenDates = (isAfter(min(orderDates), startDate) || isEqual(min(orderDates), startDate)) && isBefore(max(orderDates), endDate);

    expect(areOrdersBetweenDates).toBe(true);
  });
});
