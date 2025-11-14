import { CreateListPayload, List, ListState, UpdateListOrderPayload, UpdateListPayload } from "@app/types/redux.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: ListState = {
  items: [],
  loading: false,
  error: null,
  currentList: null,
};

const listSlice = createSlice({
  name: 'lists',
  initialState,
  reducers: {
    // Fetch lists
    fetchListsRequest: (state, action: PayloadAction<string>) => {
      state.loading = true;
      state.error = null;
    },
    fetchListsSuccess: (state, action: PayloadAction<List[]>) => {
      state.loading = false;
      state.items = action.payload;
    },
    fetchListsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Create list
    createListRequest: (state, action: PayloadAction<CreateListPayload>) => {
      state.loading = true;
      state.error = null;
    },
    createListSuccess: (state, action: PayloadAction<List>) => {
      state.loading = false;
      state.items.push(action.payload);
    },
    createListFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Update list
    updateListRequest: (state, action: PayloadAction<UpdateListPayload>) => {
      state.loading = true;
      state.error = null;
    },
    updateListSuccess: (state, action: PayloadAction<List>) => {
      state.loading = false;
      const index = state.items.findIndex(list => list.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    updateListFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Delete list
    deleteListRequest: (state, action: PayloadAction<string>) => {
      state.loading = true;
      state.error = null;
    },
    deleteListSuccess: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.items = state.items.filter(list => list.id !== action.payload);
    },
    deleteListFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Copy list
    copyListRequest: (state, action: PayloadAction<string>) => {
      state.loading = true;
      state.error = null;
    },
    copyListSuccess: (state, action: PayloadAction<List>) => {
      state.loading = false;
      state.items.push(action.payload);
    },
    copyListFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Update list order
    updateListOrderRequest: (state, action: PayloadAction<UpdateListOrderPayload>) => {
      state.loading = true;
      state.error = null;
    },
    updateListOrderSuccess: (state, action: PayloadAction<List[]>) => {
      state.loading = false;
      state.items = action.payload;
    },
    updateListOrderFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
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
} = listSlice.actions;

export default listSlice.reducer;
