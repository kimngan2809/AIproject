import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { callAPI } from '@/utils/api-caller';
import Image from 'next/image';

const Header = () => {
  const [categories, setCategories] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchVisible, setSearchVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchData();
    setCartCount(3); // Example: Hardcoded number of items in the cart
  }, []);

  const fetchData = async () => {
    try {
      const res = await callAPI('/categories', 'GET');
      setCategories(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== '') {
      router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  const navItemStyle = {
    display: 'flex',
    alignItems: 'center',
    height: '50px',
    width: '8%',
    paddingLeft: '10px',
    paddingRight: '10px',
    fontSize: '20px',
    textAlign: 'center',
    fontWeight: 'bold',
    margin: '0 5px',
  };

  const iconStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '30px',
    height: '30px',
    cursor: 'pointer',
  };

  const searchContainerStyle = {
    position: 'absolute',
    top: '50px',
    right: '20px',
    background: 'white',
    padding: '10px',
    borderRadius: '25px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    display: searchVisible ? 'block' : 'none',
    zIndex: 1000, // Ensure it overlays correctly
  };

  const searchFieldStyle = {
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '25px',
    outline: 'none',
    transition: 'border-color 0.3s',
    width: '200px',
  };

  const searchLabelStyle = {
    position: 'absolute',
    top: '50%',
    left: '15px',
    transform: 'translateY(-50%)',
    background: 'white',
    padding: '0 5px',
    transition: 'all 0.3s',
    color: '#ccc',
    pointerEvents: 'none',
  };

  const searchLabelFocusStyle = {
    top: '-10px',
    fontSize: '12px',
    color: '#015109',
  };

  const searchButtonStyle = {
    position: 'absolute',
    top: '50%',
    right: '10px',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    outline: 'none',
  };

  return (
    <header style={{ background: '#FFF9E2' }}>
      <nav style={{ background: '#FFF9E2' }}>
        <div className="header" style={{ display: 'block', background: '#FFF9E2' }}>
          <div className="first-line" style={{ display: 'flex' }}>
            <div className="fleft" style={{ display: 'flex', justifyContent: 'center', paddingLeft: '600px' }}>
              <Link href="/">
                <Image
                  src="/path/to/your/logo.png"
                  alt="Logo"
                  width={300}
                  height={150}
                  onClick={() => setSearchVisible(false)}
                />
              </Link>
            </div>
            <div className="fright" style={{ display: 'flex', justifyContent: 'flex-end', gap: '15px', alignItems: 'center', paddingLeft: '350px' }}>
              <div className="account" style={iconStyle} onClick={() => setSearchVisible(!searchVisible)}>
                <Image
                  src="/path/to/your/account-icon.png"
                  alt="Account"
                  width={30}
                  height={30}
                />
              </div>
              <div className="search-icon-container" style={iconStyle} onClick={() => setSearchVisible(!searchVisible)}>
                <Image
                  src="/path/to/your/search-icon.png"
                  alt="Search"
                  width={30}
                  height={30}
                  style={{ cursor: 'pointer' }}
                />
                {searchVisible && (
                  <div className="search-container" style={searchContainerStyle}>
                    <form onSubmit={handleSearch} className="relative">
                      <input
                        type="text"
                        id="search-field"
                        className="search-field"
                        placeholder=" "
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={searchFieldStyle}
                      />
                      <label
                        htmlFor="search-field"
                        className="search-label"
                        style={searchQuery ? { ...searchLabelStyle, ...searchLabelFocusStyle } : searchLabelStyle}
                      >
                        Search
                      </label>
                      <button type="submit" className="search-button" style={searchButtonStyle}>
                        <Image
                          src="/path/to/your/search-icon.png"
                          alt="Search"
                          width={20}
                          height={20}
                        />
                      </button>
                    </form>
                  </div>
                )}
              </div>
              <Link href="/cart">
                <div className="hd-cart CartOpen" style={iconStyle}>
                  <div className="hd-cart-inner">
                    <Image
                      src="/path/to/your/cart-icon.png"
                      alt="Cart"
                      width={30}
                      height={30}
                    />
                  </div>
                  {cartCount > 0 && (
                    <span className="hd-cart-number" style={cartNumberStyle}>
                      {cartCount}
                    </span>
                  )}
                </div>
              </Link>
            </div>
          </div>
          <div className="menu" style={{ display: 'flex', backgroundColor: '#015109', justifyContent: 'space-between', padding: '5px', paddingLeft: '300px', paddingRight: '300px' }}>
            {categories.map(category => (
              <div key={category.id} className="nav-item" style={navItemStyle}>
                <Link href={`/${category.slug}`}>
                  <a style={linkStyle}>
                    {category.name}
                  </a>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
