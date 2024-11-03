"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Doughnut, Bar } from 'react-chartjs-2';
import { Chart, ArcElement, CategoryScale, LinearScale, BarElement } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels'; // Import plugin
import { callAPI } from '@/utils/api-caller';
import { getToken, getUser } from '@/utils/helper';

// Register necessary components and plugins
Chart.register(ArcElement, CategoryScale, LinearScale, BarElement, ChartDataLabels);

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
    }, []);

    const fetchDashboardData = async () => {
        try {
            const res = await callAPI('/admin/dashboard', 'GET');
            const { data } = res.data;

            // Map API data structure to match front-end expectations
            const signatureStats = {
                forged: data.forged_signatures || 0,
                original: data.verified_signatures || 0,
            };
            // Ensure topCustomers has a maximum of 10 items
            const topCustomers = (data.top_customer || []).slice(0, 10);
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
        labels: ['Forged', 'Original'],
        datasets: [
            {
                data: [signatureStats.forged, signatureStats.original],
                backgroundColor: ['#D4A344', '#688A5D'],
                hoverBackgroundColor: ['#D4A344', '#688A5D'],
            },
        ],
    };

    const doughnutOptions = {
        plugins: {
            datalabels: {
                display: true,
                font:{
                    weight:'bold',
                    size:'15px',
                },
                
                color: '#688A5D', // Đổi màu của label
                fontWeight:'bold',
                formatter: (value, context) => {
                    const label = context.chart.data.labels[context.dataIndex];
                    return `${label}: ${value}`;
                },
                anchor: 'end',
                align: 'end',
                offset: 2, // Khoảng cách giữa label và biểu đồ
                clip:'true',
                padding:5
            },
        },
        cutout: '50%', // Thu nhỏ phần rỗng của doughnut
        responsive: true,
        maintainAspectRatio: false, // Giúp điều chỉnh kích thước biểu đồ dễ dàng hơn

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
        plugins: {
            datalabels: {
                display: true,
                color: '#000', // Màu của label
                anchor: 'end',
                align: 'top', // Căn label trên đầu của thanh
                clip: true, // Đảm bảo label nằm trong khu vực chart
                offset: -5, // Thêm khoảng cách giữa label và thanh
                formatter: (value, context) => {
                    return value; // Hiển thị giá trị trực tiếp
                },
            },
        },
        scales: {
            x:{
                grid:{
                    display:false,

                },
                barPercentage:0.8,
                categoryPercentage:0.9,


            },
            y: {
                grid:{
                    display:false,

                },
                beginAtZero: true,
                ticks: {
                    stepSize: 5, // Điều chỉnh khoảng cách giữa các giá trị trên trục y nếu cần
                },
                max: function(context) {
                    // Tăng chiều cao tối đa của trục y lên 10 đơn vị nếu có label
                    const maxDataValue = Math.max(...context.chart.data.datasets[0].data);
                    return maxDataValue + 10; // Tăng thêm 10 đơn vị
                },
            },
        },
        layout: {
            padding: {
                left: 20,
                right: 20,
                top: 20,
                bottom: 20, // Tạo thêm khoảng trống bên dưới để các thanh không sát viền
            },
        },
    
    };
    
    
    

    return (
        <div style={{ backgroundColor: '#f9f9f9', padding: '20px' }}>
            <h1 style={{ textAlign: 'center', color: '#458A5D', marginBottom: '30px', paddingTop: '50px', fontWeight: 'bolder', fontSize: '30px' }}>
                Sign-Check Dashboard
            </h1>

            <h2 style={{ textAlign: 'center', color: '#688A5D', marginBottom: '20px' }}>Numbers of signatures verified</h2>
            <h3 style={{ textAlign: 'center', fontSize: '48px', color: '#458A5D', marginBottom: '50px',fontWeight:'bold' }}>
                {totalSignaturesVerified || 0}
            </h3>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
                <div style={{ flex: 1, marginRight: '20px', textAlign: 'center' }}>
                    <div style={{ padding: '20px', borderRadius: '8px', border: '1px solid #c0c0c0', backgroundColor: '#fff', width: '700px', height: '500px' }}>
                        <Doughnut data={doughnutData} options={doughnutOptions} />
                    </div>
                </div>

                <div style={{ flex: 1, paddingLeft: '20px', textAlign: 'center' }}>
                    <div style={{ padding: '20px', borderRadius: '8px', border: '1px solid #c0c0c0', backgroundColor: '#fff' ,height: '500px'}}>
                        <h2 style={{ color: '#458A55', fontWeight: 'bold', fontSize: '24px' }}>Top 10 customers with most forged signatures</h2>
                        <Bar style={{paddingTop:'30px'}}data={barData} options={barOptions} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignCheckDashboard;



