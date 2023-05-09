import classNames from "classnames";

import styles from "./LocationThumbnail.module.css";

export interface LocationThumbnailProps {
  countryCode: string;
  country: string;
  city: string;
  className?: string;
}

const FLAGS_CDN_URL = "https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/";

export default function LocationThumbnail({
  countryCode,
  country,
  city,
  className,
}: LocationThumbnailProps) {
  const flagUrl = `${FLAGS_CDN_URL}/${countryCode.toLowerCase()}.svg`;

  return (
    <span className={classNames(styles.container, className)}>
      <img className={styles.icon} src={flagUrl} alt={`${country} flag`} />
      {city}, {country}
    </span>
  );
}
