import { configureStore, createSlice } from "@reduxjs/toolkit";

const store = createSlice({
  name: "storeReducer",
  initialState: {
    date: new Date().getHours(),
    minute: new Date().getMinutes(),
    displayModal: false
  },
  reducers: {
    time: (state, action) =>{
      return {
        ...state,
        date: action.payload.hour,
        minute: action.payload.minute,
        displayModal: false,
      }
    },
    
    toggleModal: (state, action) =>{
        return {
          ...state,
          displayModal: action.payload
      }
    },
  }
});

export const {time, toggleModal} = store.actions;
export default configureStore({reducer: store.reducer});