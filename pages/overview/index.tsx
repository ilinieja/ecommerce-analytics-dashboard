import { useState } from "react";
import classNames from "classnames";
import useResizeObserver from "use-resize-observer";

import TotalStatsBar from "@/components/TotalStatsBar/TotalStatsBar";
import BreakdownStatsChart from "@/components/BreakdownStatsChart/BreakdownStatsChart";
import TopPlatformsList from "@/components/TopPlatformsList/TopPlatformsList";
import { TopLocationsChart } from "@/components/TopLocationsChart/TopLocationsChart";
import { OrdersTable } from "@/components/OrdersTable/OrdersTable";

import styles from "./index.module.scss";

export default function Overview() {
  const [isContentScrolled, setIsContentScrolled] = useState(false);
  const handleContentScroll = (event: React.UIEvent<HTMLElement>) => {
    setIsContentScrolled(event.currentTarget.scrollTop !== 0);
  };

  const { ref, width = 0 } = useResizeObserver<HTMLDivElement>();
  let layoutClass;
  if (width >= 820) {
    layoutClass = styles.layoutMedium;
  }
  if (width >= 1200) {
    layoutClass = styles.layoutWide;
  }

  return (
    <div ref={ref} className={classNames(styles.container, layoutClass)}>
      <header
        className={classNames(styles.pageHeader, {
          [styles.scrolled]: isContentScrolled,
        })}
      >
        <h1 className={styles.pageTitle}>Overview</h1>
      </header>
      <section className={styles.pageContent} onScroll={handleContentScroll}>
        <div className={styles.grid}>
          <div className={classNames(styles.main, styles.grow)}>
            <TotalStatsBar className={styles.shrinkable} />
            <BreakdownStatsChart className={styles.shrinkable} />
          </div>
          <div className={styles.cards}>
            <TopPlatformsList />
            <TopLocationsChart />
          </div>
          <OrdersTable
            className={classNames(styles.table, styles.shrinkable)}
          />
        </div>
      </section>
    </div>
  );
}
