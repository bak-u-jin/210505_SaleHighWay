import { configureStore, createSlice } from "@reduxjs/toolkit";


const store = createSlice({
  name: "storeReducer",
  initialState: {
    time: new Date().toLocaleString(),
  },
  reducers: {
    time: (state, action) =>{
      return {
        ...state
      }
    }
  }
});

export const {time} = store.actions;
export default configureStore({reducer: store.reducer});