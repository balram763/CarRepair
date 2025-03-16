import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import adminService from "./adminService";
import { toast } from "react-toastify";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    isLoading: false,
    isSucces: false,
    isError: false,
    users: [],
    cars: [],
    user : [],
    message: "",
  },

  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.isSucces = false;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSucces = true;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSucces = false;
        state.message = action.payload;
      })
      .addCase(getCars.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.isSucces = false;
      })
      .addCase(getCars.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSucces = true;
        state.cars = action.payload;
      })
      .addCase(getCars.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSucces = false;
        state.message = action.payload;
      })
      .addCase(singleUser.pending, (state,action)=>{
        state.isLoading = true;
        state.isError = false;
        state.isSucces = false
      })
      .addCase(singleUser.fulfilled, (state,action)=>{
        state.isLoading = false;
        state.isSucces = true;
        state.isError = false;
        state.user = action.payload
      })
      .addCase(singleUser.rejected, (state,action)=>{
        state.isLoading = false;
        state.isSucces = false;
        state.isError = true;
        state.message = action.payload
      })
      
  },
});

export default adminSlice.reducer;

// Get All Users
export const getUsers = createAsyncThunk("FETCH/USERS", async (_, thunkAPI) => {
  let token = thunkAPI.getState().auth.user.token;

  try {
    return await adminService.fetchUsers(token);
  } catch (error) {
    toast.error("Something went wrong..")
    const message = error.response.data.message;
    return thunkAPI.rejectWithValue(message);
  }
});

// Get All Cars
export const getCars = createAsyncThunk("FETCH/CARS", async (_, thunkAPI) => {
  let token = thunkAPI.getState().auth.user.token;
  try {
    return await adminService.fetchCars(token);
  } catch (error) {
    const message = error.response.data.message;
    return thunkAPI.rejectWithValue(message);
  }
});



export const singleUser = createAsyncThunk("FETCH/SINGLE", async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user?.token;
    if (!token) throw new Error("Unauthorized: No token provided");

    // toast.log(`Fetching user with ID: ${id}`);
    return await adminService.fetchUserDetail(id, token);
  } catch (error) {
    // const message = error.response?.data?.message || error.message || "Something went wrong";
    // toast.error('Something Went Wrong..')
    return thunkAPI.rejectWithValue(message);
  }
});
