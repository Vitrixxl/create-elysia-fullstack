import { Link } from 'react-router';

export const HomePage = () => {
  return (
    <div>
      Home page
      <Link to='/page-2'>Page 2</Link>
    </div>
  );
};
