import React, { useState, useEffect } from 'react';
import { useAuth } from "../AuthContext";

export default function Login() {
    const { login } = useAuth();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    
    const handleSubmit = async form => {
        form.preventDefault();

        try {
            const response = await fetch('http://localhost:5200/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            })

            const data = await response.json();

            if (response.ok && data.token) {
                console.log("Saving token:", data.token); // 🛠 Debug log
                localStorage.setItem("token", data.token);
                setUser(data.user);
                setIsAuthenticated(true);
                window.location.href = '/account';
            } else {
                console.error("Login failed:", data.message);
            }
        } catch (err) {
            console.log(err)
            setError('Server error', err);
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