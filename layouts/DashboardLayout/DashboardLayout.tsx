import Image from "next/image";
import Link from "next/link";
import { PropsWithChildren, ReactElement, useState } from "react";

import { NavLink } from "@/components/NavLink/NavLink";
import SvgHomeIcon from "@/icons/SvgHomeIcon";
import SvgCartIcon from "@/icons/SvgCartIcon";
import SvgBarchartIcon from "@/icons/SvgBarchartIcon";
import SvgMapMarkerIcon from "@/icons/SvgMapMarkerIcon";
import SvgDocumentIcon from "@/icons/SvgDocumentIcon";

import styles from "./DashboardLayout.module.scss";
import useResizeObserver from "use-resize-observer";
import classNames from "classnames";

export function DashboardLayout({ children }: PropsWithChildren) {
  const [isMouseOverNav, setIsMouseOverNav] = useState(false);

  const { ref, width = 0 } = useResizeObserver<HTMLDivElement>();
  let layoutClass;
  if (width >= 1440) {
    layoutClass = styles.layoutWide;
  }

  return (
    <div
      ref={ref}
      className={classNames(styles.root, layoutClass, {
        [styles.navHovered]: isMouseOverNav,
      })}
    >
      <nav
        className={classNames(styles.nav)}
        onMouseEnter={() => setIsMouseOverNav(true)}
        onMouseLeave={() => setIsMouseOverNav(false)}
      >
        <Link href="/" className={styles.logo}>
          <Image src="/logo.svg" alt="Logo" height={42} width={42}></Image>
        </Link>

        <div className={styles.navLinks}>
          <NavLink
            icon={<SvgHomeIcon />}
            href="/overview"
            className={styles.navLink}
          >
            <span className={styles.navLinkText}>Overview</span>
          </NavLink>

          <NavLink
            icon={<SvgDocumentIcon />}
            href="/platforms"
            className={styles.navLink}
          >
            <span className={styles.navLinkText}>Platforms</span>
          </NavLink>

          <NavLink
            icon={<SvgMapMarkerIcon />}
            href="/geography"
            className={styles.navLink}
          >
            <span className={styles.navLinkText}>Geography</span>
          </NavLink>

          <NavLink
            icon={<SvgCartIcon />}
            href="/orders"
            className={styles.navLink}
          >
            <span className={styles.navLinkText}>Orders</span>
          </NavLink>

          <NavLink
            icon={<SvgBarchartIcon />}
            href="/analytics"
            className={styles.navLink}
          >
            <span className={styles.navLinkText}>Analytics</span>
          </NavLink>
        </div>
      </nav>
      <main className={classNames(styles.main)}>{children}</main>
    </div>
  );
}

export function getDashboardLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
}
