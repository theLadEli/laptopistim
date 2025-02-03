export default async function loginUser(credentials) {
    const response = fetch('http://localhost:5200/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        body: JSON.stringify(credentials)
    });

    if (!response.ok) {
        throw new Error('Invalid login');
    }

    return (await response).text;
}

export async function registerUser(userData) {
    return fetch('http://localhost:5200/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.token) {
            localStorage.setItem('token', JSON.stringify(data.token));
            return data.token;
        } else {
            throw new Error(data.error || 'Registration failed');
        }
    });
}