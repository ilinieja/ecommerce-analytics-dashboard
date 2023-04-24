import { useEffect } from "react";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch } from "@/store/store";
import { filtersSelectors } from "@/store/filters/filters.selectors";
import { fetchTotalGeoBucketStats } from "@/store/totalGeoBucketStats/totalGeoBucketStats.slice";
import { totalGeoBucketStatsSelectors } from "@/store/totalGeoBucketStats/totalGeoBucketStats.selectors";
import SvgCircleLoader from "@/icons/SvgDotsLoader";

import styles from "./TopLocationsChart.module.css";

export interface TopLocationsChartProps {
  className?: string;
}

export function TopLocationsChart({ className }: TopLocationsChartProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { startDate, endDate } = useSelector(filtersSelectors.getDateRange);
  const isLoadingSuccess = useSelector(
    totalGeoBucketStatsSelectors.getIsLoadingSuccess
  );

  useEffect(() => {
    dispatch(fetchTotalGeoBucketStats({ startDate, endDate }));
  }, [startDate, endDate, dispatch]);

  return (
    <div className={classNames(className, styles.card)}>
      <div className={styles.header}>
        <h2 className={styles.title}>Top locations</h2>
      </div>
      {!isLoadingSuccess && (
        <div className={styles.loadingOverlay}>
          <SvgCircleLoader className={styles.loadingIndicator} />
        </div>
      )}
    </div>
  );
}
