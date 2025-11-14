import { Card, CreateCardPayload, CreateListPayload, List, UpdateCardPayload, UpdateListPayload } from '@app/types/redux.type';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const listApi = {
  getListsByBoardId: async (boardId: string): Promise<List[]> => {
    const response = await api.get<List[]>(
      `/lists?boardId=${boardId}&_embed=cards&_sort=order&_order=asc`,
    );
    return response.data;
  },

  createList: async (data: CreateListPayload): Promise<List> => {
    // Get current lists to determine order
    const lists = await api.get<List[]>(`/lists?boardId=${data.boardId}&_sort=order&_order=desc`);
    const newOrder = lists.data.length > 0 ? lists.data[0].order + 1 : 1;

    const response = await api.post<List>('/lists', {
      ...data,
      order: newOrder,
      cards: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    return response.data;
  },

  updateList: async (data: UpdateListPayload): Promise<List> => {
    const response = await api.patch<List>(`/lists/${data.id}`, {
      title: data.title,
      updatedAt: new Date().toISOString(),
    });
    return response.data;
  },

  deleteList: async (id: string): Promise<void> => {
    await api.delete(`/lists/${id}`);
  },

  copyList: async (id: string): Promise<List> => {
    const response = await api.get<List>(`/lists/${id}?_embed=cards`);
    const originalList = response.data;

    // Get current lists to determine order
    const lists = await api.get<List[]>(
      `/lists?boardId=${originalList.boardId}&_sort=order&_order=desc`,
    );
    const newOrder = lists.data.length > 0 ? lists.data[0].order + 1 : 1;

    // Create new list
    const newList = await api.post<List>('/lists', {
      title: `${originalList.title} - Copy`,
      boardId: originalList.boardId,
      order: newOrder,
      cards: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    // Copy cards
    if (originalList.cards && originalList.cards.length > 0) {
      for (const card of originalList.cards) {
        await api.post('/cards', {
          title: card.title,
          description: card.description,
          order: card.order,
          listId: newList.data.id,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
      }
    }

    return newList.data;
  },

  updateListOrder: async (items: Array<{ id: string; order: number }>): Promise<List[]> => {
    const promises = items.map((item) =>
      api.patch(`/lists/${item.id}`, {
        order: item.order,
        updatedAt: new Date().toISOString(),
      }),
    );
    const responses = await Promise.all(promises);
    return responses.map((res) => res.data);
  },
};

// Card API
export const cardApi = {
  fetchCard: async (id: string): Promise<Card> => {
    const response = await api.get<Card>(`/cards/${id}`);
    return response.data;
  },

  createCard: async (data: CreateCardPayload): Promise<Card> => {
    // Get current cards to determine order
    const cards = await api.get<Card[]>(`/cards?listId=${data.listId}&_sort=order&_order=desc`);
    const newOrder = cards.data.length > 0 ? cards.data[0].order + 1 : 1;

    const response = await api.post<Card>('/cards', {
      ...data,
      order: newOrder,
      description: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    return response.data;
  },

  updateCard: async (data: UpdateCardPayload): Promise<Card> => {
    const response = await api.patch<Card>(`/cards/${data.id}`, {
      ...data,
      updatedAt: new Date().toISOString(),
    });
    return response.data;
  },

  deleteCard: async (id: string): Promise<void> => {
    await api.delete(`/cards/${id}`);
  },

  copyCard: async (id: string): Promise<Card> => {
    const response = await api.get<Card>(`/cards/${id}`);
    const originalCard = response.data;

    // Get current cards to determine order
    const cards = await api.get<Card[]>(`/cards?listId=${originalCard.listId}&_sort=order&_order=desc`);
    const newOrder = cards.data.length > 0 ? cards.data[0].order + 1 : 1;

    const newCard = await api.post<Card>('/cards', {
      title: `${originalCard.title} - Copy`,
      description: originalCard.description,
      listId: originalCard.listId,
      order: newOrder,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    return newCard.data;
  },

  updateCardOrder: async (items: Array<{ id: string; order: number; listId: string }>): Promise<Card[]> => {
    try {
      const promises = items.map((item) =>
        api.patch(`/cards/${item.id}`, {
          order: item.order,
          listId: item.listId,
          updatedAt: new Date().toISOString(),
        }),
      );
      const responses = await Promise.all(promises);
      return responses.map(res => res.data);
      console.log("a:", responses);
    } catch (error) {
      console.error("error ", error)
    }
  },
};

export default api;
