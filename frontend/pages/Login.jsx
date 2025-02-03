import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import loginUser from '../scripts/userManagement';

export default function Login({setToken}) {
    const [credentials, setCredentials] = useState({ username: '', password: '' });

    const handleSubmit = async form => {
        form.preventDefault();
        const token = await loginUser(credentials);
        setToken(token);
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
                        <input required placeholder='your@email.com' type="email" onChange={(e) => setCredentials({ ...credentials, username: e.target.value })} />
                    </label>

                    <label>
                        Password
                        <input required type="password" onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} />
                    </label>

                    <input type="submit" value="Submit" className='primary' />
                </form>
            </section>
        </div>

    </>
)   ;
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}