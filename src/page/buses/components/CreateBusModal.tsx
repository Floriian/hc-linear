import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { BusForm } from "./BusForm";
import { useCreateBus } from "../data/buses.queries";
import type { CreateOrEditBusInput } from "../schema/bus.schema";

interface Props {
  open: boolean;
  onClose: () => void;
}
export function CreateBusModal({ onClose, open }: Props) {
  const { mutateAsync: createBus } = useCreateBus();

  const onSubmit = async (data: CreateOrEditBusInput) => {
    try {
      await createBus(data);
      onClose();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Új busz létrehozása</DialogTitle>
      <DialogContent>
        <BusForm onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
}
