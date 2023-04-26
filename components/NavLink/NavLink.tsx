import { PropsWithChildren, ReactNode } from "react";
import classNames from "classnames";

import styles from "./NavLink.module.css";
import { ActiveLink } from "../ActiveLink/ActiveLink";

export interface NavLinkProps {
  icon: ReactNode;
  href: string;
  className?: string;
}

export function NavLink({
  icon,
  children,
  href,
  className,
}: PropsWithChildren<NavLinkProps>) {
  return (
    <ActiveLink
      href={href}
      className={classNames(styles.link, className)}
      activeClassName={styles.activeLink}
    >
      <div className={styles.icon}>{icon}</div>
      {children}
    </ActiveLink>
  );
}
