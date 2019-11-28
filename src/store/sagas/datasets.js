import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';
import * as constants from '../consts';
import * as actions from '../actionCreators/actions';
import { projectID } from '../../consts/config';

function* addUserToDataset ( { user } ) {
  try {
    let newUser = {
      user: user.user,
      session_id: user.session_id,
      date: user.date,
      last_msg: user.last_msg,
      unread: true,
    };
    let token = JSON.parse(localStorage.getItem('__jexia_tokens__')).apikey.access_token;
    const res = yield axios.post(
      `https://${projectID}.app.jexia.com/ds/users`,
      newUser,
      {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": "Bearer " + token,
        }
      }
    );
    let users_id = res.data.map(el => el.id);
    yield put(actions.addUserToDatasetSuccess(...users_id));
  } catch (e) {
    console.log(e.message)
  }
}

function* updateDatasetDate( { date, user_id, last_msg } ) {
  try {
    console.log(user_id);
    let token = JSON.parse(localStorage.getItem('__jexia_tokens__')).apikey.access_token;
    let data = {
      date,
      last_msg,
      unread: true,
    };
    const res = yield axios.patch(
      `https://${projectID}.app.jexia.com/ds/users?cond=[{"field":"id"},"=","${user_id}"]`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": "Bearer " + token,
        }
      }
    );
  } catch (e) {
    console.log(e.message);
  }
}

export function* watchDataset() {
  yield takeEvery(constants.ADD_USER_TO_DATASET, addUserToDataset);
  yield takeEvery(constants.DATE, updateDatasetDate);
}
