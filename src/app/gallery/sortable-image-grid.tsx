"use client";

import {
  useSensors,
  useSensor,
  MouseSensor,
  TouchSensor,
  KeyboardSensor,
  DragStartEvent,
  DragEndEvent,
  DndContext,
  closestCenter,
  DragOverlay,
} from "@dnd-kit/core";
import {
  sortableKeyboardCoordinates,
  arrayMove,
  SortableContext,
  rectSwappingStrategy,
} from "@dnd-kit/sortable";
import { useEffect, useState } from "react";
import { WikiArt } from "@/shared";
import SortableImageCard from "./sortable-image-card";
import { Item } from "./item";
import ImageLoadingSkeleton from "@/components/image-loading-skeleton";

export default function SortableImageGrid({ data }: { data: WikiArt[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [items, setItems] = useState<number[]>([]);
  const [gridData, setGridData] = useState<WikiArt[]>([]);

  useEffect(() => {
    if (data) {
      const allItemId = data.map((_, idx) => idx);
      setGridData(data);
      setItems(allItemId);
    }
  }, [data]);

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
        const oldIndex = items.indexOf(active.id as number);
        const newIndex = items.indexOf(over.id as number);

        return arrayMove(items, oldIndex, newIndex);
      });
    }

    setActiveId(null);
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
    >
      <SortableContext items={items} strategy={rectSwappingStrategy}>
        <div className="flex flex-wrap gap-2 justify-center">
          {gridData.length === 0 ? (
            <ImageLoadingSkeleton />
          ) : (
            items.map((idx) => {
              return (
                <SortableImageCard
                  key={gridData[idx].contentId}
                  id={idx}
                  src={gridData[idx].image}
                  width={gridData[idx].width}
                  height={gridData[idx].height}
                  alt={gridData[idx].title}
                />
              );
            })
          )}
        </div>
      </SortableContext>
      <DragOverlay>{activeId ? <Item id={activeId} /> : null}</DragOverlay>
    </DndContext>
  );
}
