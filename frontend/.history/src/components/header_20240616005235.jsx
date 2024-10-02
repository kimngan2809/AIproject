"use client";
import { callAPI } from "@/utils/api-caller";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

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

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim() !== '') {
            router.push(`/search?query=${searchQuery}`);
        }
    };

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

    const searchContainerStyle = {
        position: 'absolute',
        top: '50px',
        right: '20px',
        background: 'white',
        padding: '10px',
        borderRadius: '25px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        display: searchVisible ? 'block' : 'none',
    };

    const searchFieldStyle = {
        padding: '10px',
        fontSize: '16px',
        border: '1px solid #ccc',
        borderRadius: '25px',
        outline: 'none',
        transition: 'border-color 0.3s',
        width: '200px',
        position: 'relative',
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

                            <div className="search-icon-container" style={iconStyle}>
                                <img
                                    src="https://s3-alpha-sig.figma.com/img/27f8/138c/a0adcffc3c068ec0d20518b59b1c7507?Expires=1719187200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=LLFrsO-BK5Q6Yo-SopF~yoEtcz~6UZgtu0t7h3k0mt-tszW-av8hxlIiwLhT3VkSV6vXfKdXF7sgrehUXxPxOhpj5lnjuZrc5ORLewhupOOyOoVhHfktO6d-X-A7XzwvwYofRH6OAXhE7UVZo-lJCLtpP5mr2zYO6iMELABebKKNiZGejzcfvMtRtjp9-GlUOln6es-iPP2NyI8rfDt58-Ik5OogdSYLZlPKLMOZZxWBWPlgP0lLwo7v1zOMv-rVpZmlZwhfMYeyIElW2wi34z5Z-r2Sb3CW56xOWrZK0FPrPqf5yZBvHR2ZkCKjfbKpMMXFYVmjN6PfEZon0fpRzA__"
                                    width="30px"
                                    height="30px"
                                    alt="Search"
                                    onClick={() => setSearchVisible(!searchVisible)}
                                    style={{ cursor: 'pointer' }}
                                />
                                {searchVisible && (
                                    <div style={searchContainerStyle}>
                                        <form onSubmit={handleSearch}>
                                            <input
                                                type="text"
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                placeholder="Search products"
                                                style={searchFieldStyle}
                                            />
                                            <button type="submit" style={searchButtonStyle}>
                                                <img
                                                    src="https://s3-alpha-sig.figma.com/img/0e5a/42a5/7931fbb1fcb2b31864dfd507254b19e4?Expires=1719187200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=b5yzP83K-8Ncfx7BJm-E27zz4gbCfnKnMlSBrcnnZYcycEIrFrtM-KoH3BtbLBBlXt3-6IJW0G7kDWORLyo6gzCdZCkF3SYtdMO2GTI9ehZTjJHoJJKgt5Y1JTxg10u5U~5TQZZyUegZmbw8biZFPliHBU5pCBziZYI1a6NLdfFfl-PBzh28y40iaZ0TGUG~K~qYrG8lcWmbTtTYq2Tvmp1Yvwzjpv2zAZmW21mUzFfdiEdpFIb3zvZ9cqCS9DRyXme9Ot2JHRYB7RQFD7JGrAihTYDTC8gmXvcfzA2MWgu6zxJfXkrC5Fh9-EdfIYqaIweYRiFVq1SFXWTx7Z-KtA__"
                                                    width="20px"
                                                    height="20px"
                                                    alt="Search"
                                                />
                                            </button>
                                        </form>
                                    </div>
                                )}
                            </div>

                            <Link href="/cart">
                                <div className="cart" style={iconStyle}>
                                    <img
                                        src="https://s3-alpha-sig.figma.com/img/6a14/3293/16300b298b9c9293d03809eaa38c60d5?Expires=1719187200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=HHJ0dkFPDMsm9kDSuZ5LgF4MDX0l6MR~1USO8JKThzEvV1KYhPnx3deS3Kwph2kSBH7gbZcC-mBicovcAKJjbAPolzWzMx0oag9L9MhfjfATULCKajcyOORh5M2og52zF7gzLDgKNaMQ4mcFWaB5oYpRYRBfH20rQehmqud9gP15J9Z2uZYGyLx5mlsWWwckdZ17WGrjG5O8sy~c2LEAlkRgOtePxpk8QzWy7UisRpFpytBlvKacXqFZpl1aQGuFFOCB5cv0P6G7i7lI-AOZAAqS4u62V5VHLldgT85GQiq8J2zPqWFXKfcNmgksXQHYsbH8taAeDzW6cEnAB5vkiA__"
                                        width="30px"
                                        height="30px"
                                        alt="Cart"
                                    />
                                    {cartCount > 0 && <div style={cartNumberStyle}>{cartCount}</div>}
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="second-line" style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <ul style={navStyle}>
                            {categories.map((category) => (
                                <li key={category.id} style={navItemStyle}>
                                    <Link
                                        href={`/category/${category.id}`}
                                        style={linkStyle}
                                    >
                                        {category.name}
                                    </Link>
                                </li>
                            ))}
                            <li style={navItemStyle}>
                                <Link href="/bestsellers" style={linkStyle}>Bestsellers</Link>
                            </li>
                            <li style={navItemStyle}>
                                <Link href="/offers" style={linkStyle}>Offers</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
