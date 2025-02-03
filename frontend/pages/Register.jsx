import React, { useState, useEffect } from 'react';
import { registerUser } from '../scripts/userManagement';

function Register({setToken}) {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');

        try {
            const token = await registerUser({ firstName, lastName, email, phone, city, password });
            setToken(token);
        } catch(error) {
            setError(error.message)
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
                <button className="primary" onClick={() => window.location.href = '/login'}>Got an account? Login</button>
            </section>
        </div>

        <div className="container">
            <section id="login">
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <form onSubmit={handleSubmit} className='column'>


                    <label>
                        First Name
                        <input required placeholder='John' type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    </label>

                    <label>
                        Last Name
                        <input required placeholder='Doe' type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    </label>

                    <label>
                        Email
                        <input required placeholder='your@email.com' type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </label>

                    <label>
                        Phone Number
                        <input required placeholder='+972 050 0000000' type="number" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </label>

                    <label>
                        City
                        <input required placeholder='Tel Aviv' type="text" value={city} onChange={(e) => setCity(e.target.value)} />
                    </label>

                    <label>
                        Password
                        <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </label>

                    {/* <label>
                        Confirm Password
                        <input required type="password" />
                    </label> */}

                    <input type="submit" value="Submit" className='primary' />
                </form>
            </section>
        </div>
    </>
)   ;
}

export default Register;