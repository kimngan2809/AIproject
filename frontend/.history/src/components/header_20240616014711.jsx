"use client";

import { callAPI } from "@/utils/api-caller";
import Link from "next/link";
import { useEffect, useState } from "react";
import useRouter from "@/hooks/useRouter";  // Đổi import sang custom hook

const Header = () => {
    const [categories, setCategories] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const router = useRouter();
    const [searchVisible, setSearchVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchData();
        setCartCount(3); // Example: Hardcoded number of items in the cart
    }, []);

    const fetchData = async () => {
        try {
            const res = await callAPI("/categories", "GET");
            setCategories(res.data.data);
            console.log(res.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim() !== '' && router) {
            router.push(`/search?query=${searchQuery}`);
        }
    };

    // Inline styles
    const navStyle = {
        display: 'flex',
        backgroundColor: '#015109',
        justifyContent: 'space-between',
        padding: '5px',
        paddingLeft: '300px',
        paddingRight: '300px',
    };

    const linkStyle = {
        padding: '10px 10px',
        textDecoration: 'none',
        color: '#FFF9E2',
        transition: 'color 0.3s',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
    };

    const hoverStyle = {
        color: '#FFE478',
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
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '30px',
        height: '30px',
    };

    const cartNumberStyle = {
        position: 'absolute',
        top: '-10px',
        right: '-10px',
        backgroundColor: 'red',
        color: 'white',
        borderRadius: '50%',
        padding: '2px 6px',
        fontSize: '12px',
    };

    const searchContainerStyle = {
        position: 'absolute',
        top: '50px',
        right: '20px',
        background: 'white',
        padding: '10px',
        borderRadius: '25px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        display: searchVisible ? 'block' : 'none'
    };

    const searchFieldStyle = {
        padding: '10px',
        fontSize: '16px',
        border: '1px solid #ccc',
        borderRadius: '25px',
        outline: 'none',
        transition: 'border-color 0.3s',
        width: '200px',
        position: 'relative'
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
        pointerEvents: 'none'
    };

    const searchLabelFocusStyle = {
        top: '-10px',
        fontSize: '12px',
        color: '#015109'
    };

    const searchButtonStyle = {
        position: 'absolute',
        top: '50%',
        right: '10px',
        transform: 'translateY(-50%)',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        outline: 'none'
    };

    return (
        <header style={{ background: '#FFF9E2' }}>
            <nav style={{ background: '#FFF9E2' }}>
                <div className="header" style={{ display: 'block', background: '#FFF9E2' }}>
                    <div className="first-line" style={{ display: 'flex' }}>
                        <div className="fleft" style={{ display: 'flex', justifyContent: 'center', paddingLeft: '600px' }}>
                            <Link href="/">
                                <img
                                    width="300px"
                                    height="150px"
                                    src="https://s3-alpha-sig.figma.com/img/73ca/704c/09052c70ce0d6357e5a13b02cf8c8d78?Expires=1717977600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=GYcd5-F5S0iARqshzQvoBJRcZPgBF34YpqkPygFPaNLz0ZkaYv5ejcLN3ueIckNzcYePEcTbpwN62qpiiNEkvOps4lsG8OPPvp437HzyC8mSkiLc31Bm14tJ09fVLt3W0ygZIaYnGVjL7GG2mca6xgfKcDxI68EHgXfKvV7hh9xq043mWrRuaw2wbxC8ij9GLiwbmhBdLG~qowivbWHZQdE14cK3nwo6zMJ2UBK~QWAZ3KjGUSR70sw~JomRpIxIDlFIOg0NUHy564vJloblFesU1bi4rq7erfKVZ2OxcS9IU9q2e906RWO1u8sHG~6SU9m7hIWcWn3axHVWMIAjPA__"
                                    alt="Logo"
                                    decoding="async"
                                />
                            </Link>
                        </div>
                        <div className="fright" style={{ display: 'flex', justifyContent: 'flex-end', gap: '15px', alignItems: 'center', paddingLeft: '350px' }}>
                            <Link href="/account">
                                <div className="account" style={iconStyle}>
                                    <img
                                        src="https://s3-alpha-sig.figma.com/img/a790/e615/0e4e0458a7acc3af053c6a9233d54df5?Expires=1719187200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=XhhFJ5TD-3ZsEXWPlZHVU4tnWD12Pj~0T1KriD7FlDu1DKCWnGBMsE6LBNJYTwzNCtMN0n7OIO20RD9mr03aiU1HlHVPPyGV7H4nm-uPt9Iygm2iXT2HY1bXtvPsJpqgyEYdA45LvvDDaQ7hXLXWfVFG8L7MUnRzSK15ph9zVcSGu3Rp6MDsZ-NI8efPqAo5gG36it7Di2GF5C1PLmu5n1oF2FeqlRTvZHYmBFXhBWbzwQNzBx80xF1qiTP80bPfY~hOsGfVE~ZtKl3zHapmfPmySC8eeiD~Tk45EXrH-gdAiRmY~CDmXxhaP5d3~tcrbtsKBfVv4Yq5~fGRlz-P7A__"
                                        width="30px"
                                        height="30px"
                                        alt="Account"
                                        onClick={() => setSearchVisible(false)}
                                    />
                                </div>
                            </Link>
                            <div className="cart" style={iconStyle}>
                                <img
                                    src="https://s3-alpha-sig.figma.com/img/0fe4/1814/85be5c02440fa6edcf312531b707a918?Expires=1719187200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=TxenBzxovUDSpI~Y4wRbMk6OmzghH7pu0vS8lcm2DMycGr6U4BzqnWZMRzjQNCsFsHENc-BXpqW9POwnz9d69yAKBRF8fdVx5fKjeATAmjtFMz2RP22a4W5~jPHllkPpjzQ3Yo2emYDsFdcdAXEc-qxg7bG2biXfL2LGxg5H4ov7uWNVRApB1ftb6jb~7H5p2gj~P9omH1GJvs7D-SwNU8HBV5BzOAGHflAWTUKvx0R8G1UlCB5M6nYJQTeBjytsFY8IpAFOZqJ6jUnhs4nMECpEwox3LMcSY9mMYWCV4fPxZhN5de4yHHqfBMXCmO9nFr4ys4nkxqWUwPs60tWrfw__"
                                    width="30px"
                                    height="30px"
                                    alt="Cart"
                                    onClick={() => setSearchVisible(false)}
                                />
                                {cartCount > 0 && (
                                    <span className="cart-count" style={cartNumberStyle}>{cartCount}</span>
                                )}
                            </div>
                            <div className="search" style={iconStyle} onClick={() => setSearchVisible(!searchVisible)}>
                                <img
                                    src="https://s3-alpha-sig.figma.com/img/ff5f/1b61/1f009c663b333515289a6de631758b41?Expires=1719187200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=AfhuC0L~T17j9o5A7Yz-PGSJ3-r2vE46-h29yck1zTgfJdMyyELz8cjcK~77uNe81HT~cuCVu1EC-DZHpMLmGvvs1QjyXaEPoTR9jJ-nxrT6mSaBDU~yCw9~r8itPsnGhbOqpxyJWx-Q78BOSYf79n1hRHx0vmSyzbdN4Z9nI7FsVWozljwCCYdLbG0qF7XPIS~XBvUnWdzQWw19CydWcsT-W4RvcPnoFiKYVCNzC4LyVHYIk81kZ4Do5xMImDPPDfeT8B3OlkS0S40M5CE-O65hbRwp~vpg2tb0y6zztfXwxBCKrv8SGOciBG5DTo1zsd5MjE8ThNK0xBxGReA9kA__"
                                    width="30px"
                                    height="30px"
                                    alt="Search"
                                />
                            </div>
                        </div>
                    </div>
                    {searchVisible && (
                        <div className="search-container" style={searchContainerStyle}>
                            <form onSubmit={handleSearch}>
                                <div style={{ position: 'relative' }}>
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        style={{ ...searchFieldStyle, paddingLeft: searchQuery ? '10px' : '35px' }}
                                    />
                                    {!searchQuery && (
                                        <label style={{ ...searchLabelStyle, ...(searchVisible && searchLabelFocusStyle) }}>Tìm kiếm</label>
                                    )}
                                    <button type="submit" style={searchButtonStyle}>
                                        <img
                                            src="https://s3-alpha-sig.figma.com/img/ff5f/1b61/1f009c663b333515289a6de631758b41?Expires=1719187200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=AfhuC0L~T17j9o5A7Yz-PGSJ3-r2vE46-h29yck1zTgfJdMyyELz8cjcK~77uNe81HT~cuCVu1EC-DZHpMLmGvvs1QjyXaEPoTR9jJ-nxrT6mSaBDU~yCw9~r8itPsnGhbOqpxyJWx-Q78BOSYf79n1hRHx0vmSyzbdN4Z9nI7FsVWozljwCCYdLbG0qF7XPIS~XBvUnWdzQWw19CydWcsT-W4RvcPnoFiKYVCNzC4LyVHYIk81kZ4Do5xMImDPPDfeT8B3OlkS0S40M5CE-O65hbRwp~vpg2tb0y6zztfXwxBCKrv8SGOciBG5DTo1zsd5MjE8ThNK0xBxGReA9kA__"
                                            width="20px"
                                            height="20px"
                                            alt="Search"
                                        />
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
                <ul className="nav" style={navStyle}>
                    {categories.map((category) => (
                        <li key={category.id} className="nav-item" style={navItemStyle}>
                            <Link href={`/categories/${category.id}`}>
                                <a style={linkStyle}>{category.attributes.name}</a>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
