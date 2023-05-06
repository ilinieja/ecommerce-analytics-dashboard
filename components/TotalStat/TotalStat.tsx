import numeral from "numeral";

import { TimelineDataItem } from "@/shared/timeline";

import MiniTimelineChart from "../MiniLineChart/MiniTimelineChart";
import ValuesDiff from "../ValuesDiff/ValuesDiff";

import styles from "./TotalStat.module.css";

export interface TotalStatProps {
  name: string;
  totalValue?: number;
  valueFormat?: string;
  valuePrefix?: string;
  timelineData?: TimelineDataItem[];
}

export default function TotalStat({
  name,
  totalValue = 0,
  valueFormat = "0,0.[000]a",
  valuePrefix = "",
  timelineData = [],
}: TotalStatProps) {
  return (
    <div className={styles.row}>
      <div className={styles.column}>
        <h2 className={styles.title}>{name}</h2>
        <h3 className={styles.bold} data-testid="TotalStat_value">
          {numeral(totalValue).format(`${valuePrefix}${valueFormat}`)}
        </h3>
        {timelineData.length && (
          <ValuesDiff
            initialValue={timelineData[0].value}
            finalValue={timelineData[timelineData.length - 1].value}
          />
        )}
      </div>
      <MiniTimelineChart data={timelineData} className={styles.chart} />
    </div>
  );
}
