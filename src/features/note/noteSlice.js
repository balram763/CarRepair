import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import noteService from "./noteService";

const noteSlice = createSlice({
  name: "note",
  initialState: {
    notes: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNotes.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(getNotes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.notes = action.payload;
      })
      .addCase(getNotes.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createNote.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.notes = [...state.notes, action.payload];
      })
      .addCase(createNote.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export default noteSlice.reducer;

export const getNotes = createAsyncThunk("FETCH/NOTE", async (id, thunkAPI) => {
  const token = thunkAPI.getState().auth.user.token;
  try {
    return await noteService.fetchNotes(id, token);
  } catch (error) {
    const message = error.response.data.message;
    return thunkAPI.rejectWithValue(message);
  }
});

export const createNote = createAsyncThunk(
  "ADD/NOTE",
  async (formData, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    try {
      return await noteService.addNote(formData, token);
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
