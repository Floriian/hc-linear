import { styled } from "@mui/material/styles";
import {
  FormGroup as MuiFormGroup,
  Button as MuiButton,
  TextField as MuiTextField,
  FormControl as MuiFormControl,
  Select as MuiSelect,
  InputLabel as MuiInputLabel,
} from "@mui/material";

export const FormGroup = styled(MuiFormGroup)({
  borderRadius: "16px",
  overflow: "hidden",
  boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
  border: "1px solid rgba(255,255,255,0.06)",
  background: "var(--main-color)",
  padding: "28px 32px",
});

const sharedInputStyles = {
  "& .MuiInputLabel-root": {
    color: "rgba(255,255,255,0.4)",
    fontSize: "0.875rem",
    letterSpacing: "0.03em",
    "&.Mui-focused": {
      color: "var(--primary-color)",
    },
    "&.Mui-disabled": {
      color: "rgba(255,255,255,0.3)",
    },
  },
  "& .MuiOutlinedInput-root": {
    color: "var(--text-color-light)",
    fontSize: "0.9rem",
    fontWeight: 500,
    borderRadius: "10px",
    background: "rgba(0,0,0,0.2)",
    "& fieldset": {
      borderColor: "rgba(255,255,255,0.08)",
      transition: "border-color 0.15s ease",
    },
    "&:hover fieldset": {
      borderColor: "rgba(255,255,255,0.18)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "var(--primary-color)",
      borderWidth: "1px",
    },
    "&.Mui-disabled": {
      // override MUI's default grey wash
      background: "rgba(0,0,0,0.2)",
      "& fieldset": {
        borderColor: "rgba(255,255,255,0.05)",
      },
      "& input": {
        color: "rgba(255,255,255,0.3)",
        WebkitTextFillColor: "rgba(255,255,255,0.3)",
      },
      "& .MuiSelect-select": {
        color: "rgba(255,255,255,0.3)",
        WebkitTextFillColor: "rgba(255,255,255,0.3)",
      },
    },
    "&.Mui-error fieldset": {
      borderColor: "#f44336",
    },
  },
  "& .MuiFormHelperText-root": {
    fontSize: "0.75rem",
    marginTop: "6px",
    "&.Mui-error": {
      color: "#f44336",
    },
  },
};

export const TextField = styled(MuiTextField)(sharedInputStyles);

export const FormControl = styled(MuiFormControl)({
  ...sharedInputStyles,
  "& .MuiSelect-icon": {
    color: "rgba(255,255,255,0.3)",
  },
  "& .MuiSelect-icon.Mui-disabled": {
    color: "rgba(255,255,255,0.15)",
  },
});

export const InputLabel = styled(MuiInputLabel)({});

export const Select = styled(MuiSelect)({});

export const SubmitButton = styled(MuiButton)({
  background: "var(--primary-color)",
  color: "#000",
  fontWeight: 700,
  fontSize: "0.85rem",
  letterSpacing: "0.05em",
  textTransform: "uppercase",
  borderRadius: "10px",
  padding: "10px 28px",
  boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
  transition: "opacity 0.15s ease, box-shadow 0.15s ease",
  "&:hover": {
    background: "var(--primary-color)",
    opacity: 0.88,
    boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
  },
  "&.Mui-disabled": {
    background: "rgba(255,255,255,0.08)",
    color: "rgba(255,255,255,0.3)",
    boxShadow: "none",
  },
});
