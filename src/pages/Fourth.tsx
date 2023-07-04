import React from "react";
import { Link } from "react-router-dom";

export interface ILinkPageProps {}

const LinkPage: React.FunctionComponent<ILinkPageProps> = (props) => {
  return (
    <div>
      <Link to="/second">Landing</Link>
      <br></br>
      <Link to="/third">Contact</Link>
      <br></br>
      <Link to="/">Home</Link>
    </div>
  );
};

export default LinkPage;
