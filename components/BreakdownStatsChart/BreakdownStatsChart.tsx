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
import { fetchDayGeoBucketStats } from "@/store/dayGeoBucketStats/dayGeoBucketStats.slice";
import { DayGeoBucketStats } from "@/api/services/geo-bucket-stats.service";
import { dayGeoBucketStatsSelectors } from "@/store/dayGeoBucketStats/dayGeoBucketStats.selectors";
import {
  DEFAULT_COLOR,
  getGeoBucketColor,
  getGeoBucketOrder,
  getPlatformColor,
  getPlatformOrder,
} from "@/shared/charts";
import { getValuesSortedByField } from "@/shared/utils";

import StackedBarChart, {
  StackedBarChartDataItem,
  StackedBarStackItem,
} from "../StackedBarChart/StackedBarChart";
import ChartLegend from "../ChartLegend/ChartLegend";
import Select from "../Select/Select";

import styles from "./BreakdownStatsChart.module.css";
import logger from "@/shared/logger";

export interface BreakdownStatsChartProps {
  className?: string;
}

interface ChartDimensionConfig {
  title: string;
  fetchData: Function;
  getData: (state: RootState) => unknown;
  getValue: Function;
  getDimensionValue: Function;
  getIsLoadingSuccess: (state: RootState) => boolean;
}

// TODO: Move config selectors to separate selectors file,
// they'll depend on filter selectors to switch between data sources.
const DIMENSION_CONFIGS: Record<ChartDimension, ChartDimensionConfig> = {
  revenue_by_platform: {
    title: "Revenue by platform",
    fetchData: fetchDayPlatformStats,
    getData: dayPlatformStatsSelectors.selectAll,
    getValue: ({ revenue }: DayPlatformStats) => revenue,
    getDimensionValue: ({ platform }: DayPlatformStats) => platform,
    getIsLoadingSuccess: dayPlatformStatsSelectors.getIsLoadingSuccess,
  },
  orders_by_platform: {
    title: "Orders by platform",
    fetchData: fetchDayPlatformStats,
    getData: dayPlatformStatsSelectors.selectAll,
    getValue: ({ orders }: DayPlatformStats) => orders,
    getDimensionValue: ({ platform }: DayPlatformStats) => platform,
    getIsLoadingSuccess: dayPlatformStatsSelectors.getIsLoadingSuccess,
  },
  average_order_revenue_by_platform: {
    title: "Avg order revenue by platform",
    fetchData: fetchDayPlatformStats,
    getData: dayPlatformStatsSelectors.selectAll,
    getValue: ({ averageOrderRevenue }: DayPlatformStats) =>
      averageOrderRevenue,
    getDimensionValue: ({ platform }: DayPlatformStats) => platform,
    getIsLoadingSuccess: dayPlatformStatsSelectors.getIsLoadingSuccess,
  },
  revenue_by_geo_bucket: {
    title: "Revenue by location",
    fetchData: fetchDayGeoBucketStats,
    getData: dayGeoBucketStatsSelectors.selectAll,
    getValue: ({ revenue }: DayGeoBucketStats) => revenue,
    getDimensionValue: ({ geoBucket }: DayGeoBucketStats) => geoBucket,
    getIsLoadingSuccess: dayGeoBucketStatsSelectors.getIsLoadingSuccess,
  },
  orders_by_geo_bucket: {
    title: "Orders by location",
    fetchData: fetchDayGeoBucketStats,
    getData: dayGeoBucketStatsSelectors.selectAll,
    getValue: ({ orders }: DayGeoBucketStats) => orders,
    getDimensionValue: ({ geoBucket }: DayGeoBucketStats) => geoBucket,
    getIsLoadingSuccess: dayGeoBucketStatsSelectors.getIsLoadingSuccess,
  },
  average_order_revenue_by_geo_bucket: {
    title: "Avg order revenue by location",
    fetchData: fetchDayGeoBucketStats,
    getData: dayGeoBucketStatsSelectors.selectAll,
    getValue: ({ averageOrderRevenue }: DayGeoBucketStats) =>
      averageOrderRevenue,
    getDimensionValue: ({ geoBucket }: DayGeoBucketStats) => geoBucket,
    getIsLoadingSuccess: dayGeoBucketStatsSelectors.getIsLoadingSuccess,
  },
};

function isPlatformDimension(dimension: keyof typeof DIMENSION_CONFIGS) {
  return dimension.includes("by_platform");
}

function isGeoBucketDimension(dimension: keyof typeof DIMENSION_CONFIGS) {
  return dimension.includes("by_geo_bucket");
}

function getColor(dimension: keyof typeof DIMENSION_CONFIGS, value: string) {
  if (isPlatformDimension(dimension)) {
    return getPlatformColor(value);
  }

  if (isGeoBucketDimension(dimension)) {
    return getGeoBucketColor(value);
  }

  logger.error(`[BreakdownStatsChart] Invalid dimension: ${dimension}`);

  return DEFAULT_COLOR;
}

function getOrder(dimension: keyof typeof DIMENSION_CONFIGS, value: string) {
  if (isPlatformDimension(dimension)) {
    return getPlatformOrder(value);
  }

  if (isGeoBucketDimension(dimension)) {
    return getGeoBucketOrder(value);
  }

  logger.error(`[BreakdownStatsChart] Invalid dimension: ${dimension}`);

  return 0;
}

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

  // TODO: Add lastLoaded (params to timestamp map) for data
  // and don't fetch if there's fresh version available.
  useEffect(() => {
    dispatch(dimensionConfig.fetchData({ startDate, endDate }));
  }, [startDate, endDate, dimensionConfig, dispatch]);

  const values: { [group: string]: StackedBarChartDataItem } = {};
  const stackConfig: { [stack: string]: StackedBarStackItem } = {};

  for (let i = 0; i < data.length; i++) {
    const date = data[i].date;
    const dimensionValue = dimensionConfig.getDimensionValue(data[i]);
    if (!values[date]) {
      values[date] = {
        title: format(new Date(date), "d MMM"),
        stack: { [dimensionValue]: dimensionConfig.getValue(data[i]) },
      };
    } else {
      values[date].stack[dimensionValue] = dimensionConfig.getValue(data[i]);
    }

    if (!stackConfig[dimensionValue]) {
      stackConfig[dimensionValue] = {
        title: dimensionValue,
        color: getColor(selectedDimension, dimensionValue),
        order: getOrder(selectedDimension, dimensionValue),
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
          items={getValuesSortedByField(stackConfig, "order")}
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
