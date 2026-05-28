import { useNavigate, useParams } from "react-router-dom";
import { useBus } from "./data/buses.queries";
import { Box, Button, Stack, useTheme } from "@mui/material";
import { APP_ROUTES } from "../../config/routes";
import { Typography } from "./style/bus-details.style";
import { BusStatusBadge } from "./components/BusStatusBadge";

export default function BusDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: bus, isLoading, error } = useBus(+id!);
  const theme = useTheme();

  if (isLoading) {
    return <p>Busz adatainak betöltése...</p>;
  }

  if (error || !bus) {
    return <p>Hiba történt a busz adatainak lekérésekor.</p>;
  }

  return (
    <Box sx={{ padding: "2rem" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 3,
          justifyContent: "space-between",
        }}
      >
        <Typography
          sx={{ fontSize: "1.5rem", fontWeight: 700, letterSpacing: "-0.02em" }}
        >
          Busz részletei -{" "}
          <span
            style={{
              color:
                bus.status === "operational"
                  ? "var(--primary-color)"
                  : theme.palette.warning.main,
            }}
          >
            {bus.plate}
          </span>
        </Typography>
        <Button
          color="primary"
          onClick={() => navigate(APP_ROUTES.BUS_EDIT.replace(":id", id!))}
        >
          Szerkesztés
        </Button>
      </Box>
      <Stack
        sx={{ backgroundColor: "var(--main-color)", padding: "2rem" }}
        spacing={2}
      >
        <Typography>ID: {bus.id} </Typography>
        <Typography>Rendszám: {bus.id} </Typography>
        <Typography>Típus: {bus.model} </Typography>
        <Typography>
          Státusz: <BusStatusBadge status={bus.status} />
        </Typography>
        <Typography>Kapacitás: {bus.capacity} fő</Typography>
      </Stack>
    </Box>
  );
}
