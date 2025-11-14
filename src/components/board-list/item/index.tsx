"use client";

import { List } from "@app/types/redux.type";
import { ElementRef, useRef, useState } from "react";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { cn } from "src/lib/utils";
import ListHeader from "../header";
import BoardListCardForm from "../card/form";
import BoardListCardItem from "../card/item";
import { useCopyList, useDeleteList } from "@hooks/lists/useLists";


interface IListItemProps {
  index: number;
  data: List;
  boardId: string;
}

const ListItem = ({ index, data, boardId }: IListItemProps) => {
  const textareaRef = useRef<ElementRef<"textarea">>(null);
  const [isEditing, setIsEditing] = useState(false);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      textareaRef.current?.focus();
    });
  };
  const disableEditing = () => setIsEditing(false);

  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided) => (
        <li
          {...provided.draggableProps}
          ref={provided.innerRef}
          className="group relative flex flex-shrink-0 flex-col w-[350px]"
        >
          <div
            className="sticky top-0 z-[2] w-full flex-shrink-0 bg-custom-background-90 py-1"
            {...provided.dragHandleProps}
          >
            <ListHeader title={data.title} />
            <Droppable droppableId={data.id} type="card">
              {(provided) => (
                <ol
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={cn(
                    'mx-1 px-1 py-0.5 flex flex-col gap-y-2',
                    data.cards.length > 0 && 'mt-2',
                  )}
                >
                  {data.cards
                    ?.slice()
                    ?.sort((a, b) => a.order - b.order)
                    .map((card, index) => (
                      <BoardListCardItem index={index} key={card.id} data={card} />
                    ))}
                  {provided.placeholder}
                </ol>
              )}
            </Droppable>
            <BoardListCardForm
              listId={data.id}
              boardId={boardId}
              ref={textareaRef}
              isEditing={isEditing}
              enableEditing={enableEditing}
              disableEditing={disableEditing}
            />
          </div>
        </li>
      )}
    </Draggable>
  );
};

export default ListItem;
