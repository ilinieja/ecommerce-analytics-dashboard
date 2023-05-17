import { PropsWithChildren } from "react";
import classNames from "classnames";
import SvgCircleLoader from "@/icons/SvgDotsLoader";

import styles from "./LoadingOverlay.module.scss";

export interface LoadingOverlayProps {
  className: string;
  isLoadingSuccess: boolean;
}

export default function LoadingOverlay({
  className,
  isLoadingSuccess,
  children,
}: PropsWithChildren<LoadingOverlayProps>) {
  return (
    <div className={classNames(styles.container, className)}>
      {children}
      {!isLoadingSuccess && (
        <div className={styles.loadingOverlay} data-testid="LoadingOverlay_overlay">
          <SvgCircleLoader className={styles.loadingIndicator} />
        </div>
      )}
    </div>
  );
}
