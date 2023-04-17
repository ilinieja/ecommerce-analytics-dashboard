import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { fetchTotalStats } from "@/store/totalStats/totalStats.slice";
import { fetchDayStats } from "@/store/dayStats/dayStats.slice";
import { AppDispatch } from "@/store/store";
import { totalStatsSelectors } from "@/store/totalStats/totalStats.selectors";
import SvgDotsLoader from "@/icons/SvgDotsLoader";
import { dayStatsSelectors } from "@/store/dayStats/dayStats.selectors";
import { filtersSelectors } from "@/store/filters/filters.selectors";

import TotalStat from "../TotalStat/TotalStat";
import styles from "./TotalStatsBar.module.css";

export default function TotalStatsBar() {
  const dispatch = useDispatch<AppDispatch>();
  const isLoadingIdle = useSelector(totalStatsSelectors.getIsLoadingIdle);
  const isLoadingSuccess = useSelector(totalStatsSelectors.getIsLoadingSuccess);

  // TODO: Add date-bucketing option selection (day, week, month, year) for timelines.
  const { startDate, endDate } = useSelector(filtersSelectors.getDateRange);

  const revenue = useSelector(totalStatsSelectors.getTotalRevenue);
  const orders = useSelector(totalStatsSelectors.getTotalOrders);
  const averageOrderValue = useSelector(
    totalStatsSelectors.getTotalAverageOrderRevenue
  );

  const revenuesTimeline = useSelector(
    dayStatsSelectors.getRevenuesTimeline(10)
  );
  const ordersTimeline = useSelector(dayStatsSelectors.getOrdersTimeline(10));
  const averageOrderRevenuesTimeline = useSelector(
    dayStatsSelectors.getAverageOrderRevenuesTimeline(10)
  );

  useEffect(() => {
    if (isLoadingIdle) {
      dispatch(fetchTotalStats({ startDate, endDate }));
      dispatch(fetchDayStats({ startDate, endDate }));
    }
  }, [startDate, endDate, isLoadingIdle, dispatch]);

  return (
    <div className={styles.card}>
      <TotalStat
        name="Revenue"
        totalValue={revenue}
        valuePrefix="$"
        timelineData={revenuesTimeline}
      />
      <TotalStat
        name="Orders"
        totalValue={orders}
        timelineData={ordersTimeline}
      />
      <TotalStat
        name="Avg order value"
        totalValue={averageOrderValue}
        valueFormat="0,0.[00]a"
        valuePrefix="$"
        timelineData={averageOrderRevenuesTimeline}
      />
      {!isLoadingSuccess && (
        <div className={styles.loadingOverlay}>
          <SvgDotsLoader className={styles.loadingIndicator} />
        </div>
      )}
    </div>
  );
}
