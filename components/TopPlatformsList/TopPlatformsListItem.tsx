import { ReactNode } from "react";

import { TotalPlatformStats } from "@/api/services/platform-stats.service";
import { TotalStats } from "@/api/services/stats.service";
import { Platform } from "@/api/models/order.model";
import { pluralize } from "@/shared/utils";
import SvgAmazonIcon from "@/icons/SvgAmazonIcon";
import SvgAllegroIcon from "@/icons/SvgAllegroIcon";
import SvgEbayIcon from "@/icons/SvgEbayIcon";
import SvgFarfetchIcon from "@/icons/SvgFarfetchIcon";
import SvgQuestionIcon from "@/icons/SvgQuestionIcon";

import styles from "./TopPlatformsListItem.module.css";
import numeral from "numeral";
import classNames from "classnames";

export interface TopPlatformListItemProps {
  stats: TotalPlatformStats;
  totalStats: TotalStats;
  className?: string;
}

const PLATFORM_ICONS: { [platform in Platform]: ReactNode } = {
  [Platform.Amazon]: <SvgAmazonIcon />,
  [Platform.Allegro]: <SvgAllegroIcon />,
  [Platform.Ebay]: <SvgEbayIcon />,
  [Platform.Farfetch]: <SvgFarfetchIcon />,
};

function getPlatformIcon(platform: Platform): ReactNode {
  return PLATFORM_ICONS[platform] || <SvgQuestionIcon />;
}

export default function TopPlatformListItem({
  stats,
  totalStats,
  className,
}: TopPlatformListItemProps) {
  return (
    <div className={classNames(className, styles.row)}>
      <div className={styles.row}>
        <div className={styles.icon}>{getPlatformIcon(stats.platform)}</div>
        <div className={styles.column}>
          <h3 className={styles.title}>{stats.platform}</h3>
          <span className={styles.note}>
            {pluralize(stats.orders, "Order")} | $
            {numeral(stats.averageOrderRevenue).format("0")} Avg revenue
          </span>
        </div>
      </div>
    </div>
  );
}
