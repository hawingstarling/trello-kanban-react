"use client";

import { List } from "@app/types/redux.type";
import { useAppDispatch, useAppSelector } from "@store/index";
import { updateListRequest } from "@store/slices/list-slice";
import React, { ElementRef, useRef, useState } from "react";
import { toast } from "sonner";
import { useEventListener } from "usehooks-ts";
import ListOptions from "../options";
import { selectListsLoading } from "@store/selectors/list-selectors";
import { Circle } from "lucide-react";

interface IListHeaderProps {
  icon?: React.ReactNode;
  title: string;
}

const ListHeader = ({ icon, title }: IListHeaderProps) => {


  return (
    <>
      <div className={`relative flex flex-shrink-0 gap-2 p-1.5 w-full flex-row items-center`}>
        <div className="flex h-[25px] w-[20px] flex-shrink-0 items-center justify-center overflow-hidden rounded-sm">
          {icon ? icon : <Circle width={14} strokeWidth={2} />}
        </div>

        <div className={`relative flex items-center gap-1 w-full flex-row overflow-hidden`}>
          <div
            className={`line-clamp-1 inline-block overflow-hidden truncate font-medium text-custom-text-100`}
          >
            {title}
          </div>
          {/* <div className={`flex-shrink-0 text-sm font-medium text-custom-text-300 pl-2`}>{count || 0}</div> */}
        </div>
      </div>
    </>
  );
};

export default ListHeader;
