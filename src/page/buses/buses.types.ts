import type { BaseEntity } from "../../types/base-entity";

export type BusStatus = "operational" | "maintenance";

export interface Bus extends BaseEntity {
    plate: string;
    model: string;
    status: BusStatus;
    capacity: number;
}
