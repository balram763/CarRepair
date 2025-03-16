import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import carReducer from "./car/carSlice";
import noteReducer from "./note/noteSlice";
import adminReducer from "./admin/adminSlice";


const store = configureStore({
  reducer: {
    auth: authReducer,
    car: carReducer,
    note: noteReducer,
    admin: adminReducer,
  },
});

export default store;
