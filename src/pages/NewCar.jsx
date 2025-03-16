import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addComplaint } from "../features/car/carSlice";
import { toast } from "react-toastify";
import Loading from "../components/Loading";
import BackButton from "../components/BackButton";

const NewCar = () => {
  const { user } = useSelector((state) => state.auth);
  const { carName, isSuccess, isLoading, isError, message } = useSelector(
    (state) => state.car
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    car: "",
    registration: "",
    description: "",
  });

  const { car, registration, description } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addComplaint(formData));
  };

  useEffect(() => {
    if (isSuccess && carName) {
      navigate("/cars");
    }

    if (isError && message) {
      toast.error(message);
    }
  }, [carName, isSuccess, isError, message]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container p-5">
      <BackButton url={"/"} />
      <h1 className="text-center">Raise Your Complaint!</h1>

      <div className="card p-2 my-3">
        <input
          name="name"
          type="text"
          className="form-control my-1"
          disabled
          value={user.name}
        />
        <input
          type="email"
          className="form-control my-1"
          disabled
          value={user.email}
        />
        <form onSubmit={handleSubmit}>
          <select
            className="form-select my-1"
            name="car"
            value={car}
            onChange={handleChange}
          >
            <option defaultValue={"#"}>Select Your Car</option>
            <option value="safari">Safari</option>
            <option value="punch">Punch</option>
            <option value="nexon">Nexon</option>
            <option value="altroz">altroz</option>
            <option value="alto">alto</option>
            <option value="harrior">Harrier</option>
          </select>
          <input
            type="text"
            className="form-control my-1"
            placeholder="Enter Registraion E.g (MP09IK1995)"
            value={registration}
            name="registration"
            onChange={handleChange}
          />
          <textarea
            className="form-control my-2"
            placeholder="Describe Your Issue"
            required
            value={description}
            name="description"
            onChange={handleChange}
          ></textarea>
          <button className="btn btn-dark w-100 my-2">Raise Complaint</button>
        </form>
      </div>
    </div>
  );
};

export default NewCar;
