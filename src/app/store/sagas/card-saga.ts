import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  fetchCardRequest,
  fetchCardSuccess,
  fetchCardFailure,
  createCardRequest,
  createCardSuccess,
  createCardFailure,
  updateCardRequest,
  updateCardSuccess,
  updateCardFailure,
  deleteCardRequest,
  deleteCardSuccess,
  deleteCardFailure,
  copyCardRequest,
  copyCardSuccess,
  copyCardFailure,
  updateCardOrderRequest,
  updateCardOrderSuccess,
  updateCardOrderFailure,
} from './../slices/card-slice';
import { Card, CreateCardPayload, UpdateCardPayload, UpdateCardOrderPayload } from '../../types/redux.type';
import { cardApi } from 'src/lib/api';

function* fetchCardSaga(action: PayloadAction<string>) {
  try {
    const card: Card = yield call(cardApi.fetchCard, action.payload);
    yield put(fetchCardSuccess(card));
  } catch (error: any) {
    yield put(fetchCardFailure(error.message || 'Failed to fetch card'));
  }
}

function* createCardSaga(action: PayloadAction<CreateCardPayload>) {
  try {
    const card: Card = yield call(cardApi.createCard, action.payload);
    yield put(createCardSuccess(card));
  } catch (error: any) {
    yield put(createCardFailure(error.message || 'Failed to create card'));
  }
}

function* updateCardSaga(action: PayloadAction<UpdateCardPayload>) {
  try {
    const card: Card = yield call(cardApi.updateCard, action.payload);
    yield put(updateCardSuccess(card));
  } catch (error: any) {
    yield put(updateCardFailure(error.message || 'Failed to update card'));
  }
}

function* deleteCardSaga(action: PayloadAction<string>) {
  try {
    yield call(cardApi.deleteCard, action.payload);
    yield put(deleteCardSuccess(action.payload));
  } catch (error: any) {
    yield put(deleteCardFailure(error.message || 'Failed to delete card'));
  }
}

function* copyCardSaga(action: PayloadAction<string>) {
  try {
    const card: Card = yield call(cardApi.copyCard, action.payload);
    yield put(copyCardSuccess(card));
  } catch (error: any) {
    yield put(copyCardFailure(error.message || 'Failed to copy card'));
  }
}

function* updateCardOrderSaga(action: PayloadAction<UpdateCardOrderPayload>) {
  try {
    const cards: Card[] = yield call(cardApi.updateCardOrder, action.payload.items);
    yield put(updateCardOrderSuccess(cards));
  } catch (error: any) {
    yield put(updateCardOrderFailure(error.message || 'Failed to update card order'));
  }
}

export function* cardSaga() {
  yield takeLatest(fetchCardRequest.type, fetchCardSaga);
  yield takeLatest(createCardRequest.type, createCardSaga);
  yield takeLatest(updateCardRequest.type, updateCardSaga);
  yield takeLatest(deleteCardRequest.type, deleteCardSaga);
  yield takeLatest(copyCardRequest.type, copyCardSaga);
  yield takeLatest(updateCardOrderRequest.type, updateCardOrderSaga);
}
