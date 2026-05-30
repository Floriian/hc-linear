import { useDroppable } from "@dnd-kit/react";
import { Add } from "@mui/icons-material";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  id: string;
  label: string;
  onActionClick: () => void;
}

export function BoardColumn({ children, id, label, onActionClick }: Props) {
  const { ref } = useDroppable({
    id,
    type: "column",
    accept: ["item"],
    data: { column: id },
  });

  return (
    <Box
      ref={ref}
      style={{
        width: 300,
        minHeight: 400,
        padding: 16,
        border: "1px solid #ccc",
        borderRadius: 8,
      }}
    >
      <Stack
        direction="row"
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" sx={{ color: "var(--text-color-light)" }}>
          {label}
        </Typography>
        <IconButton onClick={onActionClick} color="success">
          <Add />
        </IconButton>
      </Stack>

      <Stack gap={1}>{children}</Stack>
    </Box>
  );
}
