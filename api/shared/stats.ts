export interface Stats {
  revenue: number;
  orders: number;
  averageOrderRevenue: number;
}

export function getStatsProjection() {
  return {
    _id: false,
    revenue: true,
    orders: true,
    averageOrderRevenue: true,
  };
}
