"use client";
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation'; // Use usePathname from next/navigation
import { getUser, isLogined , clearAuthData} from '@/utils/helper';


const Header = ({  }) => {
  const currentPath = usePathname(); // Get the current path
  
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    useEffect(() => {
      const userData = getUser();
      if (userData) {
          setIsAuthenticated(true);
      }
  }, []);

  // Hide the "Log in" button on the login or signup pages
  const shouldShowLoginButton = !(currentPath === '/login' || currentPath === '/signup');
  const handleLogout = () => {
    clearAuthData();
    setIsAuthenticated(false); // Update state after logging out
  };
  const isActive = (path) => currentPath === path;

  return (
    <header style={styles.header}>
      <div style={styles.logo}>
        <a href="/" style={styles.signCheck}>
          Sign-Check
        </a>
      </div>
      <nav style={styles.nav}>
        <a href="/" style={isActive('/admin/dashboard') ? styles.activeNavLink : styles.navLink}>
          Dashboard
        </a>
        <a href="/about" style={isActive('/admin/database') ? styles.activeNavLink : styles.navLink}>
          Database
        </a>
      </nav>
      <div style={styles.loginButtonWrapper}>
        {shouldShowLoginButton && !isAuthenticated && ( // Show log in button only when not authenticated
          <button style={styles.loginButton}>
            <a href="/login">Log in</a>
          </button>
        )}
        {isAuthenticated && ( // Show log out button when authenticated
          <button style={styles.loginButton} onClick={handleLogout}>
            Log out
          </button>
        )}
      </div>
    </header>
  );
};

const styles = {
  header: {
    position: 'fixed', // Make header fixed
    top: 0,
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'space-between', // Evenly distribute space
    alignItems: 'center',
    padding: '10px 20px',
    borderBottom: '1px solid #FFFFFF',
    backgroundColor: '#FFFFFF',
    zIndex: 1000, // Ensure header stays on top of other content
  },
  logo: {
    paddingLeft: '20px', // Adjusted padding
  },
  signCheck: {
    fontWeight: '900',
    color: '#E49F15', // Yellow color for Sign-Check
    fontSize: '24px', // Reduced font size
    textDecoration: 'none',
  },
  nav: {
    display: 'flex',
    gap: '50px', // Equal spacing between links
    paddingLeft: '50px', // Adjusted padding for nav
  },
  navLink: {
    fontWeight: 'normal', // Normal weight for inactive links
    color: '#5A7F58', // Green color for Home and About us
    fontSize: '20px', // Reduced font size
    textDecoration: 'none',
  },
  activeNavLink: {
    fontWeight: '900', // Bold weight for active link
    color: '#5A7F58', // Same color for consistency
    fontSize: '20px', // Same size for consistency
    textDecoration: 'none',
  },
  loginButtonWrapper: {
    display: 'flex',
    alignItems: 'center', // Center the login/logout button vertically
    paddingRight: '20px', // Adjusted padding
  },
  loginButton: {
    border: '2px solid #5A7F58',
    borderRadius: '20px',
    padding: '5px 15px',
    background: 'transparent',
    color: '#5A7F58',
    fontSize: '16px',
    cursor: 'pointer',
    marginLeft: '10px',
  },
};

export default Header;
