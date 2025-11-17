import { List } from '@app/types/redux.type';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { cardApi, listApi } from 'src/lib/api';
import { Card } from 'src/types/redux.type';

export const useLists = (boardId: string) => {
  return useQuery({
    queryKey: ['lists', boardId],
    queryFn: () => listApi.getListsByBoardId(boardId),
    enabled: !!boardId,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useCreateList = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: listApi.createList,
    onSuccess: (newList, variables) => {
      // Update cache optimistically
      queryClient.setQueryData(['lists', variables.boardId], (old: List[] = []) => [
        ...old,
        { ...newList, cards: [] },
      ]);
      toast.success('List created successfully');
    },
    onError: (error) => {
      toast.error('Failed to create list');
    },
  });
};

export const useUpdateListOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (
      newOrder: {
        id: string;
        order: number;
        boardId: string;
      }[],
    ) => listApi.updateListOrder(newOrder),
    onMutate: async (newOrder) => {
      const boardId = newOrder[0]?.boardId;
      if (!boardId) return;
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['lists', boardId] });

      // Snapshot the previous value
      const previousLists = queryClient.getQueryData(['lists', boardId]);

      // Optimitics update
      queryClient.setQueryData<any[]>(['lists', boardId], (old) => {
        if (!old) return old;
        const reordered = [...old];

        newOrder.forEach((item) => {
          const target = reordered.find((x) => x.id === item.id);
          if (target) target.order = item.order;
        });

        reordered.sort((a, b) => a.order - b.order);
        return reordered;
      });

      // Return a context object with the snapshotted value
      return { previousLists, boardId };
    },
    onError: (err, newOrder, context) => {
      // Rollback to the previous value
      if (context?.previousLists && context?.boardId) {
        queryClient.setQueryData(['lists', context.boardId], context.previousLists);
      }
      toast.error('Failed to reorder lists');
    },
    onSuccess: () => {
      toast.success('Lists reordered');
    },
    onSettled: (_, __, ___, ctx) => {
      // Invalidate to refetch
       if (ctx?.boardId) {
         queryClient.invalidateQueries({ queryKey: ['lists', ctx.boardId] });
       }
    },
  });
};

export const useCopyList = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: listApi.copyList,
    onSuccess: (copiedList) => {
      queryClient.invalidateQueries({ queryKey: ['lists', copiedList.boardId] });
      toast.success('List copied successfully');
    },
    onError: (error) => {
      toast.error('Failed to copy list');
    },
  });
};

export const useDeleteList = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: listApi.deleteList,
    onSuccess: (_, listId) => {
      // Invalidate all lists queries
      queryClient.invalidateQueries({ queryKey: ['lists'] });
      toast.success('List deleted successfully');
    },
    onError: (error) => {
      toast.error('Failed to delete list');
    },
  });
};

export const useCard = (cardId: string) => {
  return useQuery({
    queryKey: ['card', cardId],
    queryFn: () => cardApi.fetchCard(cardId),
    enabled: !!cardId,
  });
};

export const useCreateCard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cardApi.createCard,
    onSuccess: (newCard, variables) => {
      // Update cache optimistically
      queryClient.setQueryData(['lists'], (old: List[] = []) =>
        old.map((list) =>
          list.id === variables.listId
            ? { ...list, cards: [...(list.cards || []), newCard] }
            : list,
        ),
      );
      toast.success('Card created successfully');
    },
    onError: (error) => {
      toast.error('Failed to create card');
    },
  });
};

export const useUpdateCard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updatedCard: Partial<Card> & { id: string }) =>
      cardApi.updateCard(updatedCard),
    onMutate: async ({ id, ...updates }) => {
      await queryClient.cancelQueries({ queryKey: ['card', id] });

      const previousCard = queryClient.getQueryData<Card>(['card', id]);

      // Optimistic update
      queryClient.setQueryData(['card', id], (old: Card | undefined) => ({
        ...(old || {}),
        ...updates,
      }));

      return { previousCard };
    },
    onError: (err, variables, context) => {
      if (context?.previousCard) {
        queryClient.setQueryData(['card', variables.id], context.previousCard);
      }
      toast.error('Failed to update card');
    },
    onSuccess: () => {
      toast.success('Card updated successfully');
    },
    onSettled: (data, error, variables) => {
      queryClient.invalidateQueries({ queryKey: ['card', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['lists'] });
    },
  });
};

export const useUpdateCardOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newCards: { id: string; order: number; listId: string; boardId: string }[]) =>
      cardApi.updateCardOrder(newCards),
    onMutate: async (newCards) => {
      const boardId = newCards[0]?.boardId;
      if (!boardId) return;
      await queryClient.cancelQueries({ queryKey: ['lists', boardId] });
      const previousLists = queryClient.getQueryData<List[]>(['lists', boardId]);
      queryClient.setQueryData<List[]>(['lists', boardId], (old) => {
        if (!old) return old;

        return old.map((list) => {
          const updatedCards = newCards.filter((c) => c.listId === list.id);
          if (updatedCards.length === 0) return list;

          const newCardsArr = [...list.cards].map((card) => {
            const found = updatedCards.find((c) => c.id === card.id);
            return found ? { ...card, order: found.order, listId: found.listId } : card;
          });

          newCardsArr.sort((a, b) => a.order - b.order);
          console.log("b", newCardsArr)
          return { ...list, cards: newCardsArr };
        });
      });

      return { previousLists, boardId };
    },
    onError: (err, newCards, ctx) => {
      if (ctx?.previousLists && ctx?.boardId) {
        queryClient.setQueryData(['lists', ctx.boardId], ctx.previousLists);
      }
      toast.error('Failed to reorder cards');
    },
    onSuccess: () => {
      toast.success('Cards reordered');
    },
    onSettled: (_, __, ___, ctx) => {
    if (ctx?.boardId) {
      queryClient.invalidateQueries({ queryKey: ['lists', ctx.boardId] });
    }
    },
  });
};
