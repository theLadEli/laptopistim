import React, { useState, useEffect } from 'react';

function Account() {

    function signOut() {
        localStorage.clear();
        window.location.href = '/';
    }

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

                <button className='secondary' onClick={signOut}>Sign Out</button>
            </header>
        </div>
    </>
)   ;
}

export default Account;