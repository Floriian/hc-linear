import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TASK_QUERY_KEYS } from "./task.query-keys";
import { tasksApi } from "./tasks.api";
import type { CreateOrEditTaskInput } from "../schema/task.schema";
import { useToast } from "../../../component/toast/use-toast.hook";

export const useTasks = () => {
  return useQuery({
    queryKey: [TASK_QUERY_KEYS.TASKS],
    queryFn: tasksApi.getAll,
  });
};

export const useTask = (id: number) => {
  return useQuery({
    queryKey: [TASK_QUERY_KEYS.TASK, id],
    queryFn: () => tasksApi.getOne(id),
  });
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationKey: [TASK_QUERY_KEYS.TASKS],
    mutationFn: (data: CreateOrEditTaskInput) => tasksApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [TASK_QUERY_KEYS.TASKS],
      });
      toast.showToast("Feladat sikeresen létrehozva", "success");
    },
    onError: () => {
      toast.showToast("Hiba történt a feladat létrehozásakor", "error");
    },
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: Partial<CreateOrEditTaskInput>;
    }) => tasksApi.update(id, data),
    onSuccess: (_res, { id }) => {
      queryClient.invalidateQueries({ queryKey: [TASK_QUERY_KEYS.TASKS] });
      queryClient.invalidateQueries({ queryKey: [TASK_QUERY_KEYS.TASK, id] });
      toast.showToast("Feladat sikeresen frissítve", "success");
    },
    onError: () => {
      toast.showToast("Hiba történt a feladat frissítésekor", "error");
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  const toast = useToast();
  return useMutation({
    mutationKey: [TASK_QUERY_KEYS.TASKS],
    mutationFn: (id: number) => tasksApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [TASK_QUERY_KEYS.TASKS],
      });
      toast.showToast("Feladat sikeresen törölve", "success");
    },
    onError: () => {
      toast.showToast("Hiba történt a feladat törlésekor", "error");
    },
  });
};
