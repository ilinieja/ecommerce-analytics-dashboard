import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import classNames from "classnames";

import { AppDispatch } from "@/store/store";
import { filtersSelectors } from "@/store/filters/filters.selectors";
import { fetchTotalPlatformStats } from "@/store/totalPlatformStats/totalPlatformStats.slice";
import { totalPlatformStatsSelectors } from "@/store/totalPlatformStats/totalPlatformStats.selectors";
import { totalStatsSelectors } from "@/store/totalStats/totalStats.selectors";
import SvgCircleLoader from "@/icons/SvgDotsLoader";

import TopPlatformsListItem from "./TopPlatformsListItem";
import styles from "./TopPlatformsList.module.css";

export interface TopPlatformListProps {
  className?: string;
}

const getIsLoadingSuccess = createSelector(
  [
    totalPlatformStatsSelectors.getIsLoadingSuccess,
    totalStatsSelectors.getIsLoadingSuccess,
  ],
  (isTopPlatformsLoadingSuccess, isTotalStatsLoadingSuccess) =>
    isTopPlatformsLoadingSuccess && isTotalStatsLoadingSuccess
);

export default function TopPlatformsList({ className }: TopPlatformListProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { startDate, endDate } = useSelector(filtersSelectors.getDateRange);
  const isLoadingSuccess = useSelector(getIsLoadingSuccess);

  const selectTopPlatformStats = useCallback(
    totalPlatformStatsSelectors.makeSelectTotalPlatformStats(
      startDate,
      endDate,
      "revenue"
    ),
    [startDate, endDate]
  );
  const topPlatformStats = useSelector(selectTopPlatformStats);

  const selectTotalStats = useCallback(
    totalStatsSelectors.makeSelectTotalStats(startDate, endDate),
    [startDate, endDate]
  );
  const totalStats = useSelector(selectTotalStats);

  useEffect(() => {
    dispatch(fetchTotalPlatformStats({ startDate, endDate }));
  }, [startDate, endDate, dispatch]);

  return (
    <div className={classNames(className, styles.card)}>
      <div className={styles.header}>
        <h2 className={styles.title}>Top platforms</h2>
      </div>
      <div className={styles.list}>
        {totalStats &&
          topPlatformStats.map((platformStats) => (
            <TopPlatformsListItem
              key={platformStats.platform}
              stats={platformStats}
              totalStats={totalStats}
            ></TopPlatformsListItem>
          ))}
      </div>
      {/* TODO: Move loading indicator with logic into separate component (projecting children inside). */}
      {!isLoadingSuccess && (
        <div className={styles.loadingOverlay}>
          <SvgCircleLoader className={styles.loadingIndicator} />
        </div>
      )}
    </div>
  );
}
