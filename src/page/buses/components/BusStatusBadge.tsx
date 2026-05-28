import { Chip } from "@mui/material";
import type { BusStatus } from "../buses.types";

export function BusStatusBadge({ status }: { status: BusStatus }) {
  const isActive = status == "operational";
  return (
    <Chip
      label={isActive ? "Üzemképes" : "Karbantartás alatt"}
      color={isActive ? "success" : "warning"}
      size="small"
    />
  );
}
