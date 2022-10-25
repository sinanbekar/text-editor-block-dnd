import React from "react";
import { nanoid } from "nanoid";
import { useBlockStore } from "../app/store";
import SortableBlocks from "../components/SortableBlocks";

export default function Home() {
  const { addBlock } = useBlockStore();
  return (
    <div className="container mx-auto px-8">
      <div className="flex shrink-0 px-24">
        <div className="w-[65ch] mx-auto my-24">
          <SortableBlocks />
        </div>
        <div className="mt-24">
          <button
            onClick={() =>
              addBlock({
                id: nanoid(),
              })
            }
            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
