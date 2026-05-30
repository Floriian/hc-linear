import { useMemo, useEffect } from "react";
import { DragDropProvider } from "@dnd-kit/react";
import { useTasks, useUpdateTask } from "./data/task.queries";
import { BoardColumn } from "./components/BoardColumn";
import { BoardItem } from "./components/BoardItem";
import { TaskCreateDialog } from "./components/TaskCreateDialog";
import { TaskEditDialog } from "./components/TaskEditDialog";
import { TaskDeleteDialog } from "./components/TaskDeleteDialog";
import type { Task, TaskStatus } from "./board.types";
import { taskStatus } from "./data/task.data";
import { Box } from "@mui/material";
import { useBoardModals } from "./hooks/use-board-modal.hook";
import { useBoardDragDrop } from "./hooks/use-board-drag-and-drop.hook";

const emptyColumns = { todo: [], in_progress: [], done: [] };

export default function Board() {
  const { data: tasks, isLoading, error } = useTasks();
  const { mutate: updateTaskStatus } = useUpdateTask();
  const modals = useBoardModals();
  const drag = useBoardDragDrop(emptyColumns, (taskId, newStatus) => {
    updateTaskStatus({ id: taskId, data: { status: newStatus } });
  });

  const groupedTasks = useMemo(() => {
    if (!tasks) return emptyColumns;
    return tasks.reduce(
      (acc, task) => {
        acc[task.status].push(task);
        return acc;
      },
      { todo: [], in_progress: [], done: [] } as Record<TaskStatus, Task[]>,
    );
  }, [tasks]);

  useEffect(() => {
    drag.setItems(groupedTasks);
  }, [groupedTasks]);

  if (isLoading) return <p>Feladatok betöltése folyamatban...</p>;
  if (error || !tasks) return <p>Hiba történt a feladatok betöltése során.</p>;

  return (
    <DragDropProvider
      onDragStart={drag.handleDragStart}
      onDragOver={drag.handleDragOver}
      onDragEnd={drag.handleDragEnd}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        {Object.entries(drag.items).map(([col, columnTasks]) => (
          <BoardColumn
            key={col}
            id={col}
            label={taskStatus[col as TaskStatus]}
            onActionClick={() => modals.openCreate(col as TaskStatus)}
          >
            {columnTasks.map((task, index) => (
              <BoardItem
                key={task.id}
                id={String(task.id)}
                index={index}
                column={col}
                task={task}
                onDeleteClick={modals.openDelete}
                onEditClick={modals.openEdit}
              />
            ))}
          </BoardColumn>
        ))}
      </Box>

      <TaskCreateDialog
        open={modals.modalMode === "create"}
        onClose={modals.close}
        defaultValues={modals.newDefaultValues!}
      />
      {modals.selectedTask && (
        <TaskEditDialog
          open={modals.modalMode === "edit"}
          onClose={modals.close}
          task={modals.selectedTask}
        />
      )}
      {modals.selectedTask && (
        <TaskDeleteDialog
          open={modals.modalMode === "delete"}
          onClose={modals.close}
          task={modals.selectedTask}
        />
      )}
    </DragDropProvider>
  );
}
