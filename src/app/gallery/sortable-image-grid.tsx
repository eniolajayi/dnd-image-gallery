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
import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { WikiArt } from "@/shared";
import SortableImageCard from "./sortable-image-card";
import ImageLoadingSkeleton from "@/components/image-loading-skeleton";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function SortableImageGrid({ data }: { data: WikiArt[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [items, setItems] = useState<number[]>([]);
  const [gridData, setGridData] = useState<WikiArt[]>([]);
  const tags = useSearchParams().get("tags");
  // const [searchTerm, setSearchTerm] = useState("");

  const createRange = (arr: {}[]) => {
    return arr.map((_, idx) => idx + 1);
  };

  const updateData = (newData: WikiArt[]) => {
    setGridData(newData);
    setItems(createRange(newData));
  };

  useEffect(() => {
    updateData(data);
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

  // const handleSearchInputChanges = (event: ChangeEvent<HTMLInputElement>) => {
  //   setSearchTerm(event.target.value);
  // };

  // const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  // };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      onDragCancel={() => setActiveId(null)}
    >
      {/* <div className="text-center mb-4 flex flex-col items-center gap-2">
        <form
          onSubmit={handleSearchSubmit}
          className="relative w-[min(24rem,100%)]"
        >
          <Input
            type="search"
            id="search"
            value={searchTerm}
            placeholder={"Filter art piece by tags (i.e title)"}
            onChange={handleSearchInputChanges}
            className="transparent"
          />
          <Button
            size={"icon"}
            className="absolute top-0 right-1 bg-transparent "
          >
            <Search className="w-4 h-4" />
          </Button>
        </form>
        
      </div> */}
      {tags && (
        <div className="text-center mb-4">
          <Link
            className="underline text-semibold text-blue-600"
            href={"/gallery"}//?tag=
          >
            Clear results
          </Link>
        </div>
      )}

      <SortableContext items={items} strategy={rectSwappingStrategy}>
        <div className="flex flex-wrap gap-2 justify-center">
          {gridData.length === 0 ? (
            <ImageLoadingSkeleton />
          ) : (
            gridData.map((art, idx) => {
              // if gridData is 0 idx meaning on element items should be 1
              return (
                <SortableImageCard
                  key={art.contentId}
                  id={idx + 1}
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
