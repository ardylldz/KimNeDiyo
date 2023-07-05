import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";

export interface IHomePageProps {
}

const HomePage: React.FunctionComponent<IHomePageProps> = (props) => {
    interface dataType {
        text: string;
        message: string;
    }

    const [data, setData] = useState<dataType>(); // Initialize with an empty object

    useEffect(() => {
        fetch("http://localhost:8080/api/users/hello")
            .then(response => response.json())
            .then(res => setData(res))
            .catch(error => console.log(error))

    }, [])


    return (
        <div>
            <h1>Home</h1>
            <Link to="/second">Landing</Link>
            <br></br>
            <Link to="/third">Contact</Link>
            <br></br>
            <Link to="/fourth">Fourth</Link>
            <h1>{data?.text || "boş"}</h1>
            <h2>{data?.message || "mesaj yok"}</h2>
        </div>
    );
};

export default HomePage;
