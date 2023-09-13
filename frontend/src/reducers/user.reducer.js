const { SET_TOKEN, LOGOUT } = require("../constants");

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_TOKEN:
      localStorage.setItem("token", action.payload)
      return {
        ...state,
        token: action.payload,
      };
    case LOGOUT:
      localStorage.removeItem("token")
      return {}

    default: 
      return state
  }
}

export default userReducer
