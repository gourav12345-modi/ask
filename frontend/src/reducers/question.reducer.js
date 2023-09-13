const { LOGOUT, CREATE_QUESTION, UPDATE_QUESTION, GET_QUESTIONS_REQUEST, GET_QUESTIONS_SUCCESS, GET_QUESTIONS_FAILURE } = require("../constants");

const questionReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_QUESTION:
      const question = action.payload;
      return {...state, questions: [...state.questions, question]}
    
    case UPDATE_QUESTION:
      const updatedQuestion = action.payload;
      const newQuestions = state.questions.map((question) => {
        if(updatedQuestion._id === question._id) return updatedQuestion
        return question
      })
      return {...state, questions: newQuestions}

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
