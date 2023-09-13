const { LOGOUT, SET_USER_DATA } = require("../constants");

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      const userData = action.payload
      localStorage.setItem("token", userData.token)
      return {
        ...state,
        ...userData
      };
    case LOGOUT:
      localStorage.removeItem("token")
      return {}

    default: 
      return state
  }
}

export default userReducer
