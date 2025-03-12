import React from 'react';
import './Footer.css';
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-section logo-section">
                    <div className="evangadi-logo">EVANGADI</div>
                    <div className="social-icons">
                        <a href="https://www.facebook.com/EvangadiTech" className="social-icon" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
                        <a href="https://www.instagram.com/EvangadiTech" className="social-icon" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
                        <a href="https://www.youtube.com/EvangadiTech" className="social-icon" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
                    </div>
                </div>
                <div className="footer-section links-section">
                    <h3 className="section-title">Useful Link</h3>
                    <a href="/how-it-works" className="footer-link">How it works</a>
                    <a href="/terms-of-service" className="footer-link">Terms of Service</a>
                    <a href="/privacy-policy" className="footer-link">Privacy policy</a>
                </div>
                <div className="footer-section contact-section">
                    <h3 className="section-title">Contact Info</h3>
                    <p className="contact-text">Evangadi Networks</p>
                    <p className="contact-text">support@evangadi.com</p>
                    <p className="contact-text">+1-202-366-2710</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;