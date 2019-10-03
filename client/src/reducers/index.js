import { combineReducers } from "redux"
import authReducer from "./authReducer"
import regionReducer from "./regionReducer"
import whitelistReducer from "./whitelistReducer"
import errorReducer from "./errorReducer"

export default combineReducers({
  auth: authReducer,
  region: regionReducer,
  whitelist: whitelistReducer,
  errors: errorReducer
})