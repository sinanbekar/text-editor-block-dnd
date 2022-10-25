import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { UniqueIdentifier } from "@dnd-kit/core";
import Editor from "./Editor";
import { useBlockStore, Block } from "../app/store";

interface BlockComponentProps {
  block: Block;
  onDelete: (id: UniqueIdentifier) => void;
  onAdd: (currentId: UniqueIdentifier) => void;
}

const BlockComponent = ({ block, onAdd, onDelete }: BlockComponentProps) => {
  const { id, value } = block;
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const { updateBlockValue } = useBlockStore();

  const update = React.useCallback(
    (value: string) => {
      updateBlockValue(id, value);
    },
    [id, updateBlockValue]
  );

  return (
    <div
      ref={setNodeRef}
      style={style}
      aria-label="block"
      className="-ml-24 group flex w-full rounded items-center"
      {...attributes}
    >
      <div className="h-full px-2 pl-4 py-1.5 text-center cursor-pointer transition-all duration-150 text-neutral-300 flex">
        <button aria-label="Delete Block" onClick={() => onDelete(id)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 hover:bg-neutral-100 hover:text-neutral-400 p-0.5 rounded group-hover:opacity-100 opacity-0"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 12h-15"
            />
          </svg>
        </button>
        <button aria-label="Add Block" onClick={() => onAdd(id)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 hover:bg-neutral-100 hover:text-neutral-400 p-0.5 rounded group-hover:opacity-100 opacity-0"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </button>

        <button
          aria-label="Drag Indicator"
          ref={setActivatorNodeRef}
          {...listeners}
        >
          <svg
            className="w-6 h-6 hover:bg-neutral-100 hover:text-neutral-400 p-0.5 rounded group-hover:opacity-100 opacity-0"
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M11 18c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm-2-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
          </svg>
        </button>
      </div>

      <div className="w-full relative cursor-text px-4 sm:px-0">
        <Editor value={value} update={update} />
      </div>
    </div>
  );
};

export default BlockComponent;
