import { useState } from "react";
import type { Task, TaskStatus } from "../board.types";
import type { CreateOrEditTaskInput } from "../schema/task.schema";

type ModalMode = "create" | "edit" | "delete" | null;

export function useBoardModals() {
  const [modalMode, setModalMode] = useState<ModalMode>(null);
  const [selectedTask, setSelectedTask] = useState<Task>();
  const [newDefaultValues, setNewDefaultValues] =
    useState<CreateOrEditTaskInput>();

  function openCreate(status: TaskStatus) {
    setNewDefaultValues({ title: "", status });
    setModalMode("create");
  }

  function openEdit(task: Task) {
    setSelectedTask(task);
    setModalMode("edit");
  }

  function openDelete(task: Task) {
    setSelectedTask(task);
    setModalMode("delete");
  }

  function close() {
    setModalMode(null);
  }

  return {
    modalMode,
    selectedTask,
    newDefaultValues,
    openCreate,
    openEdit,
    openDelete,
    close,
  };
}
