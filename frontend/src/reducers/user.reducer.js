const { SET_TOKEN } = require("../constants");

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_TOKEN:
      localStorage.setItem("token", action.payload)
      return {
        ...state,
        token: action.payload,
      };
    default: 
      return state
  }
}

export default userReducer
