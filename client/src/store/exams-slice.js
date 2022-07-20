import { createSlice } from "@reduxjs/toolkit";
import sendRequest from "./sendRequest";

const examsSlice = createSlice({
  name: "exams",
  initialState: {
    exams: [],
    exam: null,
    current: null,
    isSubmitting: false,
  },
  reducers: {
    setExams: (state, action) => {
      state.exams = action.payload;
    },
    setExam: (state, action) => {
      state.exam = action.payload;
    },
    setCurrentExam: (state, action) => {
      state.current = action.payload;
    },
    submitting: (state, action) => {
      state.isSubmitting = action.payload;
    },
    clearExam: (state) => {
      state.exam = null;
   
    },
    clearExams: (state) => {
      state.exams = [];
      
    },
    setAnswer: (state, action) => {
      const { index, val } = action.payload;
      state.current.questions[index].selectedAnswer = val;
    },
    setFlag: (state, action) => {
      const { index, flag } = action.payload;
      state.current.questions[index].isFlagged = flag;
    },
  },
});

export const examsActions = examsSlice.actions;

export const getExams = () => async (dispatch, getState) => {
  const { auth } = getState();
  const id = auth.currentUser.id;
  try {
    const data = await sendRequest({
      getState,
      dispatch,
      url: `${process.env.REACT_APP_BASE_URL}/api/v1/exams/${id}`,
      method: `GET`,
      body: {},
      functionName: `Exams`,
    });

    if (data) {
   
      dispatch(examsActions.setExams(data.exams));
      return true;
    }
  } catch (error) {
    
  }
};

export const getAvailableExams = () => async (dispatch, getState) => {
  try {
    const data = await sendRequest({
      getState,
      dispatch,
      url: `${process.env.REACT_APP_BASE_URL}/api/v1/exams/available`,
      method: `GET`,
      body: {},
      functionName: `Exams`,
    });

    if (data) {
   
      dispatch(examsActions.setExams(data.exams));
      return true;
    }
  } catch (error) {
    
    return false;
  }
};

export const getExam = (examId) => async (dispatch, getState) => {
  const { auth } = getState();
  const id = auth.currentUser.id;

  try {
    const data = await sendRequest({
      getState,
      dispatch,
      url: `${process.env.REACT_APP_BASE_URL}/api/v1/students/${id}/current-exam/${examId}`,
      method: `GET`,
      functionName: `Exam`,
    });

    if (data) {
     
      dispatch(examsActions.setExam(data.exam));
      return data;
    }
  } catch (error) {
   
    return false;
  }
};

export const beginExam = (examId) => async (dispatch, getState) => {
  const { auth } = getState();

  try {
    const data = await sendRequest({
      getState,
      dispatch,
      url: `${process.env.REACT_APP_BASE_URL}/api/v1/exams/begin`,
      method: `POST`,
      body: JSON.stringify({ id: auth.currentUser.id, examId: examId }),
      functionName: `Begin Exam`,
    });

    if (data) {
     
      window.localStorage.setItem("remainingTime", data.duration * 60 * 1000);
      return true;
    }
  } catch (err) {
    
  }
};

export const getCurrentExam = (examId) => async (dispatch, getState) => {
  const { auth } = getState();
  const id = auth.currentUser.id;

  try {
    const data = await sendRequest({
      getState,
      dispatch,
      url: `${process.env.REACT_APP_BASE_URL}/api/v1/students/${id}/current-exam/${examId}`,
      method: `GET`,
      functionName: `Exam`,
    });

    if (data) {
  
      dispatch(examsActions.setCurrentExam(data.exam));
      return true;
    }
  } catch (error) {
    
    return false;
  }
};

export const updateAnswer =
  ({ val, index }) =>
  async (dispatch, getState) => {
    dispatch(examsActions.setAnswer({ val, index }));

    const { auth, exams } = getState();
    const id = auth.currentUser.id;
    const exam = exams.current;

    try {
      const data = await sendRequest({
        getState,
        dispatch,
        url: `${process.env.REACT_APP_BASE_URL}/api/v1/students/update-exam`,
        method: `PUT`,
        body: JSON.stringify({
          id,
          exam,
        }),
        functionName: `Update Answer`,
      });

      if (data) {
        dispatch(getCurrentExam(exam._id));
        return true;
      }
    } catch (error) {
      
      return false;
    }
  };

export const updateFlag =
  ({ flag, index }) =>
  async (dispatch, getState) => {
    dispatch(examsActions.setFlag({ flag, index }));

    const { auth, exams } = getState();
    const id = auth.currentUser.id;
    const exam = exams.current;

    try {
      const data = await sendRequest({
        getState,
        dispatch,
        url: `${process.env.REACT_APP_BASE_URL}/api/v1/students/update-exam`,
        method: `PUT`,
        body: JSON.stringify({
          id,
          exam,
        }),
        functionName: `Update Answer`,
      });

      if (data) {
        dispatch(getCurrentExam(exam._id));
        return true;
      }
    } catch (error) {
      
      return false;
    }
  };

export const submitExam = () => async (dispatch, getState) => {
  window.localStorage.removeItem("remainingTime");
  const { auth, exams } = getState();
  const id = auth.currentUser.id;
  const exam = exams.current;

  try {
    const data = await sendRequest({
      getState,
      dispatch,
      url: `${process.env.REACT_APP_BASE_URL}/api/v1/students/submit-exam`,
      method: `PUT`,
      body: JSON.stringify({
        id,
        exam,
      }),
      functionName: `Submit Exam`,
    });

    if (data) {
      dispatch(getExams());
      return true;
    }
  } catch (error) {
  
    return false;
  }
};

export const examdate =
  () =>
  async (dispatch, getState) => {
    try {
      const data = await sendRequest({
        getState,
        dispatch,
        url: `${process.env.REACT_APP_BASE_URL}/api/v1/exams/exam_date`,
        method: `GET`,
       
        functionName: `examdate`,
      });

      if (data) {
 
        return true;
      }
    } catch (error) {
  
      return false;
    }
  };


  export const getLastExams = () => async (dispatch, getState) => {
    const { auth } = getState();
    
    try {
      const data = await sendRequest({
        getState,
        dispatch,
        url: `${process.env.REACT_APP_BASE_URL}/api/v1/exams/exams/last`,
        method: `GET`,
        body: {},
        functionName: `Exams`,
      });
  
      if (data) {
     
        
        return data.exams;
      }
    } catch (error) {
      
    }
  };

export default examsSlice;
