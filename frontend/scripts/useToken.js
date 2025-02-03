import { useState } from 'react';

export default function useToken() {
    
    function getToken() {
        const tokenString = localStorage.getItem('token');
        const userToken = tokenString ? JSON.parse(tokenString) : null;
        return userToken?.token || null; 
    }

    const [token, setToken] = useState(getToken());

    function saveToken(userToken){
        localStorage.setItem('token', JSON.stringify(userToken));
        setToken(userToken.token);
    }

    return {
        setToken: saveToken,
        token
    }
}