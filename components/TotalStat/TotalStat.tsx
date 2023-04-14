import numeral from "numeral";

import styles from "./TotalStat.module.css";

export interface TotalStatProps {
  name: string;
  value: number;
  valueFormat?: string;
  valuePrefix?: string;
  prevValue?: number;
  timelineValues?: number[];
}

export default function TotalStat({
  name,
  value,
  valueFormat = "0,0.[000]a",
  valuePrefix = "",
}: TotalStatProps) {
  return (
    <div className={styles.row}>
      <div className={styles.column}>
        <h2 className={styles.title}>{name}</h2>
        <div className={styles.row}>
          <div className={styles.column}>
            <h3 className={styles.bold}>
              {numeral(value).format(`${valuePrefix}${valueFormat}`)}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
