import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
import { useEffect } from "react";
import { toast } from "react-toastify";
import CarUser from "../components/CarUser";
import userImage from '../assets/image3.webp';
import BackButton from "../components/BackButton";

export default function UserProfile() {
  const { user, isLoading, isError, message } = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isError && message) {
      toast.error(message);
    }
  }, [isError, message, dispatch]);

  if (isLoading) {
    return <Loading />;
  }

  const cars = user?.car || [];

  return (
    <div className="container py-5 d-flex justify-content-center align-items-center" style={{ 
      background: 'linear-gradient(to right, rgb(255, 247, 247), rgb(200, 210, 210))', 
      minHeight: '100vh' 
    }}>
      
      <div className="card p-4 shadow-lg text-center" style={{ 
        borderRadius: '15px', backgroundColor: '#ffffff', 
        width: '100%', maxWidth: '900px'
      }}>

        <div style={{width:'50px'}}>
        <BackButton url={"/admin/users"} />
        </div>


  
        <div className="d-flex flex-column align-items-center">
          <img 
            src={userImage} 
            className="rounded-circle shadow-lg mb-3" 
            width="150" 
            height="150" 
            alt="User Avatar" 
            style={{ border: "5px solid #4facfe" }}
          />
          <h3 className="fw-bold text-dark">{user?.user?.name || "N/A"}</h3>
          <p className="text-muted fw-bold">
            <i className="bi bi-envelope me-2 text-primary"></i> {user?.user?.email || "N/A"}
          </p>
          <p className="text-muted fw-bold">
            <i className="bi bi-calendar me-2 text-danger"></i> 
            Created At: {user?.user?.createdAt ? new Date(user.user.createdAt).toLocaleDateString("en-IN") : "N/A"}
          </p>
        </div>

        {/* Divider */}
        <hr className="my-4" />

        {/* Cars Section */}
        <h5 className="text-secondary fw-bold">🚗 User's Cars</h5>
        {cars.length > 0 ? (
          <div className="mt-3">
            {cars.map((car) => (
              <div className="mb-4" key={car._id}>
                <CarUser car={car} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted">No cars found.</p>
        )}
      </div>
    </div>
  );
}

