"use client";

import React, { ElementRef, KeyboardEventHandler, forwardRef, useRef } from "react";
import { Plus, X } from "lucide-react";
import { toast } from "sonner";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import FormSubmit from "src/components/form/form-submit";
import { Button } from "src/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { useCreateCard } from "src/features/lists/useLists";
import { useAppSelector } from "src/store";
import { selectCardsLoading } from "src/store/selectors/card-selectors";

interface IBoardListCardFormProps {
  listId: string;
  boardId: string;
  enableEditing: () => void;
  disableEditing: () => void;
  isEditing: boolean;
}

const BoardListCardForm = forwardRef<HTMLTextAreaElement, IBoardListCardFormProps>(
  ({ listId, isEditing, disableEditing, enableEditing, boardId }, ref) => {
    const createCardMutation = useCreateCard();
    const loading = useAppSelector(selectCardsLoading);
    const formRef = useRef<ElementRef<"form">>(null);
    const queryClient = useQueryClient();

    const onCardCreateSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const title = formData.get("title") as string;

      if (!title || title.trim().length < 3) {
        toast.error("Title must be at least 3 characters");
        return;
      }
      toast.promise(
        createCardMutation.mutateAsync({
          title: title.trim(),
          listId,
        }, {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['lists', boardId] });
          }
        }),
        {
          loading: 'Adding...',
          success: `Card "${title}" created!`,
          error: 'Failed to create card.',
        },
      );

      formRef.current?.reset();
      disableEditing();
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        disableEditing();
      }
    };

    useOnClickOutside(formRef as React.RefObject<HTMLElement>, disableEditing);
    useEventListener("keydown", onKeyDown);

    const onTextAreaKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        formRef.current?.requestSubmit();
      }
    };

    if (isEditing) {
      return (
        <form
          ref={formRef}
          onSubmit={onCardCreateSubmit}
          className="m-1 py-0.5 px-1 space-y-4 bg-[#f7f7f7] sticky bottom-0"
        >
          <div className="m-1 overflow-hidden rounded">
            <div className="flex flex-col w-full items-center gap-x-3 bg-white">
              <textarea
                id="title"
                name="title"
                ref={ref}
                onKeyDown={onTextAreaKeyDown}
                placeholder="Work item title"
                disabled={loading}
                className="w-full rounded-md bg-transparent px-2 py-1.5 pl-0 text-sm font-medium leading-5 text-custom-text-200 outline-none pt-3 !px-3"
                rows={3}
              />
              <div className="w-full flex gap-x-1">
                <FormSubmit disabled={loading}>Add a card</FormSubmit>
                <Button type="button" onClick={disableEditing} size="sm" variant="ghost">
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <div className="w-full px-3 py-2 text-xs italic text-[#3a3a3a] bg-gray-100">
                Press 'Enter' to add another work item
              </div>
            </div>
          </div>
        </form>
      );
    }

    return (
      <div className="pt-2 px-2">
        <Button
          size="sm"
          variant="ghost"
          onClick={enableEditing}
          className="flex w-full cursor-pointer items-center gap-2 py-1.5 text-[#828282] hover:text-[#525252] justify-start"
        >
          <Plus className="h-4 w-4" />
          <span className="text-sm font-medium">New Work item</span>
        </Button>
      </div>
    );
  }
);

BoardListCardForm.displayName = "BoardListCardForm";
export default BoardListCardForm;
