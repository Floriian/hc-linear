import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TASK_QUERY_KEYS } from "./task.query-keys";
import { tasksApi } from "./tasks.api";
import type { CreateOrEditTaskInput } from "../schema/task.schema";

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

  return useMutation({
    mutationKey: [TASK_QUERY_KEYS.TASKS],
    mutationFn: (data: CreateOrEditTaskInput) => tasksApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [TASK_QUERY_KEYS.TASKS],
      });
    },
  });
};

export const useUpdateTask = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [TASK_QUERY_KEYS.TASK, id],
    mutationFn: (data: CreateOrEditTaskInput) => tasksApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [TASK_QUERY_KEYS.TASKS],
      });
      queryClient.invalidateQueries({
        queryKey: [TASK_QUERY_KEYS.TASK, id],
      });
    },
  });
};

export const useDeleteTask = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [TASK_QUERY_KEYS.TASK, id],
    mutationFn: () => tasksApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [TASK_QUERY_KEYS.TASKS],
      });
    },
  });
};
