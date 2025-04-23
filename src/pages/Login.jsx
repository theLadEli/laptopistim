import React, { useState } from 'react';
import { useAuth } from "../AuthContext";
import '../styles/pages/login.css'

export default function Login() {
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            await login(email, password);
        } catch(error) {
            setError(error.message)
        }
    };

    return (
    <>
    <section className='column reg-header'>
        <div className="column title">
            <h1>Login</h1>

            <div className="row subtitle">
                <hr/>
                <h5>share your experience</h5>
            </div>
        </div>
        <a className="primary" href="/register">Not yet registered? Sign Up</a>
    </section>

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
            {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
    </section>
    </>
    );
}