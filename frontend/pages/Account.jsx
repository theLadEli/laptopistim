import React, { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext';

function Account() {
    const { isAuthenticated, user, logout } = useAuth();

    return (
    <>
        <div className="header-container container">
            <header className='column'>

                <div className="column title">
                    <h1>Account</h1>

                    <div className="row subtitle">
                        <hr/>
                        <h5>update your details here</h5>
                    </div>
                </div>

                <button className='secondary' onClick={logout}>Sign Out</button>
            </header>
        </div>

        <div className="container column">
            <h2>Account Details</h2>
            {user ?
                <>
                    <p>Welcome {user.firstName}!</p>
                    <p>{user.email}</p>
                </>
                :
                <p>Loading...</p>
            }
        </div>
    </>
)   ;
}

export default Account;