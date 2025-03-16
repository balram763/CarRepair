import axios from "axios";

const fetchNotes = async (id, token) => {
  const options = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`https://carrepairbackend.onrender.com/api/user/carservice/${id}/note`, options);
  return response.data;
};

const addNote = async (formData, token) => {

  try {

    if (!(formData instanceof FormData)) {
      const newFormData = new FormData();
      for (const key in formData) {
        newFormData.append(key, formData[key]);
      }
      formData = newFormData;
    }


    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
        
      },
    };


    const response = await axios.post(
      `https://carrepairbackend.onrender.com/api/user/carservice/${formData.id}/note`,
      formData,
      options
    );

    // console.log(response.data)
    return response.data;
  } catch (error) {
    console.error("Error adding note:", error.response?.data || error.message);
  }
};


const noteService = {
  fetchNotes,
  addNote,
};

export default noteService;
