import { GET_QUESTIONS_FAILURE, GET_QUESTIONS_REQUEST, GET_QUESTIONS_SUCCESS } from "../constants";
import * as api from "../api"

const getQuestions = () => async (dispatch) => {
  dispatch({ type: GET_QUESTIONS_REQUEST });
  try {
    const { data } = await api.getQuestions()
    dispatch({ type: GET_QUESTIONS_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: GET_QUESTIONS_FAILURE })
  }
};

export {
  getQuestions
}
