import type { TaskStatus } from "../board.types";

export const taskStatus: Record<TaskStatus, string> = {
  done: "Kész",
  in_progress: "Folyamatban",
  todo: "TODO",
};
