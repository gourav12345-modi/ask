const { LOGOUT, GET_QUESTIONS_REQUEST, GET_QUESTIONS_SUCCESS, GET_QUESTIONS_FAILURE } = require("../constants");

const questionReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_QUESTIONS_REQUEST:
      return {...state, questionsLoading: true}
    
    case GET_QUESTIONS_SUCCESS:
      const questions = action.payload
      return {...state, questionsLoading: false, questions}
    
    case GET_QUESTIONS_FAILURE:
      return {...state, questionsLoading: false}

    case LOGOUT:
      return {}

    default: 
      return state
  }
}

export default questionReducer
