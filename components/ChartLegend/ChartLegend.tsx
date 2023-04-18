import classNames from "classnames";

import styles from "./ChartLegend.module.css";

export interface ChartLegendProps {
  items: Array<{ title: string; color: string }>;
  className?: string;
}

export default function ChartLegend({ items, className }: ChartLegendProps) {
  return (
    <div className={classNames(styles.container, className)}>
      {items.map((item) => (
        <div className={styles.row}>
          <div
            className={styles.colorIndicator}
            style={{ backgroundColor: item.color }}
          />
          <span className={styles.text}>{item.title}</span>
        </div>
      ))}
    </div>
  );
}
