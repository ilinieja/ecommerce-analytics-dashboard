import classNames from "classnames";

import { LeadSource } from "@/api/models/order.model";
import SvgQuestionIcon from "@/icons/SvgQuestionIcon";
import SvgEmailIcon from "@/icons/SvgEmailIcon";
import SvgInstagramIcon from "@/icons/SvgInstagramIcon";
import SvgFacebookIcon from "@/icons/SvgFacebookIcon";
import SvgGoogleIcon from "@/icons/SvgGoogleIcon";

import styles from "./LeadSourceThumbnail.module.css";

export interface LeadSourceThumbnailProps {
  leadSource: LeadSource;
  className?: string;
}

const LEAD_SOURCE_ICONS = {
  [LeadSource.Email]: <SvgEmailIcon className={styles.icon} />,
  [LeadSource.Instagram]: <SvgInstagramIcon className={styles.icon} />,
  [LeadSource.Facebook]: <SvgFacebookIcon className={styles.icon} />,
  [LeadSource.GoogleAds]: <SvgGoogleIcon className={styles.icon} />,
};

function getLeadSourceIcon(leadSource: LeadSource) {
  return (
    LEAD_SOURCE_ICONS[leadSource] ?? <SvgQuestionIcon className={styles.icon} />
  );
}

export default function LeadSourceThumbnail({
  leadSource,
  className,
}: LeadSourceThumbnailProps) {
  return (
    <span className={classNames(className, styles.row)}>
      {getLeadSourceIcon(leadSource)}
      <span className={styles.text}>{leadSource}</span>
    </span>
  );
}
