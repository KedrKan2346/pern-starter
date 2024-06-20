import { Link } from 'react-router-dom';
import { RootLayout } from './RootLayout';

export function NoMatchLayout() {
  return (
    <RootLayout>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
      </nav>
      <div>No Match</div>
    </RootLayout>
  );
}
