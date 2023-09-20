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
import { createPortal } from "react-dom";

export default function SortableImageGrid({ data }: { data: WikiArt[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [items, setItems] = useState<number[]>([]);
  const [gridData, setGridData] = useState<WikiArt[]>([]);

  useEffect(() => {
    if (data) {
      const allItemId = data.map((_, idx) => {
        const id = idx + 1;
        return id;
      });
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

  function handleDragStart({ active }: DragStartEvent) {
    if (!active) return;
    setActiveId(active.id.toString());
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveId(null);
    const { active, over } = event;
    if (over) {
      if (active.id !== over.id) {
        setItems((items) => {
          const oldIndex = items.indexOf(active.id as number);
          const newIndex = items.indexOf(over.id as number);
          return arrayMove(items, oldIndex, newIndex);
        });
      }
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      onDragCancel={() => setActiveId(null)}
    >
      <SortableContext items={items} strategy={rectSwappingStrategy}>
        <div className="flex flex-wrap gap-2 justify-center">
          {gridData.length === 0 ? (
            <ImageLoadingSkeleton />
          ) : (
            items.map((idx) => {
              const art = gridData[idx - 1];
              return (
                <SortableImageCard
                  key={art.contentId}
                  id={idx}
                  src={art.image}
                  width={art.width}
                  height={art.height}
                  alt={art.title}
                />
              );
            })
          )}
        </div>
      </SortableContext>
    </DndContext>
  );
}
