import { getApiUrl } from "../utils/url";

const axios = require("axios");

describe("/api/platform-stats", () => {
  describe("/total", () => {
    it("responds with total stats for the timerange", async () => {
      const res = await axios.get(
        `${getApiUrl()}/platform-stats/total?startDate=2023-01-01T00:00:00.000Z&endDate=2023-03-10T00:00:00.000Z`
      );

      expect(res.data).toMatchSnapshot();
    });
  });

  describe("/day", () => {
    it("responds with daily stats for the timerange", async () => {
      const res = await axios.get(
        `${getApiUrl()}/platform-stats/day?startDate=2023-01-01T00:00:00.000Z&endDate=2023-03-10T00:00:00.000Z`
      );

      expect(res.data).toMatchSnapshot();
    });
  });
});
