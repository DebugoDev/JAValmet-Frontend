import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import Column from "./Column"; 

const Board = () => {
  const [columns, setColumns] = useState(["To Do", "In Progress", "Done"]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = columns.indexOf(active.id as string);
      const newIndex = columns.indexOf(over.id as string);
      setColumns(arrayMove(columns, oldIndex, newIndex));
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={columns}
        strategy={horizontalListSortingStrategy}
      >
        <div className="flex flex-col xl:flex-row gap-10 w-full justify-center">
          {columns.map((title) => (
            <Column key={title} id={title} title={title} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default Board;
