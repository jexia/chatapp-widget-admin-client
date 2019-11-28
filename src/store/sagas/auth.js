import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';
import * as constants from '../consts';
import * as actions from '../actionCreators/actions';
import { rmt, dataModule } from "../jexiaConnector";
import { projectID } from '../../consts/config';

const channel = rmt.channel("users");

function* requestToken({ email }) {
  try {
    let data = {
      "method": `ums`,
      email: email.email.replace(/ /g, ""),
      password: email.password.replace(/ /g, ""),
    };

    let response = yield axios.post(
      `https://${projectID}.app.jexia.com/auth`,
      data,
    );
    channel.publish(data);
    yield localStorage.setItem('token', response.data.access_token);

  } catch(e) {
    console.log(e.message);
  }
}


function* signUp({ email }) {
  try {
    let data = {
      method: "ums",
      email: email.email.replace(/ /g, ""),
      password: email.password.replace(/ /g, "")
    };
    yield axios.post(
      `https://${projectID}.app.jexia.com/ums/signup`,
      data
    );

  } catch(e) {
    yield put(actions.requestAdminLoginFailed());
    console.log(e.message);
  }
}

function* signIn() {
  try {
    let token = JSON.parse(localStorage.getItem('__jexia_tokens__')).apikey.access_token;
    let response = yield axios.get(
      `https://${projectID}.app.jexia.com/ums/user`,
      {
        headers: {
          // 'Content-Type': 'application/json',
          'Authorization': "Bearer "+ token,
        }
      }
    );
    yield put(actions.requestLoginSuccess(response.data.id, response.data.email));
  } catch (e) {
    console.log(e.message);
  }

}

function* deleteUser({user_id}) {
  try {
    let token = JSON.parse(localStorage.getItem('__jexia_tokens__')).apikey.access_token;
    let res = yield axios.delete(
      `https://${projectID}.app.jexia.com/ds/users?cond=[{"field":"id"}, "=", "${user_id}"]`,
      {
        headers: {
          "Authorization": "Bearer " + token,
        }
      },
    );
  } catch (e) {
    console.log(e.message);
  }
}

export function* watchAuth() {
  yield takeEvery(constants.REQUEST_LOGIN, signUp);
  yield takeEvery(constants.TAKE_TOKEN, requestToken);
  yield takeEvery(constants.REQUEST_SIGN_IN, signIn);
  yield takeEvery(constants.DELETE_USER_FROM_DATASET, deleteUser);
}
