import { ReactElement, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import styles from './with-navigation-layout.module.css';

interface WithNavigationLayoutProps {
  children: ReactNode;
}

export function WithNavigationLayout({ children }: WithNavigationLayoutProps): ReactElement {
  return (
    <div>
      <nav className={styles.menuBar}>
        <ul className={styles.navMenu}>
          <li>
            <Link className={styles.menuLink} to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className={styles.menuLink} to="/add">
              Add
            </Link>
          </li>
          <li>
            <Link className={styles.menuLink} to="/edit">
              Edit
            </Link>
          </li>
        </ul>
      </nav>
      {children}
    </div>
  );
}
