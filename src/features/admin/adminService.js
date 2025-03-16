import axios from "axios";

const fetchUsers = async (token) => {
  const options = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get("/api/admin/users", options);
  return response.data;
};

const fetchCars = async (token) => {

  //token
  const options = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get("/api/admin/cars", options);
  return response.data;
  
};

const fetchUserDetail = async (id, token) => {
  try {
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.get(`/api/admin/user/${id}`, options);
    return response.data;
  } catch (error) {
    toast.error("Something went wrong..")
    // toast.error("Something went Wrong:", error.response?.data?.message || error.message);
    throw error;
  }
};


const fetchNotes = async (token) => {
  const options = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get("/api/admin/notes", options);
  return response.data;
};

const adminService = {
  fetchUsers,
  fetchCars,
  fetchNotes,
  fetchUserDetail
  
};

export default adminService;
