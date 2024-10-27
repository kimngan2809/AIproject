'use client';
import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';
import Header from "@/components/admin-header";
import ImageUploading from 'react-images-uploading';
import { callAPI } from "@/utils/api-caller";
import { getUser } from '@/utils/helper';

const SignatureCheck = () => {
    const [images, setImages] = useState(null);
    const [customerId, setCustomerId] = useState(""); // State for customer ID
    const [result, setResult] = useState("NULL");
    const [errorText, setErrorText] = useState("");
    const maxNumber = 69;
    const router = useRouter();

    useEffect(() => {
        const userData = getUser();
        if (!userData) {
            // Redirect to login page if user is not authenticated
            router.push('/login');
        }
    }, [router]);

    const buttonStyle = {
        margin: '10px auto',
        padding: '10px 20px',
        backgroundColor: '#458A55',
        color: '#fff',
        border: 'none',
        borderRadius: '20px',
        cursor: 'pointer',
    };

    const onChange = (imageList) => {
        setImages(imageList);
        setErrorText(""); // Clear any previous error message when an image is uploaded
    };

    const handleSubmit = async () => {
        try {
            if (images && images.length > 0 && customerId) {
                const formData = new FormData();
                formData.append('image', images[0].file);
                formData.append('customerId', customerId);
    
                const loadResponse = await callAPI("/load_signature", "POST", formData, null, true);
    
                if (loadResponse) {
                    console.log('Load image successfully');
                    const exchangeId = loadResponse.data.id;
                    const is_verified=loadResponse.data.is_verified;
    
                    const verifyData = { customer_id: customerId, exchange_id: exchangeId, is_verified:is_verified };
                    const verifyResponse = await callAPI("/verify_signature", "POST", JSON.stringify(verifyData), {
                        'Content-Type': 'application/json'
                    });
                    console.log(verifyResponse);
                    console.log('Verification response data:', verifyResponse.data );
                    console.log(verifyResponse.status);
                    console.log(verifyResponse.data);

    
                    // Kiểm tra giá trị `is_verified` trong verifyResponse để cập nhật `result`
                    if (verifyResponse.status === 200) {
                        const is_verified = verifyResponse.data.is_verified;  // Lấy is_verified từ phản hồi
                        setResult(is_verified ? "TRUE" : "FALSE");
                    } else {
                        setResult("NULL");
                        setErrorText("Error: Unable to verify signature.");
                    }
                } else {
                    console.error('Error loading image', loadResponse.message);
                    setErrorText('Error loading image.');
                }
            } else {
                console.error('No image or customer ID entered');
                setErrorText('Please select an image and enter a customer ID.');
            }
        } catch (error) {
            console.error('Error when calling server:', error);
            setErrorText('Server error. Please try again later.');
        }
    };
    


    return (
        <div style={{ backgroundColor: '#f9f9f9', padding: '20px' }}>
            <Header />
            <h1 style={{ textAlign: 'center', color: '#458A55', marginBottom: '40px', paddingTop: '100px', fontWeight: 'bolder', fontSize: '30px' }}>
                Try Our Online Handwritten Signature Detection Demo
            </h1>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                {/* Left Side: Image Uploading */}
                <div style={{ flex: 1, marginRight: '20px' }}>
                    <div style={{ padding: '20px', borderRadius: '8px', border: '1px solid #c0c0c0', backgroundColor: '#fff', textAlign: 'center' }}>
                        {/* Customer ID Input */}
                        <div style={{ marginTop: '20px' }}>
                            <label htmlFor="customer-id" style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>Customer ID:</label>
                            <input
                                id="customer-id"
                                type="text"
                                placeholder="Enter customer ID"
                                value={customerId}
                                onChange={(e) => setCustomerId(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    borderRadius: '4px',
                                    border: '1px solid #c0c0c0',
                                    fontSize: '16px',
                                    marginBottom: '20px'
                                }}
                            />
                            {images && images.length > 0 ? (
                                <img src={images[0].data_url} alt="" style={{ borderRadius: '8px', width: '100%', maxWidth: '300px', marginBottom: '20px' }} />
                            ) : (
                                <div style={{ padding: '40px', border: '1px dashed #c0c0c0', borderRadius: '8px', marginBottom: '20px' }}>
                                    No image uploaded
                                </div>
                            )}
                            <ImageUploading
                                multiple
                                value={images}
                                onChange={onChange}
                                maxNumber={maxNumber}
                                dataURLKey="data_url"
                            >
                                {({
                                    onImageUpload,
                                    onImageRemoveAll,
                                    isDragging,
                                    dragProps
                                }) => (
                                    <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px auto' }}>
                                        <button
                                            style={isDragging ? { ...buttonStyle, color: "red" } : buttonStyle}
                                            onClick={onImageUpload}
                                            {...dragProps}
                                        >
                                            Upload
                                        </button>
                                        <button
                                            onClick={handleSubmit}
                                            style={buttonStyle}
                                        >
                                            Submit
                                        </button>
                                        <button
                                            onClick={() => {
                                                onImageRemoveAll();
                                                setResult("NULL"); // Reset result when removing the image
                                            }}
                                            style={buttonStyle}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                )}
                            </ImageUploading>

                            {/* Error message display */}
                            {errorText && (
                                <div style={{ color: 'red', marginTop: '10px' }}>
                                    {errorText}
                                </div>
                            )}

                        </div>
                    </div>
                </div>

                {/* Right Side: Result and Customer ID Input */}
                <div style={{ flex: 1, paddingLeft: '20px' }}>
                    <div style={{ padding: '20px', borderRadius: '8px', border: '1px solid #c0c0c0', backgroundColor: '#fff', textAlign: 'center' }}>
                        <h2 style={{ color: '#458A55', fontWeight: 'bold', fontSize: '24px' }}>Result:</h2>
                        <div style={{ padding: '10px', border: '1px solid black', borderRadius: '4px', backgroundColor: '#fff', marginBottom: '20px', minHeight: '100px' }}>
                            {result === "NULL" ? <p>No result yet.</p> : <p>{result === "TRUE" ? "This signature is similar with the orginal" : "This signature is not similar with the orginal"}</p>}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignatureCheck;
