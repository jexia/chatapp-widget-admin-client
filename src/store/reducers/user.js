import * as types from "../consts";

const initialState = {
  user: {
    user_name: "",
    password: "",
    email: "",
  },
  messagesList: [],
  userForDataSet: {
    user: "",
    session_id: "",
  },
  user_id: "",
  date: null,
  last_msg: "",
  user_name: "",
  isUserCreated: false,
  unreadMessage: 0,
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case types.SAVE_USER_NAME:
      return {
        ...state,
        user_name: action.user_name,
      };
    case types.DATE:
      return {
        ...state,
        date: action.date,
        user_id: state.user_id,
        last_msg: action.last_msg,
        unreadMessage: action.unreadMessage,
      };
    case types.DELETE_USER_FROM_DATASET:
      return {
        ...state,
        user_id: state.user_id,
      };
    case types.CREATE_SESSION_ID:
      return {
        ...state,
        session_id: action.session_id,
      };
    case types.ADD_USER_TO_DATASET:
      return {
        ...state,
        userForDataSet: {
          user: action.user,
          session_id: action.session_id,
          date: action.date,
          last_msg: action.last_msg,
        },
        isUserCreated: true,
      };
    case types.ADD_USER_TO_DATASET_SUCCESS:
      return {
        ...state,
        user_id: action.user_id,
      };
    case types.ADD_MESSAGE_TO_LIST:
      return {
        ...state,
        messagesList: action.messagesList,
      };
    case types.TAKE_TOKEN:
      return {
        ...state,
        email: action.email,
        password: action.password,
      } ;
    case types.CREATE_USER:
      return {
        ...state,
        user: {
          user_name: action.user_name,
          password: action.password,
          email: action.email
        }
      };
    case types.REQUEST_LOGIN:
      return {
        ...state,
        user: action.email,
        password: action.password,
      };
    case types.REQUEST_SIGN_IN:
      return {
        ...state,
        user: {
          user_name: action.email,
          password: action.password,
        }
      };
    case types.REQUEST_LOGIN_SUCCESS:
      return {
        ...state,
        user: {
          id: action.id,
          email: action.email,
        }
      };
    default:
      return {
        ...state,
      }
  }
};

export default user;