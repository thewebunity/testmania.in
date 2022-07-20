import { createSlice } from "@reduxjs/toolkit";
import sendRequest from "./sendRequest";

const studentsSlice = createSlice({
  name: "students",
  initialState: {
    students: [],
    student: null,
    isSubmitting: false,
  },
  reducers: {
    setStudents: (state, action) => {
      state.students = action.payload;
    },
    setStudent: (state, action) => {
      state.student = action.payload;
    },
    submitting: (state, action) => {
      state.isSubmitting = action.payload;
    },
    clearStudent: (state) => {
      state.student = null;
   
    },
  },
});

export const studentsActions = studentsSlice.actions;

export const getStudents = () => async (dispatch, getState) => {
  try {
    const data = await sendRequest({
      getState,
      dispatch,
      url: `${process.env.REACT_APP_BASE_URL}/api/v1/students/`,
      method: `GET`,
      body: {},
      functionName: `students`,
    });

    if (data) {
     
      dispatch(studentsActions.setStudents(data.students));
    }
  } catch (error) {
  
  }
};

export const getStudent = (id) => async (dispatch, getState) => {
  try {
    const data = await sendRequest({
      getState,
      dispatch,
      url: `${process.env.REACT_APP_BASE_URL}/api/v1/students/${id}`,
      method: `GET`,
      functionName: `Student`,
    });

    if (data) {
   
      dispatch(studentsActions.setStudent(data.student));
      return data;
    }
  } catch (error) {
   
    return false;
  }
};

export const getProfile = () => async (dispatch, getState) => {
  const { auth } = getState();
  const id = auth.currentUser.id;
 
  try {
    const data = await sendRequest({
      getState,
      dispatch,
      url: `${process.env.REACT_APP_BASE_URL}/api/v1/students/${id}`,
      method: `GET`,
      functionName: `Profile`,
    });

    if (data) {
   
      dispatch(studentsActions.setStudent(data.student));
      return data;
    }
  } catch (error) {
    
    return false;
  }
};

export const editStudent =
  ({ name, password, phone, gender, email, dob , school }) =>
  async (dispatch, getState) => {
    const { auth } = getState();
    const id = auth.currentUser.id;


    try {
      const data = await sendRequest({
        getState,
        dispatch,
        url: `${process.env.REACT_APP_BASE_URL}/api/v1/students/edit`,
        method: `PUT`,
        body: JSON.stringify({
          id,
          name,
          phone,
          school,
          password,
          gender,
          email,
          dob,
        }),
        functionName: `Student`,
      });

      if (data) {
 
        return true;
      }
    } catch (error) {
   
      return false;
    }
  };

  export const sendEmail =
  ({ email, phone, subject, msg, name}) =>
  async (dispatch, getState) => {
  


    try {
      const data = await sendRequest({
        getState,
        dispatch,
        url: `${process.env.REACT_APP_BASE_URL}/api/v1/students/email/send `,
        method: `POST`,
        body: JSON.stringify({
          
          email,
          phone,
          subject,
          
          msg,
          name,
          
        }),
        functionName: `Email`,
      });
console.log(data);
      if (data) {
 
        return true;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };
export default studentsSlice;
