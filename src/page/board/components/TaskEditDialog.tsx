import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useUpdateTask } from "../data/task.queries";
import type { CreateOrEditTaskInput } from "../schema/task.schema";
import { TaskForm } from "./TaskForm";
import type { Task } from "../board.types";

interface Props {
  open: boolean;
  onClose: () => void;
  task: Task;
}
export function TaskEditDialog({ open, onClose, task }: Props) {
  const { mutateAsync: editTask } = useUpdateTask();

  const onSubmit = async (data: CreateOrEditTaskInput) => {
    try {
      await editTask({ id: task.id, data });
      onClose();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{task.title} szerkesztése</DialogTitle>
      <DialogContent>
        <TaskForm onSubmit={onSubmit} defaultValues={task} />
      </DialogContent>
    </Dialog>
  );
}
