import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";

import { AppDispatch } from "@/store/store";
import { dayPlatformStatsSelectors } from "@/store/dayPlatformStats/dayPlatformStats.selectors";
import { filtersSelectors } from "@/store/filters/filters.selectors";
import { fetchDayPlatformStats } from "@/store/dayPlatformStats/dayPlatformStats.slice";

import StackedBarChart from "../StackedBarChart/StackedBarChart";

import styles from "./BreakdownStatsChart.module.css";

export interface BreakdownStatsChartProps {
  className?: string;
}

export default function BreakdownStatsChart({
  className,
}: BreakdownStatsChartProps) {
  const dispatch = useDispatch<AppDispatch>();

  const data = useSelector(dayPlatformStatsSelectors.selectAll);
  const isLoadingIdle = useSelector(dayPlatformStatsSelectors.getIsLoadingIdle);
  const { startDate, endDate } = useSelector(filtersSelectors.getDateRange);

  useEffect(() => {
    if (isLoadingIdle) {
      dispatch(fetchDayPlatformStats({ startDate, endDate }));
    }
  }, [startDate, endDate, isLoadingIdle, dispatch]);

  console.log(data);
  const chartData = {
    groups: {
      "2023-04-01": { title: "1 Apr" },
      "2023-04-02": { title: "2 Apr" },
      "2023-04-03": { title: "3 Apr" },
      "2023-04-04": { title: "4 Apr" },
      "2023-04-05": { title: "5 Apr" },
      "2023-04-06": { title: "6 Apr" },
      "2023-04-07": { title: "7 Apr" },
      "2023-04-08": { title: "8 Apr" },
      "2023-04-09": { title: "9 Apr" },
      "2023-04-10": { title: "10 Apr" },
    },
    subgroups: {
      Amazon: { title: "Amazon", color: "#343434" },
      Ebay: { title: "Ebay", color: "#665191" },
      Allegro: { title: "Allegro", color: "#dd8057" },
      Farfetch: { title: "Farfetch", color: "#4875c3" },
    },
    values: [
      {
        group: "2023-04-01",
        subgroups: { Amazon: 100, Ebay: 20, Allegro: 50, Farfetch: 10 },
      },
      {
        group: "2023-04-02",
        subgroups: { Amazon: 110, Ebay: 30, Allegro: 20, Farfetch: 40 },
      },
      {
        group: "2023-04-03",
        subgroups: { Amazon: 120, Ebay: 40, Allegro: 70, Farfetch: 30 },
      },
      {
        group: "2023-04-04",
        subgroups: { Amazon: 150, Ebay: 50, Allegro: 40, Farfetch: 40 },
      },
      {
        group: "2023-04-05",
        subgroups: { Amazon: 120, Ebay: 30, Allegro: 70, Farfetch: 20 },
      },
      {
        group: "2023-04-06",
        subgroups: { Amazon: 160, Ebay: 40, Allegro: 20, Farfetch: 30 },
      },
      {
        group: "2023-04-07",
        subgroups: { Amazon: 30, Ebay: 50, Allegro: 70, Farfetch: 20 },
      },
      {
        group: "2023-04-08",
        subgroups: { Amazon: 10, Ebay: 30, Allegro: 20, Farfetch: 40 },
      },
      {
        group: "2023-04-09",
        subgroups: { Amazon: 20, Ebay: 40, Allegro: 70, Farfetch: 30 },
      },
      {
        group: "2023-04-10",
        subgroups: { Amazon: 90, Ebay: 50, Allegro: 20, Farfetch: 20 },
      },
    ],
  };

  return (
    <div className={classNames(styles.container, className)}>
      <div className={styles.row}></div>
      <StackedBarChart className={styles.chart} data={chartData} />
    </div>
  );
}
