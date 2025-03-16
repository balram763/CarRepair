import React, { useEffect, useState } from "react";
import BackButton from "../components/BackButton";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { closeComplaint, getComplaint } from "../features/car/carSlice";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import { createNote, getNotes } from "../features/note/noteSlice";
import image from '../assets/image2.webp'

const SingleComplaints = () => {
  const [text, setText] = useState("");
  const [pic,setPic] = useState()

  const { carName, isLoading, isError, message } = useSelector(
    (state) => state.car
  );
  const { notes } = useSelector((state) => state.note);
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const { id } = useParams();


  const handleImageChange = (e) => {
    const file = e.target.files[0]; 
    if (file) {
      setPic(file); // Store file in state
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    if(pic){
      dispatch(createNote({
        id,
        text,
        img : pic
      }));
    }
    else {
      dispatch(createNote({id,text}))
    }

    
    toast.success("Note Added!");
    setText("");
    setPic(null)
  };

  // Close Complaint
  const handleCloseComplaint = () => {
    dispatch(closeComplaint(id));
    toast.success("Complaint Closed!");
  };

  useEffect(() => {
    dispatch(getComplaint(id));
    dispatch(getNotes(id));

    if (isError && message) {
      toast.error(message);
    }
  }, [isError, message]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container p-5">
      <BackButton url={"/cars"} />

      <div className="card p-3 d-flex flex-column flex-md-row align-items-center justify-content-between my-3">
        <div className="text-center text-md-start">
          <h3 className="my-2">Your Car : {carName?.car}</h3>
          <h4 className="my-2">Registration : {carName?.registration}</h4>
          <h5 className="my-2">
            Status : {" "}
            <span
            className={
              carName.status === "closed"
            ? "badge text-bg-danger"
            : "badge text-bg-success"
            }
            >
              {carName.status}
              </span>
              </h5>
              <p className="my-2 text-secondary">Description : {carName.description}</p>
              </div>
               <img
               src={image}
               alt="Car"
               className="img-fluid rounded mt-3 mt-md-0"
               style={{ height: "25vh", maxWidth: "100%", objectFit: "cover" }}
               />
              </div>


      
      <div className="overflow-scroll" style={{height:"70vh"}}>


      <div className="card p-3 my-3">
        <h4 className="text-secondary">Notes : </h4>

        <ul className="list-group">
          {notes?.map((note) => {
            return (
              
              <li
                key={note?._id}
                className={
                  note?.isStaff
                    ? "list-group-item bg-light"
                    : "list-group-item"
                }
              >
                {
                  note.image ?
                  <div>
                  <img src={`https://carrepairbackend.onrender.com${note.image}`} style={{height:'100%',width:"30vh"}} alt="image" /></div> :<></>
                }
                <h1 className="mt-2 h5">{note?.note}</h1>
                {note?.isStaff ? (
                  <p className="text-primary">- From Staff</p>
                ) : (
                  <p className="text-secondary">- User</p>
                )}
              </li>
              
              
            );
          })}
        </ul>

        <div className="card p-3 my-3">
        <h4>Add Note : </h4>
        <form onSubmit={handleSubmit}>
          <input 
          type="file" 
          className="py-3"
          onChange={handleImageChange}
          disabled={carName.status == 'closed'}/>
           <input
            type="text"
            required
            className="form-control"
            disabled={carName.status == 'closed'}
            placeholder="Enter Note Here.."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />




          <button type="submit" className="btn btn-sm btn-dark my-3">
            Add Note
          </button>
        </form>
      </div>

    </div>






      </div>

      <button
        className="btn btn-danger my-3 w-100"
        disabled={carName.status === "closed" ? true : false}
        onClick={handleCloseComplaint}
      >
        Close Ticket
      </button>
    </div>
  );
};

export default SingleComplaints;
