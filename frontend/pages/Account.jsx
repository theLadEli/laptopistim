import React, { useState, useEffect } from 'react';

function Account() {

    const [userDetails, setUserDetails] = useState(null);
    const [error, setError] = useState('');

    function signOut() {
        localStorage.clear();
        window.location.href = '/';
    }

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const token = storedToken ? JSON.parse(storedToken).token : null; // Extract the token

        if (token) {
            console.log(token)
            fetchAccountDetails(token);
        } else {
            setError("No token found. Please log in.");
        }

    }, []);

    const fetchAccountDetails = async (token) => {
        try {
            const response = await fetch('http://localhost:5200/account', {
                method: 'GET',
                headers: {
              'Authorization': `Bearer ${token}`, // Send JWT token in the request header
                },
        });
    
        if (response.ok) {
            const data = await response.json();
            setUserDetails(data);
        } else {
            setError('Failed to fetch account details');
        }
        } catch (err) {
            setError('Error fetching account details');
        }
    };
    

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

        <div className="container">
            { error && <p>{error}</p> }
        </div>
    </>
)   ;
}

export default Account;