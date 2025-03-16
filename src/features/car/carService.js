import axios from "axios";

const raiseComplaint = async (formData, token) => {

  let options = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await axios.post("/api/user/carservice/", formData, options);
  
    return response.data;
  } catch (error) {
    // console.error("Error:", error.response?.data || error.message); 
    throw error;
  }
};

const fetchComplaints = async (token) => {
  let options = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get("/api/user/carservice", options);
  return response.data;
};

const fetchComplaint = async (id, token) => {
  let options = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`/api/user/carservice/${id}`, options);
  return response.data;
};

const updateComplaint = async (id, token) => {
  let options = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    `/api/user/carservice/${id}`,
    { status: "closed" },
    options
  );

  return response.data;
};

const carService = {
  raiseComplaint,
  fetchComplaints,
  fetchComplaint,
  updateComplaint,
};

export default carService;
