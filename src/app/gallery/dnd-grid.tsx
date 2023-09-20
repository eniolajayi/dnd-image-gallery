"use client";

import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCenter,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSwappingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { useEffect, useState } from "react";
import SortableItem from "./sortable-item";
import { Item } from "./item";
import SortableImageCard from "./sortable-image-card";

export function DragAndDropGrid() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [items, setItems] = useState(["1", "2", "3"]);
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;
    setActiveId(active.id.toString());
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over === null) {
      return;
    }

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id.toString());
        const newIndex = items.indexOf(over.id.toString());

        return arrayMove(items, oldIndex, newIndex);
      });
    }

    setActiveId(null);
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
    >
      <SortableContext items={items} strategy={rectSwappingStrategy}>
        <div className="flex flex-wrap justify-center">
          {items.map((id) => {
            return (
              <SortableItem id={id}>
                <div className="w-64 h-64 bg-emerald-500 text-slate-200">
                  {id}
                </div>
              </SortableItem>
            );
          })}
        </div>
      </SortableContext>
      {/* <DragOverlay>{activeId ? <Item id={activeId} /> : null}</DragOverlay> */}
    </DndContext>
  );
}
