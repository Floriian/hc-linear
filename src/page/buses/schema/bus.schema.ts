import { z } from "zod";
import type { BusStatus } from "../buses.types";

export const createOrEditBusSchema = z.object({
  plate: z.string().min(1, "A rendszám megadása kötelező."),
  model: z.string().min(1, "A típus megadása kötelező."),
  capacity: z
    .number()
    .int()
    .positive("A kapacitásnak pozitív egész számnak kell lennie."),
  status: z.enum(["maintenance", "operational"] satisfies BusStatus[]),
});

export type CreateOrEditBusInput = z.infer<typeof createOrEditBusSchema>;
