import React, {useEffect, useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import axios from 'axios';

export interface IHomePageProps {
}

const HomePage: React.FunctionComponent<IHomePageProps> = (props) => {
    interface dataType {
        text: string;
        message: string;
    }

    const [username, setUsername] = useState('');
    const [data, setData] = useState<dataType>();
    const location = useLocation();
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const fetchUsername = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/username", {
                headers: {Authorization: `Bearer ${token}`}
            });
            setUsername(response.data);
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    };

    useEffect(() => {
        fetchUsername();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login', {state: {}});
    };

    return (
        <div>
            <h1>Home</h1>
            <h2>Welcome, {username}!</h2>
            <Link to="/second">Landing</Link>
            <br></br>
            <Link to={`/password-change?username=${username}`}>Change Password</Link>
            <br></br>
            <div>
                <button type="submit" onClick={handleLogout}>Log Out</button>
            </div>
        </div>
    );
};

export default HomePage;
