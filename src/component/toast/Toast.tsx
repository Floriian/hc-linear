import { useState, type ReactNode } from "react";
import { Snackbar, Alert } from "@mui/material";
import { ToastContext } from "./toast.context";
import type { ToastSeverity } from "./toast.types";

export function ToastProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<ToastSeverity>("success");

  function showToast(message: string, severity: ToastSeverity = "success") {
    setMessage(message);
    setSeverity(severity);
    setOpen(true);
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity={severity}
          onClose={() => setOpen(false)}
          variant="filled"
        >
          {message}
        </Alert>
      </Snackbar>
    </ToastContext.Provider>
  );
}
