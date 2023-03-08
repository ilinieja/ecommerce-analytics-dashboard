import Image from "next/image";
import Link from "next/link";
import { PropsWithChildren, ReactElement } from "react";

import styles from "./DashboardLayout.module.css";
import { NavLink } from "@/components/NavLink/NavLink";

import SvgHomeIcon from "@/icons/SvgHomeIcon";
import SvgCartIcon from "@/icons/SvgCartIcon";
import SvgBarchartIcon from "@/icons/SvgBarchartIcon";
import SvgMapMarkerIcon from "@/icons/SvgMapMarkerIcon";
import SvgDocumentIcon from "@/icons/SvgDocumentIcon";

export function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <div className={styles.root}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.logo}>
          <Image src="/logo.svg" alt="Logo" height={42} width={42}></Image>
        </Link>

        <div className={styles.navLinks}>
          <NavLink
            icon={<SvgHomeIcon />}
            label="Overview"
            href="/overview"
            className={styles.navLink}
          />

          <NavLink
            icon={<SvgDocumentIcon />}
            label="Platforms"
            href="/platforms"
            className={styles.navLink}
          />

          <NavLink
            icon={<SvgMapMarkerIcon />}
            label="Geography"
            href="/geography"
            className={styles.navLink}
          />

          <NavLink
            icon={<SvgCartIcon />}
            label="Orders"
            href="/orders"
            className={styles.navLink}
          />

          <NavLink
            icon={<SvgBarchartIcon />}
            label="Analytics"
            href="/analytics"
            className={styles.navLink}
          />
        </div>
      </nav>
      <main className={styles.main}>{children}</main>
    </div>
  );
}

export function getDashboardLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
}
