"use client";
import { callAPI } from "@/utils/api-caller";
import Link from "next/link";
import { useEffect, useState } from "react";

const Header = () => {
    const [categories, setCategories] = useState([]);
    const [cartCount, setCartCount] = useState(0);

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
                                        src="https://s3-alpha-sig.figma.com/img/a790/e615/0e4e0458a7acc3af053c78bf22623111?Expires=1719187200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=V6TkS3TyHNRju4UBwxlV5vjuOHybFhLcNXFW3KplEdcCS~TWTvshqZqrFEkfQGNaAEVSxGp-e~QZTDBSsaW7tskeD~NRlj3KNdy2bQIOq6HuZ4K11aEaOaggPgq1JpUZSFsipX3ghpw~BD0JR48xZtHywFr2kau0uZVh8QFPhV1G52AC8HWm--0CdrPPNeXI6bTAi38GxBqXR4zFjrRkSsdLCNohF4EXv26FEUBJa~3rSh8ihEPAF5B9FCIhvnKAC7uzaLl1qkbTWcxp8KaA81gu07NDdJ1H9B5tUL9o7TsVkx4f9cNn1nzvN3fsMR4PCCWuYssmz3~k9ylnPZCRbA__"
                                        width="30px"
                                        height="30px"
                                        alt="Account"
                                    />
                                </div>
                            </Link>
                            <Link href="/search">
                                <div className="search" style={iconStyle}>
                                    <img
                                        src="https://s3-alpha-sig.figma.com/img/27f8/138c/a0adcffc3c068ec0d20518b59b1c7507?Expires=1719187200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=LLFrsO-BK5Q6Yo-SopF~yoEtcz~6UZgtu0t7h3k0mt-tszW-av8hxlIiwLhT3VkSV6vXfKdXF7sgrehUXxPxOhpj5lnjuZrc5ORLewhupOOyOoVhHfktO6d-X-A7XzwvwYFsTLEi6qIgXlvPMJODF5kEhRkYDPRGc~AcjKJlPWFBzpnWxNU6IW62ncls-3jDHOKlvyxpAtGanhgYKtheDX6ZzpoTNT6DYZrL~kjj7dkVHXKlJxqeC7Ql3Eyc-WJ0InnX77S67gFKFYyIX2SMsNlgUO3tjz0eIiuKZxpe7xos7d1~hvlP9B9gwZbaNKR7MrvMFZMuIzGRM7r~-9V3-g__"
                                        width="30px"
                                        height="30px"
                                        alt="Search"
                                    />
                                </div>
                            </Link>
                            <Link href="/cart">
                                <div className="hd-cart CartOpen" style={iconStyle}>
                                    <div className="hd-cart-inner">
                                        <img
                                            src="https://s3-alpha-sig.figma.com/img/9fbf/8808/ba9395f07ead590ea5eab5ab2834306b?Expires=1719187200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=kKClrGDkNYbWV-69cbn1uDVIIEz4jE-VfTZRHGh3yc7uGsa5KJAoILrVbVW83El1by9eyhScy7H5R-dwpSTMGvNg3TVNSm3m8x3Nx-EqHlJmyeDozAQz-jafDq4xHeEcPUdxXTnydZK1XJ6eVSQUj19vBuvJYwIka5wquau2tn1fFZbdz~ozswD9ySDskk0we6T2yqwlWb8z9Muj1P3Lt8jPIs2vUOWhkt2gY0XznAjBy0jr7QpEbKZEPz~rTxrKkFWTwh5bYX7sh5dgnR1nZoBXb1LB9wNaTFHy-J4prlHnDt0N~LCYd8jN9PKRAI2Skq1ArCTiQDQ1O2kh6RUd8hNsuYRC8259CPvHcukp~OPlyJesFdN5uN0lg8v1UuxzGTvBx3lsEg3hRmHUlhtCQKY7PUl~dCU-w__"
                                            width="30px"
                                            height="30px"
                                            alt="Cart"
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
                    <div className="menu" style={navStyle}>
                        <div className="nav-item" style={navItemStyle}>
                            <Link href="/women">
                                <a
                                    style={linkStyle}
                                    onMouseOver={(e) => {
                                        e.currentTarget.style.color = hoverStyle.color;
                                    }}
                                    onMouseOut={(e) => {
                                        e.currentTarget.style.color = linkStyle.color;
                                    }}
                                >
                                    Women's
                                </a>
                            </Link>
                        </div>
                        <div className="nav-item" style={navItemStyle}>
                            <Link href="/men">
                                <a
                                    style={linkStyle}
                                    onMouseOver={(e) => {
                                        e.currentTarget.style.color = hoverStyle.color;
                                    }}
                                    onMouseOut={(e) => {
                                        e.currentTarget.style.color = linkStyle.color;
                                    }}
                                >
                                    Men's
                                </a>
                            </Link>
                        </div>
                        <div className="nav-item" style={navItemStyle}>
                            <Link href="/gifting">
                                <a
                                    style={linkStyle}
                                    onMouseOver={(e) => {
                                        e.currentTarget.style.color = hoverStyle.color;
                                    }}
                                    onMouseOut={(e) => {
                                        e.currentTarget.style.color = linkStyle.color;
                                    }}
                                >
                                    Gifting
                                </a>
                            </Link>
                        </div>
                        <div className="nav-item" style={navItemStyle}>
                            <Link href="/brand">
                                <a
                                    style={linkStyle}
                                    onMouseOver={(e) => {
                                        e.currentTarget.style.color = hoverStyle.color;
                                    }}
                                    onMouseOut={(e) => {
                                        e.currentTarget.style.color = linkStyle.color;
                                    }}
                                >
                                    Brand
                                </a>
                            </Link>
                        </div>
                        <div className="nav-item" style={navItemStyle}>
                            <Link href="/custom">
                                <a
                                    style={linkStyle}
                                    onMouseOver={(e) => {
                                        e.currentTarget.style.color = hoverStyle.color;
                                    }}
                                    onMouseOut={(e) => {
                                        e.currentTarget.style.color = linkStyle.color;
                                    }}
                                >
                                    Custom
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
