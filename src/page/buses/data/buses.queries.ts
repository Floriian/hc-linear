import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BUS_QUERY_KEYS } from "./buses.query-keys";
import { busApi } from "./bus.api";
import type { CreateOrEditBusInput } from "../schema/bus.schema";
import { useToast } from "../../../component/toast/use-toast.hook";

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
  const toast = useToast();

  return useMutation({
    mutationKey: [BUS_QUERY_KEYS.BUSES],
    mutationFn: (data: CreateOrEditBusInput) => busApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [BUS_QUERY_KEYS.BUSES],
      });
      toast.showToast("Busz sikeresen létrehozva");
    },
    onError: () => {
      toast.showToast("Hiba történt a busz létrehozásakor", "error");
    },
  });
};

export const useUpdateBus = () => {
  const queryClient = useQueryClient();
  const toast = useToast();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: CreateOrEditBusInput }) =>
      busApi.update(id, data),
    onSuccess: (_res, { id }) => {
      queryClient.invalidateQueries({
        queryKey: [BUS_QUERY_KEYS.BUSES],
      });
      queryClient.invalidateQueries({
        queryKey: [BUS_QUERY_KEYS.BUS, id],
      });
      toast.showToast("Busz sikeresen frissítve");
    },
    onError: () => {
      toast.showToast("Hiba történt a busz frissítésekor", "error");
    },
  });
};

export const useDeleteBus = () => {
  const queryClient = useQueryClient();
  const toast = useToast();
  return useMutation({
    mutationKey: [BUS_QUERY_KEYS.BUSES],
    mutationFn: (id: number) => busApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [BUS_QUERY_KEYS.BUSES],
      });
      toast.showToast("Busz sikeresen törölve");
    },
    onError: () => {
      toast.showToast("Hiba történt a busz törlésekor", "error");
    },
  });
};
