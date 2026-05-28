import { styled } from "@mui/material/styles";
import {
  TableContainer as MuiTableContainer,
  Table as MuiTable,
  TableCell as MuiTableCell,
  TableRow as MuiTableRow,
} from "@mui/material";

export const TableContainer = styled(MuiTableContainer)({
  borderRadius: "16px",
  overflow: "hidden",
  boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
  border: "1px solid rgba(255,255,255,0.06)",
});

export const Table = styled(MuiTable)({
  background: "var(--main-color)",
});

export const TableHeadCell = styled(MuiTableCell)({
  color: "var(--primary-color)",
  fontWeight: 700,
  fontSize: "0.75rem",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  borderBottom: "1px solid rgba(255,255,255,0.08)",
  background: "rgba(0,0,0,0.2)",
  padding: "16px 20px",
});

export const TableCell = styled(MuiTableCell)({
  color: "var(--text-color-light)",
  fontWeight: 500,
  fontSize: "0.9rem",
  borderBottom: "1px solid rgba(255,255,255,0.04)",
  padding: "14px 20px",
});

export const TableRow = styled(MuiTableRow)(({ hover }) => ({
  transition: "background 0.15s ease",
  "&:nth-of-type(odd)": {
    backgroundColor: "rgba(255,255,255,0.03)",
  },
  ...(hover && {
    "&:hover": {
      backgroundColor: "rgba(27, 226, 154, 0.07)",
      cursor: "pointer",
    },
  }),
}));
