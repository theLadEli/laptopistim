import React, { useState, useEffect } from 'react';
import { useAuth } from "../AuthContext";
import '../styles/pages/login.css'

// Phone num validation
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

function Register() {
    const { login } = useAuth();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');

        if (password != confirmPassword) return setError('Password confirmation incorrect.')

        try {
            const response = await fetch('https://laptopistim.onrender.com/auth/register', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ firstName, lastName, email, phone, city, password })
            });

            const data = await response.json();

            if (response.ok) {
                login(email, password);
            } else {
                setError(data?.message);
            }

        } catch (err) {
            setError('Server error');
        }
    }

    return (
    <>
    <section className='column reg-header'>

        <div className="column title">
            <h1>Register</h1>

            <div className="row subtitle">
                <hr/>
                <h5>join the community</h5>
            </div>

        </div>
        <a className="primary" href="/login">Got an account? Login</a>
    </section>

    <section id="login">
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

            <PhoneInput
                country={"us"} // Default country (can be "il" for Israel, etc.)
                value={phone}
                onChange={(phone) => {
                    setPhone(phone);
                    onPhoneChange(phone);
                }}
                enableSearch={true} // Allow searching country codes
                countryCodeEditable={false} // Prevent manual country code edits
                placeholder="Enter phone number"
            />

            <label>
                City
                <input required placeholder='Tel Aviv' type="text" value={city} onChange={(e) => setCity(e.target.value)} />
            </label>

            <label>
                Password
                <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>

            <label>
                Confirm Password
                <input required type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </label>

            <input type="submit" value="Submit" className='primary' />
            {error && <p style={{ color: "red" }}>{error}</p>}
        </form>

    </section>
    </>
)   ;
}

export default Register;