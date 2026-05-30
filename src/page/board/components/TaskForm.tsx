import { Controller, useForm } from "react-hook-form";
import {
  createOreditTaskSchemma,
  type CreateOrEditTaskInput,
} from "../schema/task.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormGroup,
  InputLabel,
  Select,
  TextField,
} from "../../../component/form/form.styles";
import { Button, MenuItem, Stack } from "@mui/material";

interface Props {
  onSubmit: (data: CreateOrEditTaskInput) => void;
  defaultValues?: CreateOrEditTaskInput;
}

export function TaskForm({ onSubmit, defaultValues }: Props) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateOrEditTaskInput>({
    resolver: zodResolver(createOreditTaskSchemma),
    defaultValues: defaultValues ?? {
      status: "todo",
      title: "",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormGroup>
        <Stack spacing={3}>
          <TextField
            label="Cím"
            {...register("title")}
            error={!!errors.title}
            helperText={errors.title?.message}
            fullWidth
          />

          <Controller
            control={control}
            name="status"
            render={({ field }) => (
              <FormControl>
                <InputLabel id="status-label">Státusz</InputLabel>

                <Select {...field} labelId="status-label" label="Státusz">
                  <MenuItem value="todo">TODO</MenuItem>
                  <MenuItem value="in_progress">Folyamatban</MenuItem>
                  <MenuItem value="done">Kész</MenuItem>
                </Select>
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
