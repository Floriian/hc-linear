import type { BaseEntity } from "../../types/base-entity";

export type TaskStatus = "todo" | "in_progress" | "done";
export interface Task extends BaseEntity {
  title: string;
  status: TaskStatus;
}
