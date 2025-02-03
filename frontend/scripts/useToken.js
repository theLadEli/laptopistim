import { useState } from 'react';

export default function useToken() {
    
    function getToken() {
        const tokenString = localStorage.getItem('token');
        return tokenString ? JSON.parse(tokenString) : null;
    }

    const [token, setToken] = useState(getToken());

    function saveToken(userToken){
        localStorage.setItem('token', JSON.stringify(userToken));
        setToken(userToken);
    }

    return {
        setToken: saveToken,
        token
    }
}