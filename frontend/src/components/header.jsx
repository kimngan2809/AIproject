"use client";
import React from 'react';
import { usePathname } from 'next/navigation'; // Use usePathname from next/navigation

const Header = () => {
  const currentPath = usePathname(); // Get the current path

  // Hide the "Log in" button on the login or signup pages
  const shouldShowLoginButton = !(currentPath === '/login' || currentPath === '/signup');

  return (
    <header style={styles.header}>
      <div style={styles.logo}>
        <a href="/" style={styles.signCheck}>
          Sign-Check
        </a>
      </div>
      <nav style={styles.nav}>
        <a href="/" style={styles.navLink}>
          Home
        </a>
        <a href="/about" style={styles.navLink}>
          About us
        </a>
      </nav>
      <div style={styles.loginButtonWrapper}>

        {shouldShowLoginButton && (
          <button style={styles.loginButton}>
            <a href="/login"> Log in</a></button>
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
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: '10px 20px',
    borderBottom: '1px solid #FFFFFF',
    backgroundColor: '#FFFFFF',
    zIndex: 1000, // Ensure header stays on top of other content
  },
  logo: {
    paddingLeft: '125px',
  },
  signCheck: {
    fontWeight: '900',
    color: '#E49F15', // Yellow color for Sign-Check
    fontSize: '30px',
    textDecoration: 'none',
  },
  nav: {
    display: 'flex',
    gap: '250px',
    paddingLeft: '250px',
  },
  navLink: {
    fontWeight: 'bold',
    color: '#5A7F58', // Green color for Home and About us
    fontSize: '25px',
    textDecoration: 'none',
  },
  loginButtonWrapper: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
    paddingRight: '50px',
  },
  loginButton: {
    border: '2px solid #5A7F58',
    borderRadius: '20px',
    padding: '5px 15px',
    background: 'transparent',
    color: '#5A7F58',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default Header;
