import { useDispatch, useSelector } from "react-redux";
import { useMemo, useEffect } from "react";
import classNames from "classnames";

import { fetchTotalStats } from "@/store/totalStats/totalStats.slice";
import { fetchDayStats } from "@/store/dayStats/dayStats.slice";
import { AppDispatch } from "@/store/store";
import { totalStatsSelectors } from "@/store/totalStats/totalStats.selectors";
import { dayStatsSelectors } from "@/store/dayStats/dayStats.selectors";
import { filtersSelectors } from "@/store/filters/filters.selectors";
import SvgCircleLoader from "@/icons/SvgDotsLoader";

import TotalStat from "../TotalStat/TotalStat";
import styles from "./TotalStatsBar.module.scss";

export interface TotatStatsBarProps {
  className?: string;
}

export default function TotalStatsBar({ className }: TotatStatsBarProps) {
  const dispatch = useDispatch<AppDispatch>();
  const isLoadingSuccess = useSelector(totalStatsSelectors.getIsLoadingSuccess);

  // TODO: Add date-bucketing option selection (day, week, month, year) for timelines.
  const { startDate, endDate } = useSelector(filtersSelectors.getDateRange);

  const selectTotalStats = useMemo(
    () => totalStatsSelectors.makeSelectTotalStats(startDate, endDate),
    [startDate, endDate]
  );
  const totalStats = useSelector(selectTotalStats);

  const revenuesTimeline = useSelector(
    dayStatsSelectors.getRevenuesTimeline(10)
  );
  const ordersTimeline = useSelector(dayStatsSelectors.getOrdersTimeline(10));
  const averageOrderRevenuesTimeline = useSelector(
    dayStatsSelectors.getAverageOrderRevenuesTimeline(10)
  );

  useEffect(() => {
    dispatch(fetchTotalStats({ startDate, endDate }));
    dispatch(fetchDayStats({ startDate, endDate }));
  }, [startDate, endDate, dispatch]);

  return (
    <div className={classNames(className, styles.card)}>
      <TotalStat
        name="Revenue"
        totalValue={totalStats?.revenue}
        valuePrefix="$"
        timelineData={revenuesTimeline}
      />
      <TotalStat
        name="Orders"
        totalValue={totalStats?.orders}
        timelineData={ordersTimeline}
      />
      <TotalStat
        name="Avg order value"
        totalValue={totalStats?.averageOrderRevenue}
        valueFormat="0,0.[00]a"
        valuePrefix="$"
        timelineData={averageOrderRevenuesTimeline}
      />
      {!isLoadingSuccess && (
        <div className={styles.loadingOverlay}>
          <SvgCircleLoader className={styles.loadingIndicator} />
        </div>
      )}
    </div>
  );
}
