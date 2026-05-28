import { Stack, FormHelperText, MenuItem, Button } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createOrEditBusSchema,
  type CreateOrEditBusInput,
} from "../schema/bus.schema";

import {
  FormControl,
  FormGroup,
  InputLabel,
  Select,
  TextField,
} from "../style/bus-form.style";

interface Props {
  onSubmit: (data: CreateOrEditBusInput) => void;
  defaultValues?: CreateOrEditBusInput;
}

export function BusForm({ onSubmit, defaultValues }: Props) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateOrEditBusInput>({
    resolver: zodResolver(createOrEditBusSchema),
    defaultValues: defaultValues ?? {
      plate: "",
      model: "",
      capacity: undefined,
      status: "operational",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormGroup>
        <Stack spacing={3}>
          <TextField
            label="Rendszám"
            {...register("plate")}
            error={!!errors.plate}
            helperText={errors.plate?.message}
            fullWidth
          />

          <TextField
            label="Típus"
            {...register("model")}
            error={!!errors.model}
            helperText={errors.model?.message}
            fullWidth
          />

          <TextField
            label="Kapacitás"
            type="number"
            {...register("capacity", {
              valueAsNumber: true,
            })}
            error={!!errors.capacity}
            helperText={errors.capacity?.message}
            fullWidth
          />

          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.status}>
                <InputLabel id="status-label">Státusz</InputLabel>

                <Select {...field} labelId="status-label" label="Státusz">
                  <MenuItem value="operational">Üzemképes</MenuItem>

                  <MenuItem value="maintenance">Karbantartás</MenuItem>
                </Select>

                {errors.status && (
                  <FormHelperText>{errors.status.message}</FormHelperText>
                )}
              </FormControl>
            )}
          />

          <Button type="submit" variant="contained" color="primary">
            Mentés
          </Button>
        </Stack>
      </FormGroup>
    </form>
  );
}
