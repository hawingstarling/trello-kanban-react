"use client";

import React, { ElementRef, useRef } from "react";
import { MoreHorizontal, X } from "lucide-react";
import { toast } from "sonner";

import { Separator } from "src/components/ui/separator";
import { List } from "@app/types/redux.type";
import { useAppDispatch, useAppSelector } from "@store/index";
import { selectListsLoading } from "@store/selectors/list-selectors";
import { copyListRequest, deleteListRequest } from "@store/slices/list-slice";
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "src/components/ui/popover";
import { Button } from "src/components/ui/button";
import FormSubmit from "src/components/form/form-submit";

interface IListOptionsProps {
  onAddCard: () => void;
  data: List;
}

const ListOptions = ({ onAddCard, data }: IListOptionsProps) => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectListsLoading);
  const closePopoverRef = useRef<ElementRef<"button">>(null);

  const onListCopyFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(copyListRequest(data.id));
    toast.success(`List "${data.title}" copied!`);
    closePopoverRef.current?.click();
  };

  const onListDeleteFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(deleteListRequest(data.id));
    toast.success(`List "${data.title}" deleted!`);
    closePopoverRef.current?.click();
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="h-auto w-auto p-2 hover:bg-black/5" variant="ghost">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent side="bottom" align="start" className="px-0 pt-3 pb-3">
        <div className="text-sm font-medium text-center text-neutral-600 pb-4">
          List actions
        </div>
        <PopoverClose asChild>
          <Button
            ref={closePopoverRef}
            className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
            variant="ghost"
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <Button
          className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
          variant="ghost"
          onClick={onAddCard}
        >
          Add card...
        </Button>
        <form onSubmit={onListCopyFormSubmit}>
          <FormSubmit
            variant="ghost"
            disabled={loading}
            className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
          >
            Copy list...
          </FormSubmit>
        </form>
        <Separator />
        <form onSubmit={onListDeleteFormSubmit}>
          <FormSubmit
            variant="ghost"
            disabled={loading}
            className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
          >
            Delete this list
          </FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default ListOptions;
