import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="container p-5">
      <h1 className="display-6 text-danger text-center my-4">
        404 Page Not Found
      </h1>
      <Link to={"/"} className="btn btn-dark w-100 btn-sm">
        Go Back
      </Link>
    </div>
  );
};

export default PageNotFound;
