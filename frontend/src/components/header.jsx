"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { getUser, clearAuthData } from "@/utils/helper";
import Image from "next/image";
import img4 from "@/img/Layer_4.png"; // Import the account image

const Header = () => {
  const currentPath = usePathname(); // Get the current path
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const userData = getUser();
    if (userData) {
      setIsAuthenticated(true);
    }
  }, []);

  // Hide the "Log in" button on the login or signup pages
  const shouldShowLoginButton = !(
    currentPath === "/login" || currentPath === "/signup"
  );

  const handleLogout = () => {
    clearAuthData();
    setIsAuthenticated(false); // Update state after logging out
    window.location.href = "/"; // Use window.location for navigation
  };

  // Adjust isActive to make Home bold on both "/" and "/sign_check"
  const isActive = (path) => {
    return path === '/' ? (currentPath === '/' || currentPath === '/sign_check') : currentPath === path;
  };

  return (
    <header style={styles.header}>
      <div style={styles.logo}>
        <a href="/" style={styles.signCheck}>
          Sign-Check
        </a>
      </div>
      <nav style={styles.nav}>
        <a href="/" style={isActive('/') ? styles.activeNavLink : styles.navLink}>
          Home
        </a>
        <a href="/about" style={isActive('/about') ? styles.activeNavLink : styles.navLink}>
          About us
        </a>
        {isAuthenticated && (
          <a href="/add-customer" style={isActive('/add-customer') ? styles.activeNavLink : styles.navLink}>
            Add Customer
          </a>
        )}
        {/* {isAuthenticated && (
          <a href="/sign_check" style={isActive('/sign_check') ? styles.activeNavLink : styles.navLink}>
            Sign Check
          </a>
        )} */}
      </nav>
      <div style={styles.loginButtonWrapper}>
        {isAuthenticated && currentPath !== "/account" && (
          <>
            <a href="/account" style={styles.accountIcon}>
              <Image src={img4} width={32} height={32} layout="intrinsic" alt="Account" style={styles.accountImage} />
            </a>
            <button style={styles.loginButton} onClick={handleLogout}>
              Log out
            </button>
          </>
        )}
        {shouldShowLoginButton && !isAuthenticated && (
          <button style={styles.loginButton}>
            <a href="/login">Log in</a>
          </button>
        )}
      </div>
    </header>
  );
};

const styles = {
  header: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    borderBottom: "1px solid #FFFFFF",
    backgroundColor: "#FFFFFF",
    zIndex: 1000,
  },
  logo: {
    paddingLeft: "20px",
  },
  signCheck: {
    fontWeight: "900",
    color: "#E49F15",
    fontSize: "24px",
    textDecoration: "none",
  },
  nav: {
    display: "flex",
    gap: "50px",
    paddingLeft: "50px",
  },
  navLink: {
    fontWeight: "normal",
    color: "#5A7F58",
    fontSize: "20px",
    textDecoration: "none",
  },
  activeNavLink: {
    fontWeight: "900",
    color: "#5A7F58",
    fontSize: "20px",
    textDecoration: "none",
  },
  loginButtonWrapper: {
    display: "flex",
    alignItems: "center",
    paddingRight: "20px",
  },
  accountIcon: {
    marginRight: "10px",
  },
  accountImage: {
    borderRadius: "50%",
    cursor: "pointer",
  },
  loginButton: {
    border: "2px solid #5A7F58",
    borderRadius: "20px",
    padding: "5px 15px",
    background: "transparent",
    color: "#5A7F58",
    fontSize: "16px",
    cursor: "pointer",
    marginLeft: "10px",
  },
};

export default Header;
