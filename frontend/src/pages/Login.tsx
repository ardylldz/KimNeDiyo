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
                window.location.href = "/";
            })
            .catch((error) => {
                alert(error.message);
            });
    };
    return (
            <div>
                     <div className="card text-center">
                     <div className="card-header">
                     <ul className="nav nav-tabs card-header-tabs">
                     <li className="nav-item">
                     <a className="nav-link disabled">
                     <h3 className="fw-bold text-dark fs-10 text-start">kimnedio</h3>
                       </a>
                      </li>
                      </ul>
                      </div>
                      </div>


            <div className="login">
                <h3 className="fw-bold text-dark fs-10">LOG IN</h3>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    onChange={handleUsernameChange}
                    value={username}
                    required/>

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    onChange={handlePasswordChange}
                    value={password}
                    required/>
                 <br></br>
                <button type="submit" onClick={handleLogin}>Login</button>
                 <br></br>
                <li className="nav-item">
                              <a className="nav-link" href="/register">
                                  Don't have an account? Register <span className="blue-text">here</span>.
                                </a>
                            </li>

            </div>
        </div>
    );
};

export default LoginPage;
