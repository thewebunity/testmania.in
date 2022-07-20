import { createSlice } from "@reduxjs/toolkit";
import sendRequest from "./sendRequest";

const pagesSlice = createSlice({
  name: "pages",
  initialState: {
    pages: [],
    page: null,
    isSubmitting: false,
  },
  reducers: {
    setPages: (state, action) => {
      state.students = action.payload;
    },
    setPage: (state, action) => {
      state.student = action.payload;
    },
    submitting: (state, action) => {
      state.isSubmitting = action.payload;
    },
    clearPage: (state) => {
      state.student = null;
   
    },
  },
});

export const pagesActions = pagesSlice.actions;



export const getPage = (name) => async (dispatch, getState) => {
  try {
    const data = await sendRequest({
      getState,
      dispatch,
      url: `${process.env.REACT_APP_BASE_URL}/api/v1/pages/page/${name}`,
      method: `GET`,
      functionName: `Page`,
    });

    if (data) {
   
      dispatch(pagesActions.setPage(data.page));
      return data;
    }
  } catch (error) {
   
    return false;
  }
};