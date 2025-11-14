export interface Card {
  id: string;
  title?: string;
  coverImage?: string;
  backgroundColor?: string;
  order: number;
  description: string | null;
  listId: string;
  createdAt: string;
  updatedAt: string;
}

export interface List {
  id: string;
  title: string;
  order: number;
  boardId: string;
  cards: Card[];
  createdAt: string;
  updatedAt: string;
}

export interface ListState {
  items: List[];
  loading: boolean;
  error: string | null;
  currentList: List | null;
}

export interface CardState {
  items: Card[];
  loading: boolean;
  error: string | null;
  currentCard: Card | null;
}

export interface CreateListPayload {
  title: string;
  boardId: string;
}

export interface UpdateListPayload {
  id: string;
  title: string;
}

export interface UpdateListOrderPayload {
  items: Array<{ id: string; order: number }>;
}

export interface CreateCardPayload {
  title: string;
  listId: string;
}

export interface UpdateCardPayload {
  id?: string;
  title?: string;
  description?: string;
  coverImage?: string | null;
  listId?: string;
  order?: number;
}

export interface UpdateCardOrderPayload {
  items: Array<{ id: string; order: number; listId: string }>;
}
