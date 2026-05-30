import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useCreateTask } from "../data/task.queries";
import type { CreateOrEditTaskInput } from "../schema/task.schema";
import { TaskForm } from "./TaskForm";

interface Props {
  open: boolean;
  onClose: () => void;
  defaultValues: CreateOrEditTaskInput;
}
export function TaskCreateDialog({ open, onClose, defaultValues }: Props) {
  const { mutateAsync: createTask } = useCreateTask();

  const onSubmit = async (data: CreateOrEditTaskInput) => {
    try {
      await createTask(data);
      onClose();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Új feladat létrehozása</DialogTitle>
      <DialogContent>
        <TaskForm onSubmit={onSubmit} defaultValues={defaultValues} />
      </DialogContent>
    </Dialog>
  );
}
