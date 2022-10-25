import React from "react";
import { nanoid } from "nanoid";
import { DndContext, MouseSensor, useSensor } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  restrictToVerticalAxis,
  restrictToWindowEdges,
} from "@dnd-kit/modifiers";
import type {
  DragStartEvent,
  DragEndEvent,
  UniqueIdentifier,
} from "@dnd-kit/core";

import BlockComponent from "./Block";
import { useBlockStore } from "../app/store";

const SortableBlocks = () => {
  const { blocks, reorderBlocks, addBlock, deleteBlock } = useBlockStore();
  const [activeId, setActiveId] = React.useState<UniqueIdentifier | null>(null);

  const getIndex = (id: UniqueIdentifier) =>
    blocks.findIndex(({ id: blockId }) => blockId === id);
  const activeIndex = activeId ? getIndex(activeId) : -1;

  const sensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 0,
    },
  });

  const onDragStart = ({ active }: DragStartEvent) => {
    if (!active) {
      return;
    }
    setActiveId(active.id);
  };

  const onDragEnd = ({ over }: DragEndEvent) => {
    setActiveId(null);

    if (over) {
      const overIndex = getIndex(over.id);
      if (activeIndex !== overIndex) {
        reorderBlocks(activeIndex, overIndex);
      }
    }
  };

  const handleDeleteBlock = React.useCallback(
    (id: UniqueIdentifier) => {
      deleteBlock(id);
    },
    [deleteBlock]
  );

  const handleAddBlock = (currentBlockId: UniqueIdentifier) => {
    const blockIdx = getIndex(currentBlockId);
    addBlock(
      {
        id: nanoid(),
      },
      blockIdx
    );
  };

  return (
    <DndContext
      modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}
      sensors={[sensor]}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <SortableContext items={blocks} strategy={verticalListSortingStrategy}>
        {blocks.map((block) => (
          <BlockComponent
            key={block.id}
            block={block}
            onDelete={handleDeleteBlock}
            onAdd={handleAddBlock}
          />
        ))}
      </SortableContext>
    </DndContext>
  );
};

export default SortableBlocks;
