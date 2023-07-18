import React, {ChangeEvent, useState} from 'react';
import {LoginDto} from "../dtos";
import {useNavigate} from "react-router-dom";


export interface ILoginPageProps {
}

const LoginPage: React.FunctionComponent<ILoginPageProps> = props => {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleLogin = () => {

        const dto: LoginDto = {name: username, password};
        fetch("http://localhost:8080/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dto),
        })
            .then((response) => {
                if (response.status === 200) {
                    // Extract the token from the response body
                    return response.json();
                } else {
                    throw new Error("Invalid attempt");
                }
            })
            .then((data) => {
                // Store the token in local storage
                localStorage.setItem("token", data.token);
                navigate("/")
            })
            .catch((error) => {
                alert(error.message);
            });
    };
    return (
        <div>
            <h2>Login</h2>
            <div>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    onChange={handleUsernameChange}
                    value={username}
                    required/>
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    onChange={handlePasswordChange}
                    value={password}
                    required/>
            </div>
            <div>
                <button type="submit" onClick={handleLogin}>Login</button>
            </div>
        </div>
    );
};

export default LoginPage;
