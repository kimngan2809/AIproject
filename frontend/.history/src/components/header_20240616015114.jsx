"use client"; // Required for client-side component
import { callAPI } from "@/utils/api-caller"; // Assuming this is your utility to call APIs
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Use next/navigation for Next.js 13+ compatibility

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
        } catch (error) {
            console.log(error);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim() !== '') {
            router.push(`/search?query=${searchQuery}`);
        }
    };

    // Inline styles
    const navStyle = {
        display: 'flex',
        backgroundColor: '#015109',
        justifyContent: 'space-between',
        padding: '5px 300px',
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
        padding: '0 10px',
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
        cursor: 'pointer',
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
                                        src="https://s3-alpha-sig.figma.com/img/a790/e615/0e4e0458a7acc3af053c78bf22623111?Expires=1719187200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=V6TkS3TyHNRju4UBwxlV5vjuOHybFhLcNXFW3KplEdcCS~TWTvshqZqrFEkfQGNaAEVSxGp-e~QZTDBSsaW7tskeD~NRlj3KNdy2bQIOq6HuZ4K11aEaOaggPgq1JpUZSFsipX3ghpw~BD0JR48xZtHywFr2kau0uZVh8QFPhV1G52AC8HWm--0CdrPPNeXI6bTAi38GxBqXR4zFjrRkSsdLCNohF4EXv26FEUBJa~3rSh8ihEPAF5B9FCIhvnKAC7uzaLl1qkbTWcxp8KaA81gu07NDdJ1H9B5tUL9o7TsVkx4f9cNn1nzvN3fsMR5VxwllOeBTV5AqkIhTmQWwOQ__"
                                        alt="Account Icon"
                                    />
                                </div>
                            </Link>
                            <div className="search" style={iconStyle} onClick={() => setSearchVisible(!searchVisible)}>
                                <img
                                    src="https://s3-alpha-sig.figma.com/img/571b/1488/960a457cbdaebec733dd77af2dd80969?Expires=1719187200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=jD6J5YAHlStw0XEdKdz5NqaD5UO-3ffHcS8IVRzyv1tdb6O2zWnCfLtOYQ2kM-5md-khyF~l6p9jXhvlol9u2ktphXNxqFA1FDpWAdctREmpU0TGKsoFvCBZ3xUZpVJgogF-yA7Ozz~FJ~gj7V3YXgxWfpUzhxoqo9DlM3ouuDj2rVbdZ4Oxgx5OhZ3fx26~w0rd62MEJ3yq2UD-aHY8PGqZPG-svxHZh9mxLRiXL5Ch0tCD6Lff7tbDpgQOeXtC1B88mXm6TiIYjABszkAeV4TrIHRyIkjvNZSblcK0YFgWboEUjJlAkUVBu4C60vKYEmDC6Rqe7DbG9mTtoCEZg__"
                                    alt="Search Icon"
                                />
                            </div>
                            <Link href="/cart">
                                <div className="cart" style={iconStyle}>
                                    <img
                                        src="https://s3-alpha-sig.figma.com/img/3f32/83a7/4f8080e839e885053e7061765069c491?Expires=1719187200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=jSJgojri9We8sCBPENYjCBwR6lyXb7tm0d7LrfwlV9CRuAB1-2xL9MEUMnISJ-TkUKpb0Tw04siyK5VDBBJ~3sB7kDNjHlA~B4T4-ZNo5tLo2IZpY0ci-xZXMi92W7lC-Gx3g5GElK7OXclZ74TgtavJjyiRs3juxqJd~hMBovZxR2eaQJzEKat-jAQpG~7aOx-RPtCkBBcog6E41vn5U0CG45d0UObqv7GWWFD-V0a3vVW9YhV8ix7JQbNAiZt1ZJweR7fgK1lBzVBSHKUEqK51bPmqHqckVE-HmoP1J-r6pDPxd~2fpIrMHo-dY60b0HZneBMfQJsmOBBrbGz5hA__"
                                        alt="Cart Icon"
                                    />
                                    {cartCount > 0 && <div style={cartNumberStyle}>{cartCount}</div>}
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            <nav style={navStyle}>
                {categories.length > 0 ? categories.map((category, index) => (
                    <Link key={index} href={`/category/${category.id}`} style={linkStyle} onMouseOver={e => e.currentTarget.style.color = hoverStyle.color} onMouseOut={e => e.currentTarget.style.color = linkStyle.color}>
                        <div style={navItemStyle}>
                            {category.name}
                        </div>
                    </Link>
                )) : (
                    <div>Loading categories...</div>
                )}
            </nav>

            {/* Search Input Overlay */}
            <div style={searchContainerStyle}>
                <form onSubmit={handleSearch} style={{ position: 'relative' }}>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        style={searchFieldStyle}
                        placeholder="Search products..."
                        aria-label="Search products"
                    />
                    <button type="submit" style={searchButtonStyle} aria-label="Submit search">
                        <img
                            src="https://s3-alpha-sig.figma.com/img/571b/1488/960a457cbdaebec733dd77af2dd80969?Expires=1719187200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=jD6J5YAHlStw0XEdKdz5NqaD5UO-3ffHcS8IVRzyv1tdb6O2zWnCfLtOYQ2kM-5md-khyF~l6p9jXhvlol9u2ktphXNxqFA1FDpWAdctREmpU0TGKsoFvCBZ3xUZpVJgogF-yA7Ozz~FJ~gj7V3YXgxWfpUzhxoqo9DlM3ouuDj2rVbdZ4Oxgx5OhZ3fx26~w0rd62MEJ3yq2UD-aHY8PGqZPG-svxHZh9mxLRiXL5Ch0tCD6Lff7tbDpgQOeXtC1B88mXm6TiIYjABszkAeV4TrIHRyIkjvNZSblcK0YFgWboEUjJlAkUVBu4C60vKYEmDC6Rqe7DbG9mTtoCEZg__"
                            alt="Search Icon"
                        />
                    </button>
                </form>
            </div>
        </header>
    );
};

export default Header;
