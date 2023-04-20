import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";

import { AppDispatch } from "@/store/store";
import { filtersSelectors } from "@/store/filters/filters.selectors";
import { fetchTotalPlatformStats } from "@/store/totalPlatformStats/totalPlatformStats.slice";
import { totalPlatformStatsSelectors } from "@/store/totalPlatformStats/totalPlatformStats.selectors";

import styles from "./TopPlatformsList.module.css";

export interface TopPlatformListProps {
  className?: string;
}

export default function TopPlatformsList({ className }: TopPlatformListProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { startDate, endDate } = useSelector(filtersSelectors.getDateRange);

  const selectTopPlatformStats = useCallback(
    totalPlatformStatsSelectors.makeSelectTotalPlatformStats(
      startDate,
      endDate
    ),
    [startDate, endDate]
  );
  const topPlatformStats = useSelector(selectTopPlatformStats);

  useEffect(() => {
    dispatch(fetchTotalPlatformStats({ startDate, endDate }));
  }, [startDate, endDate, dispatch]);

  return (
    <div className={classNames(className, styles.card)}>
      <div className={styles.header}>
        <h2 className={styles.title}>Top platforms</h2>
      </div>
    </div>
  );
}
