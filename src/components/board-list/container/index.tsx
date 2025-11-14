import { useAppDispatch, useAppSelector } from "@store/index";
import { selectListsByBoardId, selectListsLoading } from "@store/selectors/list-selectors";
import { updateCardOrderRequest } from "@store/slices/card-slice";
import { fetchListsRequest, updateListOrderRequest } from "@store/slices/list-slice";
import { useCallback, useEffect } from "react";
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import { toast } from "sonner";
import ListItem from "../item";
import ListForm from "../form";
import { useLists, useUpdateCardOrder, useUpdateListOrder } from "@hooks/lists/useLists";

interface IListContainerProps {
  boardId: string;
}

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

const ListContainer = ({ boardId }: IListContainerProps) => {
  const { data: lists = [], isLoading, error } = useLists(boardId);
  const updateListOrderMutation = useUpdateListOrder();
  const updateCardOrderMutation = useUpdateCardOrder();

  const onDragEnd = useCallback(
    (dropResult: DropResult) => {
      const { destination, source, type } = dropResult;

      if (!destination) {
        return;
      }

      if (destination.droppableId === source.droppableId && destination.index === source.index) {
        return;
      }

      // on list order change
      if (type === 'list') {
        const reorderedLists = reorder(lists, source.index, destination.index);
        const items = reorderedLists.map((item, index) => ({
          id: item.id,
          order: index,
          boardId,
        }));

        toast.promise(updateListOrderMutation.mutateAsync(items), {
          loading: 'List reorder loading...',
          success: 'List reordered.',
          error: 'Failed to reorder list.',
        });
      }
      // Handle card reordering
      if (type === 'card') {
        const sourceList = lists.find((list) => list.id === source.droppableId);
        const destinationList = lists.find((list) => list.id === destination.droppableId);

        if (!sourceList || !destinationList) {
          return;
        }

        // Same list reordering
        if (source.droppableId === destination.droppableId) {
          const reorderedCards = reorder(sourceList.cards, source.index, destination.index);
          const items = reorderedCards.map((card, idx) => ({
            id: card.id,
            order: idx,
            listId: sourceList.id,
            boardId,
          }));

          toast.promise(updateCardOrderMutation.mutateAsync(items), {
            loading: 'Card reorder loading...',
            success: 'Card reordered.',
            error: 'Failed to reorder card.',
          });
        } else {
          // Moving card to different list
          const sourceCards = Array.from(sourceList.cards);
          const [movedCard] = sourceCards.splice(source.index, 1);
          // movedCard.listId = destinationList.id;

          const destCards = Array.from(destinationList.cards);
          destCards.splice(destination.index, 0, movedCard);

          const sourceItems = sourceCards.map((card, idx) => ({
            id: card.id,
            order: idx,
            listId: sourceList.id,
            boardId,
          }));

          const destItems = destCards.map((card, idx) => ({
            id: card.id,
            order: idx,
            listId: destinationList.id,
            boardId
          }));

          toast.promise(
            updateCardOrderMutation.mutateAsync([...sourceItems, ...destItems]),
            {
              loading: 'Card reorder loading...',
              success: 'Card moved.',
              error: 'Failed to move card.',
            },
          );
        }
      }
    },
    [lists, updateListOrderMutation, updateCardOrderMutation],
  );

  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }

  return (
   <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="lists" type="list" direction="horizontal">
        {(provided) => (
          <ol
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex gap-x-3 h-full"
          >
            {lists?.length > 0 && lists.map((list, idx) => (
              <ListItem key={list.id} boardId={boardId} index={idx} data={list} />
            ))}
            {provided.placeholder}
            <ListForm boardId={boardId} />
            <div className="flex-shrink-0 w-1" />
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default ListContainer;
