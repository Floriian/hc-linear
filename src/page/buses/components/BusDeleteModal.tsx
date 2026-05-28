import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import type { Bus } from "../buses.types";
import { useDeleteBus } from "../data/buses.queries";

interface Props {
  bus: Bus;
  onClose: () => void;
  open: boolean;
}

export function BusDeleteModal({ bus, onClose, open }: Props) {
  const { mutateAsync: deleteBus } = useDeleteBus();

  const handleDelete = async () => {
    try {
      await deleteBus(bus.id);
      onClose();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        Biztosan törölni szeretnéd a {bus.plate} rendszámú buszt?
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
