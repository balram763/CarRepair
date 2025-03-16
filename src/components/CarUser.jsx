import React from "react";
import carimage from "../assets/image.webp";
import { Link } from "react-router-dom";

const CarUser = ({ car }) => {
  return (
    <div
      className="card p-4 shadow-lg mx-auto"
      style={{
        borderRadius: "15px",
        transition: "0.3s ease-in-out",
        cursor: "pointer",
        maxWidth: "800px",
        width: "100%",
        backgroundColor: "#ffffff",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <div className="row align-items-center">
        <div className="col-md-5 text-center">
          <div
            style={{
              width: "100%",
              maxWidth: "350px",
              height: "220px",
              overflow: "hidden",
              borderRadius: "12px",
              border: "2px solid #ddd",
              margin: "auto",
            }}
          >
            <img
              src={carimage}
              alt="Car"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
          <h4 className="text-dark fw-bold mt-3">{car?.car}</h4>
        </div>

        <div className="col-md-7">
          <div className="p-3">
            <p className="text-muted mb-2">
              <strong> Registration:</strong> {car?.registration}
            </p>
            <p className="text-muted mb-2">
              <strong> Description:</strong> {car?.description}
            </p>
            <p className="mb-2 fw-bold">
              <strong>Status:</strong>{" "}
              <span
                className={`badge ${
                  car.status === "closed" ? "bg-danger" : "bg-success"
                }`}
              >
                {car.status}
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-center mt-4">
        <Link className="btn btn-dark px-5 py-2 rounded-3" to={`/cars/${car._id}`}>
          🚗 View More
        </Link>
      </div>
    </div>
  );
};

export default CarUser;

