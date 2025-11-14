import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../index';

export const selectListState = (state: RootState) => state.lists;

export const selectAllLists = createSelector(
  [selectListState],
  (listState) => listState.items
);

export const selectListsLoading = createSelector(
  [selectListState],
  (listState) => listState.loading
);

export const selectListsError = createSelector(
  [selectListState],
  (listState) => listState.error
);

export const selectListById = (listId: string) =>
  createSelector([selectAllLists], (lists) =>
    lists.find((list) => list.id === listId)
  );

export const selectListsByBoardId = (boardId: string) =>
  createSelector([selectAllLists], (lists) =>
    lists.filter((list) => list.boardId === boardId).sort((a, b) => a.order - b.order)
  );
