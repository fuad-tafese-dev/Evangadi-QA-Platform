import React, { useState } from 'react'; // Add useState import
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import api from '../../services/api';

const Header = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [isMenuOpen, setIsMenuOpen] = useState(false); // Mobile menu state

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
        setIsMenuOpen(false); // Close menu on logout
    };

    return (
        <header className="header">
            <div className="container">
                <div className="logo">
                    <Link to="/" className="logo-link">
                        <span className="evangadi-logo">EVANGADI</span>
                    </Link>
                </div>

                {/* Hamburger Menu Button */}
                <button
                    className={`hamburger ${isMenuOpen ? 'active' : ''}`}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                <nav className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
                    <Link to={token ? "/home" : "/"} className="nav-link" onClick={() => setIsMenuOpen(false)}>Home</Link>
                    <Link to="/how-it-works" className="nav-link" onClick={() => setIsMenuOpen(false)}>How it Works</Link>
                    {token ? (
                        <button onClick={handleLogout} className="sign-in-button">Logout</button>
                    ) : (
                        <Link to="/login" className="sign-in-button" onClick={() => setIsMenuOpen(false)}>SIGN IN</Link>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;