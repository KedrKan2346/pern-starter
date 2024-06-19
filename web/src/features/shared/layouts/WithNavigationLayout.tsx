import { ReactElement, ReactNode } from "react";
import { Link } from "react-router-dom";

interface WithNavigationLayoutProps {
  children: ReactNode;
}

export function WithNavigationLayout({
  children,
}: WithNavigationLayoutProps): ReactElement {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Subjects</Link>
          </li>
          <li>
            <Link to="/add">Add</Link>
          </li>
          <li>
            <Link to="/edit">Edit</Link>
          </li>
        </ul>
      </nav>
      {children}
    </div>
  );
}
