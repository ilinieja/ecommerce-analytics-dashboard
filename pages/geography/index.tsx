import { WorkInProgress } from '@/components/WorkInProgress/WorkInProgress';
import styles from './index.module.scss';

export default function Geography() {
  return <div className={styles.container}>
    <WorkInProgress></WorkInProgress>
  </div>;
}
