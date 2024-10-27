"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Doughnut, Bar } from 'react-chartjs-2';
import { Chart, ArcElement, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { callAPI } from '@/utils/api-caller';
import { getToken, getUser } from '@/utils/helper';

// Register necessary components
Chart.register(ArcElement, CategoryScale, LinearScale, BarElement);

const SignCheckDashboard = () => {
    const [dashboardData, setDashboardData] = useState(null);
    const [error, setError] = useState("");
    const router = useRouter();

    // Retrieve user and token
    const user = getUser();
    const token = getToken();

    useEffect(() => {
        if (!user || user.role !== 'admin') {
            router.replace('/');
        } else {
            fetchDashboardData();
        }
    }, [user, token]);

    const fetchDashboardData = async () => {
        try {
            const res = await callAPI('/admin/dashboard', 'GET');
            const { data } = res.data;

            // Map API data structure to match front-end expectations
            const signatureStats = {
                forged: data.forged_signatures || 0,
                original: data.verified_signatures || 0,
            };
            const topCustomers = data.top_customer || [];
            const totalSignaturesVerified = signatureStats.forged + signatureStats.original;

            setDashboardData({
                signatureStats,
                topCustomers,
                totalSignaturesVerified
            });
        } catch (error) {
            setError("Failed to load dashboard data.");
        }
    };

    if (!dashboardData) {
        return (
            <div style={{ textAlign: 'center', marginTop: '100px' }}>
                <h2>Loading...</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
        );
    }

    const { totalSignaturesVerified, signatureStats, topCustomers } = dashboardData;

    const doughnutData = {
        labels: ['Forged Signature', 'Original Signature'],
        datasets: [
            {
                data: [signatureStats.forged, signatureStats.original],
                backgroundColor: ['#D4A344', '#688A5D'],
                hoverBackgroundColor: ['#D4A344', '#688A5D'],
            },
        ],
    };

    const barData = {
        labels: topCustomers.map(customer => customer._id || "Customer"), // Use customer._id or customer.name if available
        datasets: [
            {
                label: 'Forged Signatures',
                data: topCustomers.map(customer => customer.count || 0), // Use 'count' as per your backend response
                backgroundColor: '#688A5D',
                borderColor: '#688A5D',
                borderWidth: 1,
            },
        ],
    };

    const barOptions = {
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 5, // Adjust step size as needed
                },
            },
        },
    };

    return (
        <div style={{ backgroundColor: '#f9f9f9', padding: '20px' }}>
            <h1 style={{ textAlign: 'center', color: '#458A5D', marginBottom: '40px', paddingTop: '100px', fontWeight: 'bolder', fontSize: '30px' }}>
                Sign-Check Dashboard
            </h1>

            <h2 style={{ textAlign: 'center', color: '#688A5D', marginBottom: '20px' }}>Numbers of signatures verified</h2>
            <h3 style={{ textAlign: 'center', fontSize: '48px', color: '#688A5D', marginBottom: '50px' }}>
                {totalSignaturesVerified || 0}
            </h3>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
                <div style={{ flex: 1, marginRight: '20px', textAlign: 'center' }}>
                    <div style={{ padding: '20px', borderRadius: '8px', border: '1px solid #c0c0c0', backgroundColor: '#fff' }}>
                        <Doughnut data={doughnutData} />
                    </div>
                </div>

                <div style={{ flex: 1, paddingLeft: '20px', textAlign: 'center' }}>
                    <div style={{ padding: '20px', borderRadius: '8px', border: '1px solid #c0c0c0', backgroundColor: '#fff' }}>
                        <h2 style={{ color: '#458A55', fontWeight: 'bold', fontSize: '24px' }}>Top 10 customers with most forged signatures</h2>
                        <Bar data={barData} options={barOptions} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignCheckDashboard;
