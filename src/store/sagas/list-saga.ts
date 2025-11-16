import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  fetchListsRequest,
  fetchListsSuccess,
  fetchListsFailure,
  createListRequest,
  createListSuccess,
  createListFailure,
  updateListRequest,
  updateListSuccess,
  updateListFailure,
  deleteListRequest,
  deleteListSuccess,
  deleteListFailure,
  copyListRequest,
  copyListSuccess,
  copyListFailure,
  updateListOrderRequest,
  updateListOrderSuccess,
  updateListOrderFailure,
} from '../slices/list-slice';
import { List, CreateListPayload, UpdateListPayload, UpdateListOrderPayload } from '../../types/redux.type';
import { listApi } from 'src/lib/api';

function* fetchListsSaga(action: PayloadAction<string>) {
  try {
    const lists: List[] = yield call(listApi.fetchLists, action.payload);
    yield put(fetchListsSuccess(lists));
  } catch (error: any) {
    yield put(fetchListsFailure(error.message || 'Failed to fetch lists'));
  }
}

function* createListSaga(action: PayloadAction<CreateListPayload>) {
  try {
    const list: List = yield call(listApi.createList, action.payload);
    yield put(createListSuccess(list));
  } catch (error: any) {
    yield put(createListFailure(error.message || 'Failed to create list'));
  }
}

function* updateListSaga(action: PayloadAction<UpdateListPayload>) {
  try {
    const list: List = yield call(listApi.updateList, action.payload);
    yield put(updateListSuccess(list));
  } catch (error: any) {
    yield put(updateListFailure(error.message || 'Failed to update list'));
  }
}

function* deleteListSaga(action: PayloadAction<string>) {
  try {
    yield call(listApi.deleteList, action.payload);
    yield put(deleteListSuccess(action.payload));
  } catch (error: any) {
    yield put(deleteListFailure(error.message || 'Failed to delete list'));
  }
}

function* copyListSaga(action: PayloadAction<string>) {
  try {
    const list: List = yield call(listApi.copyList, action.payload);
    yield put(copyListSuccess(list));
  } catch (error: any) {
    yield put(copyListFailure(error.message || 'Failed to copy list'));
  }
}

function* updateListOrderSaga(action: PayloadAction<UpdateListOrderPayload>) {
  try {
    const lists: List[] = yield call(listApi.updateListOrder, action.payload.items);
    yield put(updateListOrderSuccess(lists));
  } catch (error: any) {
    yield put(updateListOrderFailure(error.message || 'Failed to update list order'));
  }
}

export function* listSaga() {
  yield takeLatest(fetchListsRequest.type, fetchListsSaga);
  yield takeLatest(createListRequest.type, createListSaga);
  yield takeLatest(updateListRequest.type, updateListSaga);
  yield takeLatest(deleteListRequest.type, deleteListSaga);
  yield takeLatest(copyListRequest.type, copyListSaga);
  yield takeLatest(updateListOrderRequest.type, updateListOrderSaga);
}
