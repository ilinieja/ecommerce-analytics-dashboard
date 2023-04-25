import TotalStatsBar from "@/components/TotalStatsBar/TotalStatsBar";
import { useState } from "react";
import classNames from "classnames";

import styles from "./index.module.css";
import BreakdownStatsChart from "@/components/BreakdownStatsChart/BreakdownStatsChart";
import TopPlatformsList from "@/components/TopPlatformsList/TopPlatformsList";
import { TopLocationsChart } from "@/components/TopLocationsChart/TopLocationsChart";
import { OrdersTable } from "@/components/OrdersTable/OrdersTable";

export default function Overview() {
  const [isContentScrolled, setIsContentScrolled] = useState(false);
  const handleContentScroll = (event: React.UIEvent<HTMLElement>) => {
    setIsContentScrolled(event.currentTarget.scrollTop !== 0);
  };

  return (
    <>
      <header
        className={classNames(styles.pageHeader, {
          [styles.scrolled]: isContentScrolled,
        })}
      >
        <h1 className={styles.pageTitle}>Overview</h1>
      </header>
      <section className={styles.pageContent} onScroll={handleContentScroll}>
        <TotalStatsBar />
        <BreakdownStatsChart />
        <div className={styles.section}>
          <TopPlatformsList className={styles.sectionItem} />
          <TopLocationsChart className={styles.sectionItem} />
        </div>
        <OrdersTable />
      </section>
    </>
  );
}
