import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import carService from "./carService";

const carSlice = createSlice({
  name: "car",
  initialState: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
    carName: {},
    cars: null,
  },
  reducers: {
    reset: (state, action) => {
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        isError: false,
        message: "",
        carName: {},
        cars: [],
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addComplaint.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(addComplaint.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.carName = action.payload;
      })
      .addCase(addComplaint.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(getComplaints.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(getComplaints.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.cars = action.payload;
      })
      .addCase(getComplaints.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(getComplaint.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(getComplaint.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.carName = action.payload;
      })
      .addCase(getComplaint.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(closeComplaint.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(closeComplaint.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.carName = action.payload;
      })
      .addCase(closeComplaint.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      });
  },
});

export const { reset } = carSlice.actions;

export default carSlice.reducer;

// Create Complaint
export const addComplaint = createAsyncThunk(
  "CAR/ADD",
  async (formData, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    try {
      return await carService.raiseComplaint(formData, token);
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get Complaints
export const getComplaints = createAsyncThunk(
  "CARS/FETCH",
  async (_, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    try {
      return await carService.fetchComplaints(token);
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get Complaint
export const getComplaint = createAsyncThunk(
  "CAR/FETCH",
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    try {
      return await carService.fetchComplaint(id, token);
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const closeComplaint = createAsyncThunk(
  "CAR/CLOSE",
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    try {
      return await carService.updateComplaint(id, token);
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
