import TotalStatsBar from "@/components/TotalStatsBar/TotalStatsBar";

import styles from "./index.module.css";
import BreakdownStatsChart from "@/components/BreakdownStatsChart/BreakdownStatsChart";
import TopPlatformsList from "@/components/TopPlatformsList/TopPlatformsList";
import { TopLocationsChart } from "@/components/TopLocationsChart/TopLocationsChart";

// TODO: Detect content scroll and add shadow for the header.
export default function Overview() {
  return (
    <>
      <header className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Overview</h1>
      </header>
      <section className={styles.pageContent}>
        <TotalStatsBar />
        <BreakdownStatsChart />
        <div className={styles.section}>
          <TopPlatformsList className={styles.sectionItem} />
          <TopLocationsChart className={styles.sectionItem} />
        </div>
      </section>
    </>
  );
}
