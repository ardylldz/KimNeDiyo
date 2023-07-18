import React, {useEffect, useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";

interface IPasswordChangeDto {
    username: string;
    currentPassword: string;
    newPassword: string;
}

const PasswordChangePage: React.FunctionComponent = () => {
    const navigate = useNavigate();
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const location = useLocation();
    const username = "mislina";
    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/login");
        }
    }, [])
    const handleChangePassword = () => {
        const payload: IPasswordChangeDto = {
            username: username,
            currentPassword: currentPassword,
            newPassword: newPassword,
        };

        fetch('http://localhost:8080/api/password-change', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
            .then((response) => {
                console.log(JSON.stringify(payload));
                console.log(response);
                if (response.ok) {
                    navigate("/", {state: {}});
                    return response.json();
                } else {
                    throw new Error('Password change failed');
                }
            })
            .then((data) => {
                const newToken = data.token;

            })
            .catch((error) => {
                console.error(error);
            });

        setCurrentPassword('');
        setNewPassword('');
    };

    return (
        <div>
            <h2>Contact page</h2>
            <label htmlFor="current-password">Current Password:</label>
            <input
                type="password"
                id="current-password"
                value={currentPassword}
                onChange={(event) => setCurrentPassword(event.target.value)}
                required/>

            <label htmlFor="new-password">New Password:</label>
            <input
                type="password"
                id="new-password"
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
                required/>

            <button onClick={handleChangePassword}>Change Password</button>
            <Link to="/">Go Home</Link>
        </div>
    );
};

export default PasswordChangePage;
