import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import { format } from "date-fns";

import { AppDispatch } from "@/store/store";
import { dayPlatformStatsSelectors } from "@/store/dayPlatformStats/dayPlatformStats.selectors";
import { filtersSelectors } from "@/store/filters/filters.selectors";
import { fetchDayPlatformStats } from "@/store/dayPlatformStats/dayPlatformStats.slice";
import SvgDotsLoader from "@/icons/SvgDotsLoader";

import StackedBarChart, {
  StackedBarChartDataItem,
  StackedBarStackItem,
} from "../StackedBarChart/StackedBarChart";
import ChartLegend from "../ChartLegend/ChartLegend";

import styles from "./BreakdownStatsChart.module.css";
import Select from "../Select/Select";

export interface BreakdownStatsChartProps {
  className?: string;
}

const CHART_PALETTE = ["#343434", "#665191", "#dd8057", "#4875c3"];

export default function BreakdownStatsChart({
  className,
}: BreakdownStatsChartProps) {
  const dispatch = useDispatch<AppDispatch>();

  const data = useSelector(dayPlatformStatsSelectors.selectAll);
  const isLoadingIdle = useSelector(dayPlatformStatsSelectors.getIsLoadingIdle);
  const isLoadingSuccess = useSelector(
    dayPlatformStatsSelectors.getIsLoadingSuccess
  );
  const { startDate, endDate } = useSelector(filtersSelectors.getDateRange);

  useEffect(() => {
    if (isLoadingIdle) {
      dispatch(fetchDayPlatformStats({ startDate, endDate }));
    }
  }, [startDate, endDate, isLoadingIdle, dispatch]);

  const values: { [group: string]: StackedBarChartDataItem } = {};
  const stackConfig: { [stack: string]: StackedBarStackItem } = {};

  for (let i = 0; i < data.length; i++) {
    const date = data[i].date;
    const platform = data[i].platform;
    if (!values[date]) {
      values[date] = {
        title: format(new Date(date), "d MMM"),
        stack: { [platform]: data[i].revenue },
      };
    } else {
      values[date].stack[platform] = data[i].revenue;
    }

    if (!stackConfig[platform]) {
      stackConfig[platform] = {
        title: platform,
        color: CHART_PALETTE[Object.keys(stackConfig).length],
      };
    }
  }

  const chartData = {
    values,
    stackConfig,
  };

  const dataSelectItems = [
    { title: "Revenue by platform", value: "revenue_by_platform" },
    { title: "Orders by platform", value: "orders_by_platform" },
    {
      title: "Avg order revenue by platform",
      value: "avg_order_revenue_by_platform",
    },
    { title: "Revenue by geography", value: "revenue_by_geography" },
    { title: "Orders by geography", value: "orders_by_geography" },
    {
      title: "Avg order revenue by geography",
      value: "avg_order_revenue_by_geography",
    },
  ];

  const handleDataSelectChange = (value: string) => {
    console.log(value);
  };

  return (
    <div className={classNames(styles.container, className)}>
      <div className={styles.row}>
        <Select
          items={dataSelectItems}
          selected={dataSelectItems[1].value}
          onChange={handleDataSelectChange}
        />
        <ChartLegend
          className={styles.rightAligned}
          items={Object.values(stackConfig)}
        />
      </div>
      <StackedBarChart className={styles.chart} data={chartData} />
      {!isLoadingSuccess && (
        <div className={styles.loadingOverlay}>
          <SvgDotsLoader className={styles.loadingIndicator} />
        </div>
      )}
    </div>
  );
}
