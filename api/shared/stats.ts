export interface Stats {
  revenue: number;
  orders: number;
  averageOrderRevenue: number;
}

export interface DayStatsResponse<T> {
  dayStats: T[];
}
export interface TotalStatsResponse<T> {
  totalStats: T[];
}

export function getStatsProjection() {
  return {
    _id: false,
    revenue: true,
    orders: true,
    averageOrderRevenue: true,
  };
}
