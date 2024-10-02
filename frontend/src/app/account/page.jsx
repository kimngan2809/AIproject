"use client";
import { useEffect, useState } from 'react';
import { callAPI } from '@/utils/api-caller';
import { getUser, clearAuthData } from '@/utils/helper';
import { useRouter } from 'next/navigation';

const MyAccount = () => {
    const [user, setUser] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const router = useRouter();

    useEffect(() => {
        const userData = getUser();
        if (userData) {
            setUser(userData);
            setFirstName(userData.firstName);
            setLastName(userData.lastName);
            setEmail(userData.email);
            setUsername(userData.username);
        } else {
            router.push('/login');
        }
    }, []);

    const handleUpdate = async () => {
        try {
            const data = {
                firstName,
                lastName,
                email,
                username,
            };
            await callAPI(`/users/${user.id}`, 'PUT', data);
            alert('Cập nhật thông tin thành công!');
        } catch (error) {
            console.error(error);
            alert('Cập nhật thông tin thất bại.');
        }
    };

    const handleLogout = () => {
        clearAuthData();
        router.push('/login');
    };

    const handleDeleteAccount = async () => {
        try {
            await callAPI(`/users/${user.id}`, 'DELETE');
            clearAuthData();
            router.push('/signup');
        } catch (error) {
            console.error(error);
            alert('Xóa tài khoản thất bại.');
        }
    };

    if (!user) return <div>Loading...</div>;

    return (
        <div className="account-page">
            <h1>My Account</h1>
            <div>
                <label>First Name:</label>
                <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
            </div>
            <div>
                <label>Last Name:</label>
                <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
            </div>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div>
                <label>Username:</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <button onClick={handleUpdate}>Update</button>
            <button onClick={handleLogout}>Log Out</button>
            <button onClick={handleDeleteAccount}>Delete Account</button>
        </div>
    );
};

export default MyAccount;
