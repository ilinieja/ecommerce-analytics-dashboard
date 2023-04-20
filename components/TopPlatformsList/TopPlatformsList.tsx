import classNames from "classnames";

import styles from "./TopPlatformsList.module.css";

export interface TopPlatformListProps {
  className?: string;
}

export default function TopPlatformsList({ className }: TopPlatformListProps) {
  return (
    <div className={classNames(className, styles.card)}>
      <div className={styles.header}>
        <h2 className={styles.title}>Top platforms</h2>
      </div>
    </div>
  );
}
