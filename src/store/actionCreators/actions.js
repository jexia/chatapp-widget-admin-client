import * as consts from "../consts";

// action for create token
export const createToken = (email, password) => ({
  type: consts.TAKE_TOKEN,
  email,
  password,
});

export const createUserToken = (email, password) => ({
  type: consts.CREATE_TOKEN,
  email,
  password,
});

// action for create user
export const createUserName = (user_name, email) => ({
  type: consts.CREATE_USER,
  user_name,
  email,
});

// action for create new message
export const createNewMessage = (message) => ({
  type: consts.CREATE_NEW_MESSAGE,
  message,
});

// action to add message to array
export const addMessageToList = (messagesList) => ({
  type: consts.ADD_MESSAGE_TO_LIST,
  messagesList,
});

// action for admin login
export const requestAdminLogin = (email, password) => ({
  type: consts.REQUEST_LOGIN,
  email,
  password,
});

export const requestLogin = () => ({
  type: consts.REQUEST_SIGN_IN,
});

export const requestLoginSuccess = (id, email) => ({
  type: consts.REQUEST_LOGIN_SUCCESS,
  id,
  email,
});

export const requestAdminLoginFailed = () => ({
  type: consts.REQUEST_LOGIN_FAILED,
});

// save users to Set
export const saveUsersInSet = (users) => ({
  type: consts.SAVE_USERS,
  users,
});

// add user to the global dataset
export const addUserToDataset = (user, session_id, date, last_msg) => ({
  type: consts.ADD_USER_TO_DATASET,
  user,
  session_id,
  date,
  last_msg,
});

export const saveUserName = (user_name) => ({
 type: consts.SAVE_USER_NAME,
  user_name
});

export const addUserToDatasetSuccess = (user_id) => ({
  type: consts.ADD_USER_TO_DATASET_SUCCESS,
  user_id,
});

export const generateSessionID = (session_id) => ({
  type: consts.CREATE_SESSION_ID,
  session_id,
});

export const deleteUser = (user_id) => ({
  type: consts.DELETE_USER_FROM_DATASET,
  user_id,
});

export const dateS = (date, user_id, last_msg,) => ({
  type: consts.DATE,
  date,
  user_id,
  last_msg,
});

export const checkMessages = (payload) => ({
  type: consts.READ_MESSAGE,
  payload,
});