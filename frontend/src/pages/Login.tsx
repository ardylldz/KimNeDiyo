import React from 'react';


export interface ILoginPageProps {
};

const LoginPage: React.FunctionComponent<ILoginPageProps> = props => {

    return (<div>
            <h2>Login</h2>
            <form action="http://localhost:8080/login" method="POST">
                <div>
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" required/>
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" required/>
                </div>
                <div>
                    <button type="submit">Login</button>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;
