import React, { useEffect } from "react";
import { toast } from "react-toastify";
import BackButton from "../components/BackButton";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, singleUser } from "../features/admin/adminSlice";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";

const AllUsers = () => {
  const { users, isLoading, isError, message } = useSelector(
    (state) => state.admin
  );

  const dispatch = useDispatch();

  const handleUser = (id) => {
    dispatch(singleUser(id));
  };

  useEffect(() => {
    dispatch(getUsers());

    if (isError && message) {
      toast.error(message);
    }
  }, [dispatch, isError, message]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container p-3">
      <BackButton url={"/"} />
      <h1 className="text-center my-3">All Users</h1>

      <div className="table-responsive">
        <table className="table table-bordered table-hover text-center">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <Link
                    to="/admin/singleUser"
                    onClick={() => handleUser(user._id)}
                    className="btn btn-sm btn-primary"
                  >
                    View More
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

export default AllUsers;
