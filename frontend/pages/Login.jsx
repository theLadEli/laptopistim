import React, { useState } from 'react';
import { useAuth } from "../AuthContext";

export default function Login() {
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(email, password);
    };

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

                </form>
            </section>
        </div>

    </>
)   ;
}