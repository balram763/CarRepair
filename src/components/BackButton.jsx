import React from "react";
import { Link } from "react-router-dom";

const BackButton = ({ url }) => {
  return (
    <Link to={url} className="btn btn-outline-dark">
      Back
    </Link>
  );
};

export default BackButton;
