import React from "react";
import { Link } from "react-router-dom";

export interface IHomePageProps {}

const HomePage: React.FunctionComponent<IHomePageProps> = (props) => {
  return (
    <div>
      <h1>Home</h1>
      <Link to="/second">Landing</Link>
      <br></br>
      <Link to="/third">Contact</Link>
      <br></br>
      <Link to="/fourth">Fourth</Link>
    </div>
  );
};

export default HomePage;
