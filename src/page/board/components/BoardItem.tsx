import { useSortable } from "@dnd-kit/react/sortable";
import type { UniqueIdentifier } from "@dnd-kit/abstract";
import { IconButton, Stack, Typography } from "@mui/material";
import { TaskBox } from "../style/task.style";
import { TaskStatusBadge } from "./TaskStatusBadge";
import type { Task } from "../board.types";
import { Delete, Edit } from "@mui/icons-material";

interface Props {
  id: string;
  index: number;
  column: UniqueIdentifier;
  task: Task;
  onDeleteClick: (task: Task) => void;
  onEditClick: (task: Task) => void;
}

export function BoardItem({
  id,
  index,
  column,
  task,
  onDeleteClick,
  onEditClick,
}: Props) {
  const { ref, isDragging } = useSortable({
    id,
    index,
    type: "item",
    accept: ["item"],
    group: column,
    data: { column },
  });

  return (
    <TaskBox ref={ref} data-dragging={isDragging}>
      <Stack direction="row" justifyContent="space-between">
        <Typography>{task.title}</Typography>
        <TaskStatusBadge status={task.status} />
      </Stack>
      <Stack direction="row" justifyContent="end">
        <IconButton color="primary" onClick={() => onEditClick(task)}>
          <Edit />
        </IconButton>
        <IconButton color="error" onClick={() => onDeleteClick(task)}>
          <Delete />
        </IconButton>
      </Stack>
    </TaskBox>
  );
}
