'use client';

import { Draggable } from '@hello-pangea/dnd';
import React from 'react';
import { Calendar1 } from 'lucide-react';
import { AvatarGroup } from 'src/components/customized/avatar/avatar-13';
import { Avatar, AvatarFallback, AvatarImage } from 'src/components/ui/avatar';
import useCardModal from 'src/hooks/use-card-modal';
import { Card } from 'src/types/redux.type';

interface IBoardListCardItemProps {
  index: number;
  data: Card;
}

const BoardListCardItem = ({ data, index }: IBoardListCardItemProps) => {
  const cardModal = useCardModal();

  const isNote = !data.title && !data.coverImage;

  const dangerouslySetInnerHTML = (textArea: string) => {
    const escaped = textArea.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

    const withLinks = escaped.replace(
      /(https?:\/\/[^\s]+)/g,
      '<a href="$1" target="_blank" class="text-blue-500 underline">$1</a>',
    );

    return withLinks.replace(/\n/g, '<br>');
  };

  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided, snapshot) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={`mb-2 ${snapshot.isDragging ? 'shadow-lg z-[9999]' : ''}`}
        >
          <div
            role="button"
            onClick={() => cardModal.onOpen(data.id)}
            className={`block rounded-[9px] border outline-[0.5px] outline-transparent w-full text-sm transition-all hover:cursor-pointer ${
              isNote
                ? 'min-h-[120px] hover:shadow-md'
                : 'border-[#e5e5e5] bg-white hover:border-[#b9b9b9]'
            } ${snapshot.isDragging ? 'opacity-80' : ''}`}
            style={isNote ? { backgroundColor: data.backgroundColor } : {}}
          >
            {isNote ? (
              <div className="p-3 space-y-2">
                {data.description && (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: dangerouslySetInnerHTML(data.description),
                    }}
                    className="text-[#172B4D] text-sm prose max-w-none line-clamp-10"
                  />
                )}
              </div>
            ) : (
              <div className="space-y-2 px-2.5 py-2.5">
                {data.coverImage && (
                  <img
                    src={data.coverImage}
                    alt="cover"
                    className="rounded-[6px] h-[120px] w-full object-cover"
                  />
                )}
                <div className="flex justify-between items-center">
                  <p
                    className={`text-[#172B4D] font-semibold text-lg ${data.coverImage ? 'mt-2.5' : ''}`}
                  >
                    {data.title}
                  </p>
                  <p>⚡️</p>
                </div>
                {data.description && (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: dangerouslySetInnerHTML(data.description),
                    }}
                    className="text-[#172B4D] text-sm prose max-w-none line-clamp-4"
                  />
                )}
                <div className="mt-2.5 flex justify-between">
                  <div className="flex items-center space-x-2.5">
                    <Calendar1 className="w-6 h-6 stroke-[1.5px] text-[#6D798E]" />
                    <span className="text-[#6D798E] font-semibold text-xs">SEP 30, 2021</span>
                  </div>
                  <AvatarGroup className="flex items-center" max={3}>
                    <Avatar className="-ml-2 first:ml-0 cursor-pointer">
                      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                      <AvatarFallback className="bg-indigo-500 text-white">CN</AvatarFallback>
                    </Avatar>
                    <Avatar className="-ml-2 first:ml-0 cursor-pointer">
                      <AvatarFallback className="bg-green-600 text-white">CN</AvatarFallback>
                    </Avatar>
                    <Avatar className="-ml-2 first:ml-0 cursor-pointer">
                      <AvatarFallback className="bg-red-500 text-white">AB</AvatarFallback>
                    </Avatar>
                  </AvatarGroup>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default BoardListCardItem;
