import { combineReducers } from "redux";
import user from "./user";

export const rootReducer = combineReducers({
  userData: user,
});