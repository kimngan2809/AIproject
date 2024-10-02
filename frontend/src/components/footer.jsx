import React from 'react';
import Link from "next/link";

const Footer = () => {
    const footerStyle = {
        backgroundColor: '#015109',
        color: '#FFF9E2',
        padding: '20px 0',
        // display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop:'20px'
    };
    const paymentImageStyle = {
        width: '90px',
        
        borderRadius: '5px',
        margin: '5px',
    };

    const columnStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        margin:'30px',
        paddingLeft:'100px'
    };

    const listStyle = {
        listStyle: 'none',
        spaceLine:'5px',
        
    };

    const socialMediaStyle = {
        display: 'flex',
        justifyContent:'space-evenly',
        width: '50px',
        marginTop: '20px',
        borderRadius:'50%',
        marginLeft:'30px'
    };const bottomStyle = {
        width: '100%',
        borderTop: '1px solid #FFF9E2',
        display:'flex'
        
        
        
    };

    return (
        <footer style={{ backgroundColor: '#458A55', padding: '20px', color: '#fff' }}>
      <div className="footer-content" style={{display:'flex'}}>
        <div style={{marginLeft:'50px',paddingLeft:'50px', marginTop:'10px',width:'20vw'}}>
        <h1 className="font-extrabold" style={{ fontSize: '30px' }}>Sign-Check</h1>
        </div>
        <div style={{ marginLeft:'50px',lineHeight:'30px',marginRight:'50px', marginTop:'20px'}}>
        <p style={{ marginTop: '5px', fontSize: '16px' }}>
          Deep Learning Based Handwritten Signature Detection
          <br />
          Sign-Check setup your own Handwritten Signature Detection solution. The models are trained and optimized for text on natural scene and scanned documents.
        </p>
        </div>
      </div>
      <div className="footer-links" style={{ display: 'flex', justifyContent: 'center', gap: '30px', marginTop: '20px' }}>
        <a href="#" style={{ color: '#fff', textDecoration: 'none', fontSize: '16px' }}>About us</a>
        <a href="#" style={{ color: '#fff', textDecoration: 'none', fontSize: '16px' }}>Connect to us</a>
        <a href="#" style={{ color: '#fff', textDecoration: 'none', fontSize: '16px' }}>Our terms of service</a>
      </div>
    </footer>
    );
};

export default Footer;
