import classNames from "classnames";
import styles from "./Thumbnail.module.css";

export interface ThumbnailProps {
  title: string;
  subtitle: string;
  imageUrl?: string;
  className?: string;
}

export function Thumbnail({
  title,
  subtitle,
  imageUrl,
  className,
}: ThumbnailProps) {
  return (
    <div className={classNames(styles.row, className)}>
      <div className={styles.imageContainer}>
        <div className={styles.imagePlaceholder}></div>
        {imageUrl && <img className={styles.image} src={imageUrl} />}
      </div>
      <div className={styles.column}>
        <span className={styles.title}>{title}</span>
        <span className={styles.subtitle}>{subtitle}</span>
      </div>
    </div>
  );
}
