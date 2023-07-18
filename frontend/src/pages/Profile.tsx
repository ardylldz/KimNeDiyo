import React, {useEffect, useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import axios from "axios";

const ProfilePage: React.FunctionComponent = () => {
    const [username, setUsername] = useState("");
    const token = localStorage.getItem("token");

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

    return (
        <div>
            <h5>Welcome {username}!</h5>
            <Link to="/">Go Home</Link>
        </div>
    );
};

export default ProfilePage;
