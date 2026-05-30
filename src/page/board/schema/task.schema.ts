import z from "zod";
import type { TaskStatus } from "../board.types";

export const createOreditTaskSchemma = z.object({
  title: z.string().min(1, "Név megadása kötelező"),
  status: z.enum(["done", "in_progress", "todo"] satisfies TaskStatus[]),
});

export type CreateOrEditTaskInput = z.infer<typeof createOreditTaskSchemma>;
