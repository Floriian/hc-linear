export type ToastSeverity = "success" | "error";

export interface ToastContextValue {
  showToast: (message: string, severity?: ToastSeverity) => void;
}
