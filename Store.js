import { configureStore, createSlice } from "@reduxjs/toolkit";

let now = new Date();

const store = createSlice({
  name: "storeReducer",
  initialState: {
    helpBtnSize: false,
    startBtnSize: 1,
    endBtnSize: 1,
    resultBtnSize: 1,
    startBtnColor: "#4D428D",
    endBtnColor: "#4D428D",
    resultBtnColor: "#7675E0",
    switchStartEnd : "start",
    displayTimeModal: false,
    startHour: now.getHours(),
    startMinute: now.getMinutes(),
    saleTimePercent: 0,
    saleResultPercent: 0,
    endtimeWarningModal: false,
  },
  reducers: {
    setHelpModal: (state, action)=>{
      return{
        ...state,
        setHelpModal: action.payload,
      }
    },

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
      if( action.payload.hour === state.endHour && action.payload.minute === state.endMinute )
        return{
          ...state,
          startHour: undefined,
          startMinute: undefined,
          displayTimeModal: false,
          endtimeWarningModal: true,
        }
      else{
        return {
          ...state,
          startHour: action.payload.hour,
          startMinute: action.payload.minute,
          displayTimeModal: false,
          endtimeWarningModal: false,
      }}
    },

    setEndTime: (state, action) =>{
      if( action.payload.hour === state.startHour && action.payload.minute === state.startMinute )
        return{
          ...state,
          endHour: undefined,
          endMinute: undefined,
          displayTimeModal: false,
          endtimeWarningModal: true,
        }
      else{
        return {
          ...state,
          endHour: action.payload.hour,
          endMinute: action.payload.minute,
          displayTimeModal: false,
          endtimeWarningModal: false,
      }}
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
    },

    closeEndTimeWarningModal: (state, action) => {
      return{
        ...state,
        endtimeWarningModal: action.payload,
      }
    }
  }
});

export const {
  setHelpModal,
  setStartBtn,
  setEndBtn,
  setResultBtn,
  toggleTimeModal,
  setStartTime,
  setEndTime,
  setSaleTimePercent,
  setSaleResultPercent,
  closeEndTimeWarningModal} = store.actions;
export default configureStore({reducer: store.reducer});