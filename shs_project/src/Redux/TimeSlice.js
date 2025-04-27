import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: -600, 
};

const timeSlice = createSlice({
  name: "time",
  initialState,
  reducers: {
    setTime: (state, action) => {
      state.value = action.payload; 
    },
    incrementTime: (state, action) => {
      state.value += action.payload; 
    },
  },
});

export const { setTime, incrementTime } = timeSlice.actions; 
export default timeSlice.reducer; 
