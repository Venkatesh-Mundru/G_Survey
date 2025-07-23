/* 
This component displays the navigation bar at the top of your app. It includes:
A logo/title that links to the home page
A button that either shows "Admin Login" or "Logout", depending on the current page and login state
*/

/* 
useNavigate: A React Router hook that lets you programmatically change pages (like redirecting to /login or /).
useLocation: A hook that gives you access to the current URL path (like /login or /admin).
*/
import { useNavigate, useLocation } from 'react-router-dom';
import './navbar.css';

function Navbar({ showLogout }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="navbar">
      <div className="navbar-logo" onClick={() => navigate('/')}>
        Community Survey
      </div>
      <div className="navbar-actions">
        {showLogout ? (
          <button onClick={handleLogout}>Logout</button>
        ) : location.pathname === '/login' ? null : (
          <button onClick={() => navigate('/login')}>Admin Login</button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
