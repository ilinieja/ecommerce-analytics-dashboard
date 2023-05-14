import { OrdersResponse } from "@/pages/api/orders";
import { Order } from "../services/orders.service";
import { getApiUri } from "./utils";

const axios = require("axios");

describe("/api/orders", () => {
  it("responds with orders list of size limit", async () => {
    const res = await axios.get(
      `${getApiUri()}/orders?startDate=2023-01-01T00:00:00.000Z&endDate=2023-03-10T00:00:00.000Z&limit=5`
    );
    const res1 = await axios.get(
      `${getApiUri()}/orders?startDate=2023-01-01T00:00:00.000Z&endDate=2023-03-10T00:00:00.000Z&limit=14`
    );

    expect(res.data.orders.length).toEqual(5);
    expect(res1.data.orders.length).toEqual(14);
  });
});
