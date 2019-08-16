import { combineReducers } from "redux"
import authReducer from "./authReducer"
import regionReducer from "./regionReducer"
import errorReducer from "./errorReducer"

export default combineReducers({
  auth: authReducer,
  region: regionReducer,
  errors: errorReducer
})