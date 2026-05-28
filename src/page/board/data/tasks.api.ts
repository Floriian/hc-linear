import { boardAxiosClient } from "../../../config/axios.config";
import type { Task } from "../board.types";
import type { CreateOrEditTaskInput } from "../schema/task.schema";

export const tasksApi = {
  getAll: async () => {
    const { data } = await boardAxiosClient<Task[]>("/tasks");
    return data;
  },
  getOne: async (id: number) => {
    const { data } = await boardAxiosClient<Task>(`/tasks/${id}`);
    return data;
  },
  create: async (bus: CreateOrEditTaskInput) => {
    const { data } = await boardAxiosClient.post<Task>("/tasks", bus);
    return data;
  },
  update: async (id: number, task: CreateOrEditTaskInput) => {
    const { data } = await boardAxiosClient.patch<Task>(`/tasks/${id}`, task);
    return data;
  },
  replace: async (id: number, task: CreateOrEditTaskInput) => {
    const { data } = await boardAxiosClient.put<Task>(`/tasks/${id}`, task);
    return data;
  },
  delete: async (id: number) => {
    const { data } = await boardAxiosClient.delete(`/tasks/${id}`);
    return data;
  },
};
