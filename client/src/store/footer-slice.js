import { createSlice } from "@reduxjs/toolkit";
import sendRequest from "./sendRequest";

const footerSlice = createSlice({
  name: "footers",
  initialState: {
    footers: [],
    footer: null,
    isSubmitting: false,
  },
  reducers: {
    setFooters: (state, action) => {
      state.students = action.payload;
    },
    setFooter: (state, action) => {
      state.student = action.payload;
    },
    submitting: (state, action) => {
      state.isSubmitting = action.payload;
    },
    clearFooter: (state) => {
      state.student = null;
   
    },
  },
});

export const footersActions = footerSlice.actions;



export const getFooter = () => async (dispatch, getState) => {
  try {
    const data = await sendRequest({
      getState,
      dispatch,
      url: `${process.env.REACT_APP_BASE_URL}/api/v1/pages/footer`,
      method: `GET`,
      functionName: `Footer`,
    });

    if (data) {
   
      dispatch(footersActions.setFooters(data.footer));
      return data;
    }
  } catch (error) {
   
    return false;
  }
};