import { useEffect, useRef, useState } from "react";
import type { Task, TaskStatus } from "../board.types";
import type { DragEndEvent, DragOverEvent } from "@dnd-kit/react";

type TaskColumns = Record<TaskStatus, Task[]>;

function findColumn(
  columns: TaskColumns,
  taskId: string,
): TaskStatus | undefined {
  return (Object.entries(columns) as [TaskStatus, Task[]][]).find(([, tasks]) =>
    tasks.some((t) => t.id.toString() === taskId),
  )?.[0];
}

export function useBoardDragDrop(
  initial: TaskColumns,
  onStatusChange: (taskId: number, newStatus: TaskStatus) => void,
) {
  const [items, setItems] = useState<TaskColumns>(initial);
  const dragSnapshot = useRef<TaskColumns>(initial);
  const itemsRef = useRef<TaskColumns>(initial);
  const onStatusChangeRef = useRef(onStatusChange);

  useEffect(() => {
    onStatusChangeRef.current = onStatusChange;
  }, [onStatusChange]);

  function updateItems(next: TaskColumns) {
    itemsRef.current = next;
    setItems(next);
  }

  function handleDragStart() {
    dragSnapshot.current = itemsRef.current;
  }

  function handleDragOver(event: DragOverEvent) {
    const { source, target } = event.operation;
    if (!source || !target) return;

    const sourceColumn = source.data?.column as TaskStatus;
    const targetColumn = (
      target.type === "column" ? target.id : target.data?.column
    ) as TaskStatus;

    if (!sourceColumn || !targetColumn) return;

    const prev = itemsRef.current;
    const sourceItems = [...prev[sourceColumn]];
    const targetItems =
      sourceColumn === targetColumn ? sourceItems : [...prev[targetColumn]];

    const fromIndex = sourceItems.findIndex(
      (t) => t.id.toString() === source.id,
    );
    if (fromIndex === -1) return;

    const [movedTask] = sourceItems.splice(fromIndex, 1);
    const toIndex =
      target.type === "column"
        ? targetItems.length
        : targetItems.findIndex((t) => t.id.toString() === target.id);

    targetItems.splice(
      toIndex === -1 ? targetItems.length : toIndex,
      0,
      movedTask,
    );

    updateItems({
      ...prev,
      [sourceColumn]: sourceItems,
      [targetColumn]: targetItems,
    });
  }

  function handleDragEnd(event: DragEndEvent) {
    if (event.canceled) {
      updateItems(dragSnapshot.current);
      return;
    }

    const { source } = event.operation;
    if (!source) return;

    const taskId = source.id.toString();

    const originalColumn = findColumn(dragSnapshot.current, taskId);
    const currentColumn = findColumn(itemsRef.current, taskId);

    if (currentColumn && currentColumn !== originalColumn) {
      onStatusChangeRef.current(Number(taskId), currentColumn);
    }
  }

  return {
    items,
    setItems: updateItems,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
  };
}
