import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { subYears } from "date-fns";

import { fetchTotalStats } from "@/store/totalStats/totalStats.slice";
import { fetchDayStats } from "@/store/dayStats/dayStats.slice";
import { AppDispatch } from "@/store/store";
import { totalStatsSelectors } from "@/store/totalStats/totalStats.selectors";
import SvgDotsLoader from "@/icons/SvgDotsLoader";
import { dayStatsSelectors } from "@/store/dayStats/dayStats.selectors";

import TotalStat from "../TotalStat/TotalStat";
import styles from "./TotalStatsBar.module.css";

export default function TotalStatsBar() {
  const dispatch = useDispatch<AppDispatch>();
  const isLoadingIdle = useSelector(totalStatsSelectors.getIsLoadingIdle);
  const isLoadingSuccess = useSelector(totalStatsSelectors.getIsLoadingSuccess);

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
      // TODO: Use dates from control when it's implemented.
      const endDate = new Date();
      const startDate = subYears(endDate, 1);

      dispatch(fetchTotalStats({ startDate, endDate }));
      dispatch(fetchDayStats({ startDate, endDate }));
    }
  }, [isLoadingIdle, dispatch]);

  return (
    <div className={styles.card}>
      <TotalStat
        name="Revenue"
        value={revenue}
        valuePrefix="$"
        timelineData={revenuesTimeline}
      />
      <TotalStat name="Orders" value={orders} timelineData={ordersTimeline} />
      <TotalStat
        name="Avg order value"
        value={averageOrderValue}
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
