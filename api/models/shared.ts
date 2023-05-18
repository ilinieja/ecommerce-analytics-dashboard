export function getStatsRoundStage() {
  return {
    $set: {
      revenue: { $round: ["$revenue", 5] },
      orders: { $round: ["$orders", 5] },
      averageOrderRevenue: { $round: ["$averageOrderRevenue", 5] },
    },
  };
}
