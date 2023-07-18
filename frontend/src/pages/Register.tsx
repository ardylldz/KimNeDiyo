import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";

interface IRegisterDto {
    name: string;
    password: string;
}

const RegisterPage: React.FunctionComponent = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();


    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        const payload: IRegisterDto = {
            name: username,
            password: password,
        };

        fetch('http://localhost:8080/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
            .then((response) => {
                if (response.ok) {
                    // Registration successful
                    console.log('Registration successful');
                    navigate("/login")
                } else {
                    // Handle registration error
                    throw new Error('Registration failed');
                }
            })
            .catch((error) => {
                // Handle error
                console.error(error);
            });

        // Reset the form after successful registration
        setUsername('');
        setPassword('');
        setConfirmPassword('');
    };

    return (
        <div className="login">
            <h3 className="fw-bold text-dark fs-10">REGISTER</h3>
            <form onSubmit={handleFormSubmit}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    required/>
                <br></br>
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required/>
                <br></br>
                <label htmlFor="confirm-password">Confirm:   </label>
                <input
                    type="password"
                    id="confirm-password"
                    name="confirm-password"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    required/>
                <br></br>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default RegisterPage;
