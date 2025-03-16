import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getComplaints } from "../features/car/carSlice";
import BackButton from "../components/BackButton";
import Loading from "../components/Loading";
import { toast } from "react-toastify";

const AllComplaints = () => {
  const { cars, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.car
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getComplaints());

    if (isError && message) {
      toast.error(message);
    }
  }, [dispatch, isError, message]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <BackButton url={"/"} />
        <h1 className="text-center flex-grow-1">All Complaints</h1>
      </div>

      {/* Responsive Table Wrapper */}
      <div className="table-responsive">
        <table className="table table-striped table-hover mt-3">
          <thead className="table-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Car</th>
              <th scope="col">Description</th>
              <th scope="col">Date</th>
              <th scope="col">Status</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cars?.map((car, index) => (
              <tr key={car._id}>
                <th scope="row">{index + 1}</th>
                <td>{car.car}</td>
                <td>{car.registration}</td>
                <td>
                  {car.createdAt
                    ? new Date(car.createdAt).toLocaleDateString("en-IN")
                    : "N/A"}
                </td>
                <td>
                  <span
                    className={`badge ${
                      car.status === "closed"
                        ? "bg-danger"
                        : "bg-success"
                    }`}
                  >
                    {car.status}
                  </span>
                </td>
                <td>
                  <Link className="btn btn-sm btn-dark" to={`/cars/${car._id}`}>
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllComplaints;

