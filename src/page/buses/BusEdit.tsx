import { useParams } from "react-router-dom";
import { useBus, useUpdateBus } from "./data/buses.queries";
import type { CreateOrEditBusInput } from "./schema/bus.schema";
import { Box } from "@mui/material";
import { BusForm } from "./components/BusForm";

export default function EditBusPage() {
  const { id } = useParams();
  const { data: bus, isLoading, error } = useBus(+id!);
  const { mutateAsync: updateBus } = useUpdateBus(+id!);

  const handleSubmit = async (data: CreateOrEditBusInput) => {
    try {
      await updateBus(data);
    } catch (e) {
      console.error(e);
    }
  };

  if (isLoading) return <p>Busz adatainak betöltése....</p>;
  if (error || !bus) return <p>Hiba történt a busz adatainak lekérésekor.</p>;

  return (
    <Box
      sx={{
        padding: "2rem",
      }}
    >
      <BusForm onSubmit={handleSubmit} defaultValues={bus} />
    </Box>
  );
}
