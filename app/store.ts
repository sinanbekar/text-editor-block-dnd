import create from "zustand";
import { nanoid } from "nanoid";
import { arrayMove } from "@dnd-kit/sortable";
import { UniqueIdentifier } from "@dnd-kit/core";

export type Block = {
  id: string;
  value?: string;
};

type BlockState = {
  blocks: Block[];
  reorderBlocks: (activeIndex: number, overIndex: number) => void;
  addBlock: (block: Block, idx?: number | null) => void;
  deleteBlock: (id: UniqueIdentifier) => void;
  updateBlockValue: (id: UniqueIdentifier, value: string) => void;
};

const initialData: Block[] = [
  {
    id: nanoid(),
    value: "<p>👋 Hello </p>",
  },
  {
    id: nanoid(),
    value: "<p>Edit Me</p>",
  },
  {
    id: nanoid(),
    value: "<p><strong>Bold</strong></p>",
  },
];

export const useBlockStore = create<BlockState>((set) => ({
  blocks: initialData,
  reorderBlocks(activeIndex, overIndex) {
    set(({ blocks }) => ({
      blocks: arrayMove([...blocks], activeIndex, overIndex),
    }));
  },
  addBlock(block, idx = null) {
    set(({ blocks }) => {
      const tmp = blocks;
      if (idx) {
        tmp.splice(idx + 1, 0, block);
      } else {
        tmp.push(block);
      }

      return {
        blocks: tmp,
      };
    });
  },
  deleteBlock(id) {
    set(({ blocks }) => ({
      blocks: blocks.filter((block) => block.id !== id),
    }));
  },
  updateBlockValue(id, value) {
    set(({ blocks }) => ({
      blocks: blocks.map((block) =>
        block.id === id ? { ...block, value: value } : block
      ),
    }));
  },
}));
