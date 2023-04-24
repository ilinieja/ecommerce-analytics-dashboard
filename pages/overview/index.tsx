import TotalStatsBar from "@/components/TotalStatsBar/TotalStatsBar";

import styles from "./index.module.css";
import BreakdownStatsChart from "@/components/BreakdownStatsChart/BreakdownStatsChart";
import TopPlatformsList from "@/components/TopPlatformsList/TopPlatformsList";

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
        <TopPlatformsList />
      </section>
    </>
  );
}
