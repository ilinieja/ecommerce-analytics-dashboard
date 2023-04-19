import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import { format } from "date-fns";

import { AppDispatch, RootState } from "@/store/store";
import { dayPlatformStatsSelectors } from "@/store/dayPlatformStats/dayPlatformStats.selectors";
import { filtersSelectors } from "@/store/filters/filters.selectors";
import { fetchDayPlatformStats } from "@/store/dayPlatformStats/dayPlatformStats.slice";
import SvgDotsLoader from "@/icons/SvgDotsLoader";
import { DayPlatformStats } from "@/api/services/platform-stats.service";
import {
  ChartDimension,
  breakdownStatsChartDimensionUpdated,
} from "@/store/filters/filters.slice";

import StackedBarChart, {
  StackedBarChartDataItem,
  StackedBarStackItem,
} from "../StackedBarChart/StackedBarChart";
import ChartLegend from "../ChartLegend/ChartLegend";

import styles from "./BreakdownStatsChart.module.css";
import Select from "../Select/Select";
import { fetchDayGeoBucketStats } from "@/store/dayGeoBucketStats/dayGeoBucketStats.slice";
import { DayGeoBucketStats } from "@/api/services/geo-bucket-stats.service";
import { dayGeoBucketStatsSelectors } from "@/store/dayGeoBucketStats/dayGeoBucketStats.selectors";

export interface BreakdownStatsChartProps {
  className?: string;
}

const CHART_PALETTE = ["#343434", "#665191", "#dd8057", "#4875c3"];

interface ChartDimensionConfig {
  title: string;
  fetch: Function;
  getData: (state: RootState) => unknown;
  getValue: Function;
  getDimension: Function;
  getIsLoadingSuccess: (state: RootState) => boolean;
}

// TODO: Move config selectors to separate selectors file,
// they'll depend on filter selectors to switch between data sources.
const DIMENSION_CONFIGS: Record<ChartDimension, ChartDimensionConfig> = {
  revenue_by_platform: {
    title: "Revenue by platform",
    fetch: fetchDayPlatformStats,
    getData: dayPlatformStatsSelectors.selectAll,
    getValue: ({ revenue }: DayPlatformStats) => revenue,
    getDimension: ({ platform }: DayPlatformStats) => platform,
    getIsLoadingSuccess: dayPlatformStatsSelectors.getIsLoadingSuccess,
  },
  orders_by_platform: {
    title: "Orders by platform",
    fetch: fetchDayPlatformStats,
    getData: dayPlatformStatsSelectors.selectAll,
    getValue: ({ orders }: DayPlatformStats) => orders,
    getDimension: ({ platform }: DayPlatformStats) => platform,
    getIsLoadingSuccess: dayPlatformStatsSelectors.getIsLoadingSuccess,
  },
  average_order_revenue_by_platform: {
    title: "Avg order revenue by platform",
    fetch: fetchDayPlatformStats,
    getData: dayPlatformStatsSelectors.selectAll,
    getValue: ({ averageOrderRevenue }: DayPlatformStats) =>
      averageOrderRevenue,
    getDimension: ({ platform }: DayPlatformStats) => platform,
    getIsLoadingSuccess: dayPlatformStatsSelectors.getIsLoadingSuccess,
  },
  revenue_by_geo_bucket: {
    title: "Revenue by location",
    fetch: fetchDayGeoBucketStats,
    getData: dayGeoBucketStatsSelectors.selectAll,
    getValue: ({ revenue }: DayGeoBucketStats) => revenue,
    getDimension: ({ geoBucket }: DayGeoBucketStats) => geoBucket,
    getIsLoadingSuccess: dayGeoBucketStatsSelectors.getIsLoadingSuccess,
  },
  orders_by_geo_bucket: {
    title: "Orders by location",
    fetch: fetchDayGeoBucketStats,
    getData: dayGeoBucketStatsSelectors.selectAll,
    getValue: ({ orders }: DayGeoBucketStats) => orders,
    getDimension: ({ geoBucket }: DayGeoBucketStats) => geoBucket,
    getIsLoadingSuccess: dayGeoBucketStatsSelectors.getIsLoadingSuccess,
  },
  average_order_revenue_by_geo_bucket: {
    title: "Avg order revenue by location",
    fetch: fetchDayGeoBucketStats,
    getData: dayGeoBucketStatsSelectors.selectAll,
    getValue: ({ averageOrderRevenue }: DayGeoBucketStats) =>
      averageOrderRevenue,
    getDimension: ({ geoBucket }: DayGeoBucketStats) => geoBucket,
    getIsLoadingSuccess: dayGeoBucketStatsSelectors.getIsLoadingSuccess,
  },
};

export default function BreakdownStatsChart({
  className,
}: BreakdownStatsChartProps) {
  const dispatch = useDispatch<AppDispatch>();

  const selectedDimension = useSelector(
    filtersSelectors.getBreakdownStatsChartDimension
  );
  const dimensionConfig = DIMENSION_CONFIGS[selectedDimension];

  const data = useSelector(dimensionConfig.getData) as
    | DayGeoBucketStats[]
    | DayPlatformStats[];
  const isLoadingSuccess = useSelector(dimensionConfig.getIsLoadingSuccess);
  const { startDate, endDate } = useSelector(filtersSelectors.getDateRange);

  useEffect(() => {
    dispatch(dimensionConfig.fetch({ startDate, endDate }));
  }, [startDate, endDate, dimensionConfig, dispatch]);

  const values: { [group: string]: StackedBarChartDataItem } = {};
  const stackConfig: { [stack: string]: StackedBarStackItem } = {};

  for (let i = 0; i < data.length; i++) {
    const date = data[i].date;
    const dimension = dimensionConfig.getDimension(data[i]);
    if (!values[date]) {
      values[date] = {
        title: format(new Date(date), "d MMM"),
        stack: { [dimension]: dimensionConfig.getValue(data[i]) },
      };
    } else {
      values[date].stack[dimension] = dimensionConfig.getValue(data[i]);
    }

    if (!stackConfig[dimension]) {
      stackConfig[dimension] = {
        title: dimension,
        color: CHART_PALETTE[Object.keys(stackConfig).length],
      };
    }
  }

  const chartData = {
    values,
    stackConfig,
  };

  const handleDataSelectChange = (value: string) => {
    dispatch(breakdownStatsChartDimensionUpdated({ value }));
  };

  return (
    <div className={classNames(styles.container, className)}>
      <div className={styles.row}>
        <Select
          items={Object.entries(DIMENSION_CONFIGS).map(
            ([value, { title }]) => ({ value, title })
          )}
          selected={selectedDimension}
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
