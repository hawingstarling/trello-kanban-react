import { Card, CardState, CreateCardPayload, UpdateCardOrderPayload, UpdateCardPayload } from "@app/types/redux.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: CardState = {
  items: [],
  loading: false,
  error: null,
  currentCard: null,
};

const cardSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    // Fetch card by ID
    fetchCardRequest: (state, action: PayloadAction<string>) => {
      state.loading = true;
      state.error = null;
    },
    fetchCardSuccess: (state, action: PayloadAction<Card>) => {
      state.loading = false;
      state.currentCard = action.payload;
    },
    fetchCardFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Create card
    createCardRequest: (state, action: PayloadAction<CreateCardPayload>) => {
      state.loading = true;
      state.error = null;
    },
    createCardSuccess: (state, action: PayloadAction<Card>) => {
      state.loading = false;
      state.items.push(action.payload);
    },
    createCardFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Update card
    updateCardRequest: (state, action: PayloadAction<UpdateCardPayload>) => {
      state.loading = true;
      state.error = null;
    },
    updateCardSuccess: (state, action: PayloadAction<Card>) => {
      state.loading = false;
      const index = state.items.findIndex(card => card.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
      if (state.currentCard?.id === action.payload.id) {
        state.currentCard = action.payload;
      }
    },
    updateCardFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Delete card
    deleteCardRequest: (state, action: PayloadAction<string>) => {
      state.loading = true;
      state.error = null;
    },
    deleteCardSuccess: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.items = state.items.filter(card => card.id !== action.payload);
      if (state.currentCard?.id === action.payload) {
        state.currentCard = null;
      }
    },
    deleteCardFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Copy card
    copyCardRequest: (state, action: PayloadAction<string>) => {
      state.loading = true;
      state.error = null;
    },
    copyCardSuccess: (state, action: PayloadAction<Card>) => {
      state.loading = false;
      state.items.push(action.payload);
    },
    copyCardFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Update card order
    updateCardOrderRequest: (state, action: PayloadAction<UpdateCardOrderPayload>) => {
      state.loading = true;
      state.error = null;
    },
    updateCardOrderSuccess: (state, action: PayloadAction<Card[]>) => {
      state.loading = false;
      state.items = action.payload;
    },
    updateCardOrderFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Clear current card
    clearCurrentCard: (state) => {
      state.currentCard = null;
    },
  },
});

export const {
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
  clearCurrentCard,
} = cardSlice.actions;

export default cardSlice.reducer;
