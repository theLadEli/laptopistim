import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import userManagement from '../scripts/userManagement';

export default function Login({setToken}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    
    const handleSubmit = async form => {
        form.preventDefault();

        const credentials = {email, password};        

        try {
            const response = await fetch('http://localhost:5200/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials),
            });
            
            const token = await response.text();
            console.log('Login response:', token);
            
            if (!response.ok) {
                console.error("Response not OK:", response.status, response.statusText);
                setError('Invalid email or password');
                return;
            }
    
            if (!token) {
                console.error("No token received:", token);
                setError('Login failed: No token received.');
                return;
            }

            console.log("Token received! Storing now...");

            setToken({ token });
            localStorage.setItem('token', JSON.stringify({ token }));
    
            console.log("Token stored successfully. Redirecting...");
            window.location.href = '/account';
    
            
        } catch(error) {
            console.error('Login error:', error);
            setError('Login failed. Please try again.');
        }
    }

    return (
    <>
        <div className="header-container container">
            <section className='column reg-header'>

                <div className="column title">
                    <h1>Login</h1>

                    <div className="row subtitle">
                        <hr/>
                        <h5>join the community</h5>
                    </div>
                </div>
            </section>
        </div>

        <div className="container">
            <section id="login">
                <form onSubmit={handleSubmit} className='column'>
                    <label>
                        Email
                        <input required placeholder='your@email.com' type="email" onChange={(e) => setEmail(e.target.value)} />
                    </label>

                    <label>
                        Password
                        <input required type="password" onChange={(e) => setPassword(e.target.value)} />
                    </label>

                    <input type="submit" value="Submit" className='primary' />

                    {error && <p>{error}</p>}
                </form>
            </section>
        </div>

    </>
)   ;
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}