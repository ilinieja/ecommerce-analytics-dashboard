import { useMemo, useEffect } from "react";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch } from "@/store/store";
import { filtersSelectors } from "@/store/filters/filters.selectors";
import { fetchTotalGeoBucketStats } from "@/store/totalGeoBucketStats/totalGeoBucketStats.slice";
import { totalGeoBucketStatsSelectors } from "@/store/totalGeoBucketStats/totalGeoBucketStats.selectors";
import { getValuesSortedByField } from "@/shared/utils";
import { getGeoBucketColor, getGeoBucketOrder } from "@/shared/charts";

import { DonutChart, DonutChartData } from "../DonutChart/DonutChart";
import ChartLegend from "../ChartLegend/ChartLegend";

import styles from "./TopLocationsChart.module.css";
import LoadingOverlay from "../LoadingOverlay/LoadingOverlay";

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

  const totalGeoBucketStatsSelector = useMemo(
    () =>
      totalGeoBucketStatsSelectors.makeSelectTotalGeoBucketStats(
        startDate,
        endDate,
        "revenue"
      ),
    [startDate, endDate]
  );
  const totalGeoBucketStats = useSelector(totalGeoBucketStatsSelector);

  const chartData: DonutChartData = {};
  for (let i = 0; i < totalGeoBucketStats.length; i++) {
    const { geoBucket, revenue } = totalGeoBucketStats[i];
    chartData[geoBucket] = {
      title: geoBucket,
      value: revenue,
      color: getGeoBucketColor(geoBucket),
      order: getGeoBucketOrder(geoBucket),
    };
  }

  return (
    <LoadingOverlay className={classNames(className, styles.card)} isLoadingSuccess={isLoadingSuccess}>
      <div className={styles.header}>
        <h2 className={styles.title}>Top locations</h2>
      </div>
      <div className={styles.content} data-testid="TopLocationsChart_chart" >
        <DonutChart className={styles.chart} data={chartData} />
        <ChartLegend items={getValuesSortedByField(chartData, "order")} />
      </div>
    </LoadingOverlay>
  );
}
