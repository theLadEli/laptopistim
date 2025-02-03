import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import loginUser from '../scripts/userManagement';

export default function Login({setToken}) {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async form => {
        form.preventDefault();
        const token = await loginUser({
            email,
            password
        });
        setToken(token);
    }
    

    return (
    <>
        <div className="header-container container">
            <header className='column'>

                <div className="column title">
                    <h1>Login</h1>

                    <div className="row subtitle">
                        <hr/>
                        <h5>join the community</h5>
                    </div>
                </div>
            </header>
        </div>

        <div className="container">
            <section id="login">
                <form onSubmit={handleSubmit} className='column'>
                    <label>
                        Email
                        <input type="email" onChange={e => setEmail(e.target.value)} />
                    </label>

                    <label>
                        Password
                        <input type="password" onChange={e => setPassword(e.target.value)} />
                    </label>

                    <input type="submit" value="Submit" />
                </form>
            </section>
        </div>


    </>
)   ;
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}