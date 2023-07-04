import React from 'react';
import { Link } from 'react-router-dom';

export interface ISecondPageProps {};


const SecondPage: React.FunctionComponent<ISecondPageProps> = props => {
    
    return (<div>
        <h2>Landing page</h2>
        <Link to= "/">Go Home</Link>
        </div>
    );
};

export default SecondPage;