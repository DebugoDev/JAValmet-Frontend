import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { MoreHorizontal } from "lucide-react";
import Card from "./Card";
import NewCardButton from "./NewCardButton";

interface SortableColumnProps {
  id: string;
  title: string;
}

const SortableColumn = ({ id, title }: SortableColumnProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: isDragging ? "grabbing" : "grab",
    opacity: isDragging ? 0.8 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-neutral-100 rounded w-full max-w-xs flex flex-col shadow-md"
    >
      <div className="flex items-center justify-between p-4 bg-neutral-300 rounded-t-sm mb-3.5">
        <h2 className="font-semibold text-base">{title}</h2>
        <MoreHorizontal className="w-5 h-5 cursor-pointer" />
      </div>
      <NewCardButton />
      <div className="flex flex-col gap-3 p-4">
        <Card status="red" />
        <Card status="pink" />
        <Card status="blue" />
      </div>
    </div>
  );
};

export default SortableColumn;
