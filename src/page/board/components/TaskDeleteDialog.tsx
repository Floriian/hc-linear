import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import type { Task } from "../board.types";
import { useDeleteTask } from "../data/task.queries";

interface Props {
  task: Task;
  onClose: () => void;
  open: boolean;
}

export function TaskDeleteDialog({ task, onClose, open }: Props) {
  const { mutateAsync: deleteTask } = useDeleteTask();

  const handleDelete = async () => {
    try {
      await deleteTask(task.id);
      onClose();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        Biztosan törölni szeretnéd a {task.title} feladatot?
      </DialogTitle>
      <DialogContent>Ez a művelet nem visszavonható!</DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" variant="outlined">
          Mégse
        </Button>
        <Button color="error" variant="contained" onClick={handleDelete}>
          Törlés
        </Button>
      </DialogActions>
    </Dialog>
  );
}
