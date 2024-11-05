import React, { useContext, useEffect } from 'react';
import { UserContext } from '../../Services/CreateContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Navbar.css'; 

const Navbar = () => {
    const { user, setUser, images, setImages } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        const cookieValue = document.cookie.split("=")[1];
        if (cookieValue) {
            try {
                const userData = JSON.parse(cookieValue);
                setUser(userData);
            } catch (error) {
                console.error("Error parsing cookie data:", error);
            }
        } else {
            console.log("No user data found in cookie.");
        }
    }, [setUser]);

    const handleLogout = () => {
        document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        setUser(null);
        window.location.reload();
        navigate('/login');
    };

    return (
        <div className='navbar-bg'>
            <div className="container">
                <nav className="navbar navbar-expand-lg">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#">
                            <h1 className="brand-title">DAZN Photography</h1>
                            
                        </a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav ms-auto align-items-center">
                                {user ? (
                                    <li className="nav-item">
                                        <span className="nav-link username">{user?.username}</span>
                                    </li>
                                ) : (
                                    <li className="nav-item">
                                        <a className="nav-link login-link" href="/login">Login</a>
                                    </li>
                                )}
                                {user && (
                                    <li className="nav-item">
                                        <span className="nav-link logout-link" onClick={handleLogout}>Logout</span>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default Navbar;
