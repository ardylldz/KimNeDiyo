import React from 'react';
import { Link } from 'react-router-dom';

export interface IThirdPageProps {};


const ThirdPage: React.FunctionComponent<IThirdPageProps> = props => {
    
    return (<div>
        <h2>Contact page</h2>
        <Link to= "/home">Go Home</Link>

        </div>
    );
};

export default ThirdPage;