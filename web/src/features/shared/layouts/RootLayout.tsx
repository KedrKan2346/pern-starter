import { ReactElement, ReactNode } from "react";
import styles from "./root-layout.module.css";

interface RootLayoutProps {
  children: ReactNode;
}

export function RootLayout({ children }: RootLayoutProps): ReactElement {
  return <div className={styles.rootContent}>{children}</div>;
}
