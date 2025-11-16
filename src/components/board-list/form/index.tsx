import React, { ElementRef, useRef, useState } from "react";
import { Plus, X } from "lucide-react";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { toast } from "sonner";
import FormSubmit from "src/components/form/form-submit";
import { Button } from "src/components/ui/button";
import ListWrapper from "../wrapper";
import { useAppDispatch, useAppSelector } from "src/store";
import { selectListsLoading } from "src/store/selectors/list-selectors";
import { useCreateList } from "src/features/lists/useLists";

interface IListFormProps {
  boardId: string;
}

const ListForm = ({ boardId }: IListFormProps) => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectListsLoading);
  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);
  const [isEditing, setIsEditing] = useState(false);

  const createListMutation = useCreateList();

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      disableEditing();
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;

    if (!title || title.trim().length < 3) {
      toast.error("Title must be at least 3 characters");
      return;
    }
    toast.promise(createListMutation.mutateAsync(
      {
        title: title.trim(),
        boardId
      }
    ), {
      loading: 'Adding...',
      success: `List "${title}" created`,
      error: 'Failed to create list.',
    });
    disableEditing();
    formRef.current?.reset();
  };

  useEventListener("keydown", onKeyDown);
  useOnClickOutside(formRef as React.RefObject<HTMLElement>, disableEditing);

  if (isEditing) {
    return (
      <ListWrapper>
        <form
          ref={formRef}
          onSubmit={onSubmit}
          className="w-full p-2 rounded-md bg-white space-y-4 shadow-md"
        >
          <input
            ref={inputRef}
            id="title"
            name="title"
            disabled={loading}
            className="text-sm px-2 py-1 h-7 border border-transparent font-medium hover:border-input focus:border-input transition w-full rounded-sm"
            placeholder="Enter list title..."
          />
          <div className="flex items-center gap-x-1">
            <FormSubmit disabled={loading}>Add list</FormSubmit>
            <Button
              onClick={disableEditing}
              size="sm"
              variant="ghost"
              type="button"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </form>
      </ListWrapper>
    );
  }

  return (
    <ListWrapper>
      <button
        onClick={enableEditing}
        className="w-full rounded-md bg-white/80 hover:bg-white/50 transition p-3 flex items-center font-medium text-sm"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add a list
      </button>
    </ListWrapper>
  );
};

export default ListForm;
