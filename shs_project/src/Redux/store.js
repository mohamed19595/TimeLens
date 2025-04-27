import { configureStore } from "@reduxjs/toolkit";
import timeReducer from "./TimeSlice";

const store = configureStore({
  reducer: {
    time: timeReducer, // Add your time slice here
  },
});

export default store;
