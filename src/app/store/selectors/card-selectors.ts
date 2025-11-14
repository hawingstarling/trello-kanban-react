import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../index';

export const selectCardState = (state: RootState) => state.cards;

export const selectAllCards = createSelector(
  [selectCardState],
  (cardState) => cardState.items
);

export const selectCardsLoading = createSelector(
  [selectCardState],
  (cardState) => cardState.loading
);

export const selectCardsError = createSelector(
  [selectCardState],
  (cardState) => cardState.error
);

export const selectCurrentCard = createSelector(
  [selectCardState],
  (cardState) => cardState.currentCard
);

export const selectCardById = (cardId: string) =>
  createSelector([selectAllCards], (cards) =>
    cards.find((card) => card.id === cardId)
  );

export const selectCardsByListId = (listId: string) =>
  createSelector([selectAllCards], (cards) =>
    cards.filter((card) => card.listId === listId).sort((a, b) => a.order - b.order)
  );
