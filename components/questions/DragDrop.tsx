'use client';

import { useMemo, useState } from 'react';
import {
  DndContext,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  useDraggable,
  useDroppable,
  type DragEndEvent,
} from '@dnd-kit/core';
import { motion } from 'framer-motion';
import type { DragDropData } from '@/lib/types';

interface DragDropProps {
  data: DragDropData;
  locked: boolean;
  onSubmit: (answerData: Record<string, unknown>) => void;
}

function DraggableChip({
  id,
  content,
  shaking,
}: {
  id: string;
  content: string;
  shaking: boolean;
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id });
  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : undefined;
  return (
    <button
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`touch-none rounded-btn border-2 px-4 py-3 text-left text-sm font-medium transition-shadow ${
        isDragging
          ? 'border-teal bg-teal/10 shadow-lg'
          : 'border-navy/15 bg-white text-navy'
      } ${shaking ? 'animate-wiggle border-error' : ''}`}
    >
      {content}
    </button>
  );
}

function Zone({
  id,
  label,
  placed,
  glowing,
}: {
  id: string;
  label: string;
  placed: { id: string; content: string }[];
  glowing: boolean;
}) {
  const { setNodeRef, isOver } = useDroppable({ id });
  return (
    <div
      ref={setNodeRef}
      className={`flex min-h-[140px] flex-col gap-2 rounded-card border-2 border-dashed p-3 transition-colors ${
        glowing || isOver
          ? 'border-teal bg-teal/10'
          : 'border-navy/20 bg-white/50'
      }`}
    >
      <p className="text-center text-sm font-bold text-navy">{label}</p>
      {placed.map((item) => (
        <div
          key={item.id}
          className="rounded-btn border-2 border-sage bg-sage/15 px-3 py-2 text-sm font-medium text-navy"
        >
          ✅ {item.content}
        </div>
      ))}
    </div>
  );
}

// Drag each chip into the correct zone. A wrong drop shakes the chip and
// it stays in the tray; a correct drop locks it into the zone. Submit
// appears once every chip is correctly placed.
export function DragDrop({ data, locked, onSubmit }: DragDropProps) {
  const [placements, setPlacements] = useState<Record<string, string>>({});
  const [shakeId, setShakeId] = useState<string | null>(null);
  const [glowZone, setGlowZone] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 120, tolerance: 6 },
    })
  );

  const tray = useMemo(
    () => data.items.filter((it) => !placements[it.id]),
    [data.items, placements]
  );

  const allPlaced = tray.length === 0;

  function handleDragEnd(event: DragEndEvent) {
    if (locked) return;
    const { active, over } = event;
    if (!over) return;
    const item = data.items.find((it) => it.id === active.id);
    if (!item) return;

    if (over.id === item.correct_zone) {
      setPlacements((prev) => ({ ...prev, [item.id]: String(over.id) }));
      setGlowZone(String(over.id));
      setTimeout(() => setGlowZone(null), 400);
    } else {
      setShakeId(item.id);
      setTimeout(() => setShakeId(null), 450);
    }
  }

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="flex flex-col gap-4">
        <p className="text-sm font-medium text-navy/60">
          Drag each card into the right box.
        </p>

        <div
          className={`grid gap-3 ${
            data.zones.length === 1
              ? 'grid-cols-1'
              : data.zones.length >= 3
                ? 'grid-cols-1 sm:grid-cols-3'
                : 'grid-cols-1 sm:grid-cols-2'
          }`}
        >
          {data.zones.map((zone) => (
            <Zone
              key={zone.id}
              id={zone.id}
              label={zone.label}
              glowing={glowZone === zone.id}
              placed={data.items
                .filter((it) => placements[it.id] === zone.id)
                .map((it) => ({ id: it.id, content: it.content }))}
            />
          ))}
        </div>

        {/* Tray */}
        {!allPlaced && (
          <div className="flex flex-wrap gap-2 rounded-card bg-bg/60 p-3">
            {tray.map((item) => (
              <DraggableChip
                key={item.id}
                id={item.id}
                content={item.content}
                shaking={shakeId === item.id}
              />
            ))}
          </div>
        )}

        {allPlaced && !locked && (
          <motion.button
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            type="button"
            onClick={() => onSubmit({ placements, completed: true })}
            className="self-start rounded-btn bg-teal px-6 py-3 font-semibold text-white transition-colors hover:bg-teal/90"
          >
            Submit
          </motion.button>
        )}
      </div>
    </DndContext>
  );
}
