import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css'; // Import the updated CSS
import api from '../../services/api'; // Assuming this handles API requests

const Header = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token'); // Retrieve token to check login state

    const handleLogout = () => {
        // Remove authentication data
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        // Redirect to landing page
        navigate('/');
    };


    return (
        <header className="header">
            <div className="container">
                <div className="logo">
                    <Link to="/" className="logo-link">
                        <span className="evangadi-logo">EVANGADI</span>
                    </Link>
                </div>
                <nav className="nav-links">
                    <Link to={token ? "/home" : "/"} className="nav-link">Home</Link>

                    <Link to="/how-it-works" className="nav-link">How it Works</Link>
                    {token ? (
                        <>
                            {/* <Link to="/home" className="nav-link">Questions</Link>
                            <Link to="/ask" className="nav-link">Ask Question</Link> */}
                            <button onClick={handleLogout} className="sign-in-button">Logout</button> {/* Logout button */}
                        </>
                    ) : (
                        <Link to="/login" className="sign-in-button">SIGN IN</Link> // Sign in button if not logged in
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;
