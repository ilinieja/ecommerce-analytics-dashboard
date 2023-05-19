import SvgWorkInprogressIcon from "@/icons/SvgWorkInProgressIcon";
import classNames from "classnames";

import styles from "./WorkInProgress.module.scss";

export interface WorkInProgressProps {
    className?: string;
}

export function WorkInProgress({className}: WorkInProgressProps) {
  return (
    <div className={classNames(styles.container, className)}>
      <SvgWorkInprogressIcon className={styles.illustration}></SvgWorkInprogressIcon>
      <h2 className={styles.title}>Under construction</h2>
      <span className={styles.subtitle}>This functionality is not available yet</span>
    </div>
  );
}
