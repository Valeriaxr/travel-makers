import React, { useState } from 'react';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');


    const handleSubmit = (event) => {
        event.preventDefault();
        // add code here to send request to backend for authentication
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Email:
                <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
            </label>
            <br /> 
            <label>
                Password:
                <input type="password" value={password} onchange={(event) => setPassword(event.target.value)} />
            </label>
            <br />
            <label>
                First name:
                <input type="text" value={firstName} onchange={(event) => setFirstName(event.target.value)} />
            </label>
            <br />
            <label>
                Last name:
                <input type="text" value={lastName} onchange={(event) => setLastName(event.target.value)} />
            </label>
            <br />
            <button type="submit">Log In</button>
        </form>
    );
}

export default Login

