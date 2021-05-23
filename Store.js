import { configureStore, createSlice } from "@reduxjs/toolkit";

let now = new Date();

const store = createSlice({
  name: "storeReducer",
  initialState: {
    startBtnSize: 1,
    endBtnSize: 1,
    resultBtnSize: 1,
    startBtnColor: "#a6e3e9",
    endBtnColor: "#a6e3e9",
    resultBtnColor: "#0061a8 ",
    switchStartEnd : "start",
    displayTimeModal: false,
    startHour: now.getHours(),
    startMinute: now.getMinutes(),
    saleTimePercent: 0,
    saleResultPercent: 0,
    // endHour: now.getHours()+1,
    // endMinute: now.getMinutes(),
  },
  reducers: {
    setStartBtn: (state, action)=>{
      return{
        ...state,
        startBtnSize: action.payload.size,
        startBtnColor: action.payload.color,
      }
    },
    
    setEndBtn: (state, action)=>{
      return{
        ...state,
        endBtnSize: action.payload.size,
        endBtnColor: action.payload.color,
      }
    },

    setResultBtn: (state, action)=>{
      return{
        ...state,
        resultBtnSize: action.payload.size,
        resultBtnColor: action.payload.color,
      }
    },
    
    toggleTimeModal: (state, action) =>{
      return {
        ...state,
        switchStartEnd: action.payload,
        displayTimeModal: true,
      }
    },

    setStartTime: (state, action) =>{
      if(state.endHour === now.getHours()+1)
        return {
          ...state,
          startHour: action.payload.hour,
          startMinute: action.payload.minute,
          endHour: action.payload.hour+1,
          endMinute: action.payload.minute,
          displayTimeModal: false,  
        }
      else
        return {
          ...state,
          startHour: action.payload.hour,
          startMinute: action.payload.minute,
          displayTimeModal: false,  
        }
    },

    setEndTime: (state, action) =>{
      console.log(action);
      return {
        ...state,
        endHour: action.payload.hour,
        endMinute: action.payload.minute,
        displayTimeModal: false,
      }
    },

    setSaleTimePercent: (state, action) =>{
      return{
        ...state,
        saleTimePercent: action.payload
      }
    },

    setSaleResultPercent: (state, action) => {
      return{
        ...state,
        saleResultPercent: action.payload
      }
    }
  }
});

export const {
  setStartBtn,
  setEndBtn,
  setResultBtn,
  toggleTimeModal,
  setStartTime,
  setEndTime,
  setSaleTimePercent,
  setSaleResultPercent} = store.actions;
export default configureStore({reducer: store.reducer});