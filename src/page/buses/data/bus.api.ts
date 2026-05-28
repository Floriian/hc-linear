import { busesAxiosClient } from "../../../config/axios.config";
import type { Bus } from "../buses.types";
import type { CreateOrEditBusInput } from "../schema/bus.schema";

export const busApi = {
  getAll: async () => {
    const { data } = await busesAxiosClient<Bus[]>("/buses");
    return data;
  },
  getOne: async (id: number) => {
    const { data } = await busesAxiosClient<Bus>(`/buses/${id}`);
    return data;
  },
  create: async (bus: CreateOrEditBusInput) => {
    const { data } = await busesAxiosClient.post<Bus>("/buses", bus);
    return data;
  },
  update: async (id: number, bus: CreateOrEditBusInput) => {
    const { data } = await busesAxiosClient.patch<Bus>(`/buses/${id}`, bus);
    return data;
  },
  replace: async (id: number, bus: CreateOrEditBusInput) => {
    const { data } = await busesAxiosClient.put<Bus>(`/buses/${id}`, bus);
    return data;
  },
  delete: async (id: number) => {
    const { data } = await busesAxiosClient.delete(`/buses/${id}`);
    return data;
  },
};
