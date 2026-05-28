import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BUS_QUERY_KEYS } from "./buses.query-keys";
import { busApi } from "./bus.api";
import type { CreateOrEditBusInput } from "../schema/bus.schema";

export const useBuses = () => {
  return useQuery({
    queryKey: [BUS_QUERY_KEYS.BUSES],
    queryFn: busApi.getAll,
  });
};

export const useBus = (id: number) => {
  return useQuery({
    queryKey: [BUS_QUERY_KEYS.BUS, id],
    queryFn: () => busApi.getOne(id),
  });
};

export const useCreateBus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [BUS_QUERY_KEYS.BUSES],
    mutationFn: (data: CreateOrEditBusInput) => busApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [BUS_QUERY_KEYS.BUSES],
      });
    },
  });
};

export const useUpdateBus = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [BUS_QUERY_KEYS.BUS, id],
    mutationFn: (data: CreateOrEditBusInput) => busApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [BUS_QUERY_KEYS.BUSES],
      });
      queryClient.invalidateQueries({
        queryKey: [BUS_QUERY_KEYS.BUS, id],
      });
    },
  });
};

export const useDeleteBus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [BUS_QUERY_KEYS.BUSES],
    mutationFn: (id: number) => busApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [BUS_QUERY_KEYS.BUSES],
      });
    },
  });
};
