import { Chip } from "@mui/material";
import type { TaskStatus } from "../board.types";
import { taskStatus } from "../data/task.data";

interface Props {
  status: TaskStatus;
}

export function TaskStatusBadge({ status }: Props) {
  const isDone = status === "done";
  const isInProgress = status === "in_progress";

  return (
    <Chip
      label={taskStatus[status]}
      color={isDone ? "success" : isInProgress ? "warning" : "info"}
      size="small"
    />
  );
}
