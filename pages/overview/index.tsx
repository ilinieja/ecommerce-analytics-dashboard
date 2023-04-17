import TotalStatsBar from "@/components/TotalStatsBar/TotalStatsBar";

import styles from "./index.module.css";
import BreakdownStatsChart from "@/components/BreakdownStatsChart/BreakdownStatsChart";

export default function Overview() {
  return (
    <>
      <header className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Overview</h1>
      </header>
      <section className={styles.pageContent}>
        <TotalStatsBar />
        <BreakdownStatsChart />
      </section>
    </>
  );
}
