import { useDispatch, useSelector } from "react-redux";
import styles from "./index.module.css";
import { fetchTotalStats } from "@/store/totalStats/totalStats.slice";
import { useEffect } from "react";
import { AppDispatch } from "@/store/store";
import { totalStatsSelectors } from "@/store/totalStats/totalStats.selectors";
import { subYears } from "date-fns";

export default function Overview() {
  const dispatch = useDispatch<AppDispatch>();
  const isLoadingIdle = useSelector(totalStatsSelectors.getIsLoadingIdle);

  useEffect(() => {
    if (isLoadingIdle) {
      // TODO: Use dates from control when it's implemented.
      const endDate = new Date();
      const startDate = subYears(endDate, 1);

      dispatch(fetchTotalStats({ startDate, endDate }));
    }
  }, [isLoadingIdle, dispatch]);

  return (
    <>
      <header className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Overview</h1>
      </header>
      <section className={styles.pageContent}></section>
    </>
  );
}
