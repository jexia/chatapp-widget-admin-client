import { all } from 'redux-saga/effects';
import { watchAuth } from './auth';
import { watchDataset } from "./datasets";

export default function* rootSaga() {
  yield all([
    watchAuth(),
    watchDataset()
  ]);
}