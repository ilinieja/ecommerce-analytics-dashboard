import classNames from "classnames";
import numeral from "numeral";

import SvgTrendLineIcon from "@/icons/SvgTrendLineIcon";
import styles from "./ValuesDiff.module.css";

export interface ValuesDiffProps {
  initialValue: number;
  finalValue: number;
  className?: string;
}

export default function ValuesDiff({
  initialValue,
  finalValue,
  className,
}: ValuesDiffProps) {
  const diff = (finalValue - initialValue) / initialValue;
  const isDiffNegative = diff < 0;
  const isDiffPositive = diff > 0;
  const shortFormat = numeral(diff).format("0%");
  const longFormat = numeral(diff).format("0[.][000]%");

  return (
    <div className={styles.container}>
      {(isDiffNegative || isDiffPositive) && (
        <SvgTrendLineIcon
          className={classNames(styles.indicator, {
            [styles.green]: isDiffPositive,
            [styles.red]: isDiffNegative,
            [styles.flipped]: isDiffNegative,
          })}
        />
      )}
      <span
        className={classNames(
          styles.text,
          {
            [styles.green]: isDiffPositive,
            [styles.red]: isDiffNegative,
          },
          className
        )}
        title={longFormat}
        data-testid="ValuesDiff_value"
      >
        {shortFormat}
      </span>
    </div>
  );
}
