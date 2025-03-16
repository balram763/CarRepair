import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import BackButton from "../components/BackButton";
import Loading from "../components/Loading";
import { getCars } from "../features/admin/adminSlice";
import { toast } from "react-toastify";

const AllCars = () => {
  const { cars, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.admin
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCars());

    if (isError && message) {
      toast.error(message);
    }
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container p-5">
      <BackButton url={"/"} />
      <h1 className="text-center">All Complaints</h1>

      <table className="table mt-3">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Car</th>
            <th scope="col">Registration</th>
            <th scope="col">Date</th>
            <th scope="col">Status</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {cars?.map((car, index) => {
            return (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{car.car}</td>
                <td>{car.registration}</td>
                <td>{new Date(car.createdAt).toLocaleDateString("EN-IN")}</td>
                <td>
                  <span
                    className={
                      car.status === "closed"
                        ? "badge text-bg-danger"
                        : "badge text-bg-success"
                    }
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
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AllCars;
