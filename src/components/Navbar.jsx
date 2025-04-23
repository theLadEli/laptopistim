import React, { useState } from "react";
import { useAuth } from "../AuthContext";
import '../styles/components/navbar.css'

import Logo from "../assets/logo.svg";
import Hamburger from '../assets/icons/hamburger.svg';

function Navbar() {
    const { isAuthenticated } = useAuth();
    const [showMenuDropdown, setShowMenuDropdown] = useState(false);

    return (
        <div className="container column">
            <menu>
                <a href="/">
                    <img src={Logo} alt="Logo" className="logo" />
                </a>

                <nav className="row nav-links">
                    <li><a href="/">Home</a></li>
                    <li><a href="/spots">Spots</a></li>
                    <li><a href="/about">About</a></li>
                    <li><a href="/contribute">Contribute</a></li>
                    <li><a href="/contact">Contact</a></li>
                </nav>

                <img src={Hamburger} onClick={() => !showMenuDropdown ? setShowMenuDropdown(true) : setShowMenuDropdown(false)} alt="Menu button icon" className="navbar-hamburger" height={20} />


                {isAuthenticated ? <button onClick={() => window.location.href = '/account'} className="primary navbar-btn" >Account</button> 
                : <button onClick={() => window.location.href = '/register'} className="primary navbar-btn" >Register</button>}

            </menu>
                {showMenuDropdown && (
                    <nav className="column mobile-nav-dropdown">
                        <li><a href="/">Home</a></li>
                        <li><a href="/spots">Spots</a></li>
                        <li><a href="#about">About</a></li>
                        <li><a href="#contribute">Contribute</a></li>
                        <li><a href="#contact">Contact</a></li>
                        
                        {isAuthenticated ? <button onClick={() => window.location.href = '/account'} className="secondary" >Account</button> 
                        : <button onClick={() => window.location.href = '/register'} className="secondary" >Register</button>}

                    </nav>
                )}
        </div>
    )
}

export default Navbar;