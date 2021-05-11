import { configureStore, createSlice } from "@reduxjs/toolkit";


const store = createSlice({
  name: "storeReducer",
  initialState: {
    month: new Date().getMonth()+1,
    date: new Date().getDate(),
    day: new Date().getDay(),
    modal: false
  },
  reducers: {
    time: (state, action) =>{
      return {
        month,
        date,
        day
      }
    },
    modal: (state, action) =>{
      return {
        modal: action.payload
      }
    },
  }
});

export const {time, modal} = store.actions;
export default configureStore({reducer: store.reducer});