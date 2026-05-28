import {
  TableHead,
  TableBody,
  Typography,
  Box,
  IconButton,
  Button,
  Stack,
  CircularProgress,
} from "@mui/material";

import { useBuses } from "./data/buses.queries";
import {
  Table,
  TableCell,
  TableHeadCell,
  TableRow,
  TableContainer,
} from "./style/bus.style";

import { BusStatusBadge } from "./components/BusStatusBadge";
import { Delete, Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../config/routes";
import { useState } from "react";
import type { Bus } from "./buses.types";
import { BusDeleteModal } from "./components/BusDeleteModal";
import { CreateBusModal } from "./components/CreateBusModal";

const COLUMNS = [
  "ID",
  "Rendszám",
  "Típus",
  "Státusz",
  "Kapacitás",
  "",
] as const;

export default function BusMainPage() {
  const { data, error, isLoading } = useBuses();

  const navigate = useNavigate();

  const [selectedBus, setSelectedBus] = useState<Bus | null>(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);

  const handleDelete = (bus: Bus) => {
    setSelectedBus(bus);
    setDeleteModalOpen(true);
  };

  const handleClose = () => {
    setIsNewModalOpen(false);
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: 300,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error">Hiba történt az adatok lekérésekor.</Typography>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 3 }}
      >
        <Typography
          sx={{
            color: "var(--text-color-light)",
            fontSize: "1.5rem",
            fontWeight: 700,
            letterSpacing: "-0.02em",
          }}
        >
          Buszok
          <Box
            component="span"
            sx={{
              color: "var(--primary-color)",
              ml: 1.5,
              fontSize: "1rem",
              fontWeight: 500,
            }}
          >
            {data?.length} db
          </Box>
        </Typography>

        <Button
          color="success"
          variant="contained"
          onClick={() => setIsNewModalOpen(true)}
        >
          Új busz
        </Button>
      </Stack>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {COLUMNS.map((col) => (
                <TableHeadCell key={col}>{col}</TableHeadCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {data?.map((bus) => (
              <TableRow
                key={bus.id}
                hover
                onClick={() =>
                  navigate(
                    APP_ROUTES.BUS_DETAILS.replace(":id", bus.id.toString()),
                  )
                }
                sx={{
                  cursor: "pointer",
                }}
              >
                <TableCell>#{bus.id}</TableCell>

                <TableCell>{bus.plate}</TableCell>

                <TableCell>{bus.model}</TableCell>

                <TableCell>
                  <BusStatusBadge status={bus.status} />
                </TableCell>

                <TableCell>{bus.capacity} fő</TableCell>

                <TableCell>
                  <IconButton
                    color="info"
                    onClick={(e) => {
                      e.stopPropagation();

                      navigate(
                        APP_ROUTES.BUS_EDIT.replace(":id", bus.id.toString()),
                      );
                    }}
                  >
                    <Edit />
                  </IconButton>

                  <IconButton
                    color="error"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(bus);
                    }}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {selectedBus && (
        <BusDeleteModal
          bus={selectedBus}
          open={isDeleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
        />
      )}

      <CreateBusModal open={isNewModalOpen} onClose={handleClose} />
    </Box>
  );
}
