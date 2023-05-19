import classNames from "classnames";
import useResizeObserver from "use-resize-observer";

import TotalStatsBar from "@/components/TotalStatsBar/TotalStatsBar";
import BreakdownStatsChart from "@/components/BreakdownStatsChart/BreakdownStatsChart";
import TopPlatformsList from "@/components/TopPlatformsList/TopPlatformsList";
import { TopLocationsChart } from "@/components/TopLocationsChart/TopLocationsChart";
import { OrdersTable } from "@/components/OrdersTable/OrdersTable";

import styles from "./index.module.scss";

export default function Overview() {
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
      <header className={classNames(styles.pageHeader)}>
        <h1 className={styles.pageTitle}>Overview</h1>
      </header>
      <section className={styles.pageContent}>
        <div className={styles.grid}>
          <div className={styles.main}>
            <TotalStatsBar className={styles.shrinkable} />
            <BreakdownStatsChart
              className={classNames(styles.shrinkable, styles.autoHeight)}
            />
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
