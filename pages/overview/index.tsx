import styles from "./index.module.css";

export default function Overview() {
  return (
    <>
      <header className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Overview</h1>
      </header>
      <section className={styles.pageContent}></section>
    </>
  );
}
