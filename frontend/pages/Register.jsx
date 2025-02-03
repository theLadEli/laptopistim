import React, { useState, useEffect } from 'react';

function Register({setToken}) {

    function handleSubmit() {

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
                <form onSubmit={handleSubmit} className='column'>

                    <label>
                        First Name
                        <input required placeholder='John' type="text" />
                    </label>

                    <label>
                        Last Name
                        <input required placeholder='Doe' type="text" />
                    </label>

                    <label>
                        Email
                        <input required placeholder='your@email.com' type="email" />
                    </label>

                    <label>
                        Phone Number
                        <input required placeholder='+972 050 0000000' type="number" />
                    </label>

                    <label>
                        City
                        <input required placeholder='Tel Aviv' type="text" />
                    </label>

                    <label>
                        Password
                        <input required type="password" />
                    </label>

                    <label>
                        Confirm Password
                        <input required type="password" />
                    </label>

                    <input type="submit" value="Submit" className='primary' />
                </form>
            </section>
        </div>
    </>
)   ;
}

export default Register;