import { type State, useKanbanStore } from "@kanbanio/stores/kanban/kanbanStore.ts";

export const useKanbanColumns = () => useKanbanStore((state: State) => state.columnsOrder);

export const useKanbanColumnInfo = (columnId: string) => useKanbanStore((state: State) => state.columnsMap[columnId]);

export const useKanbanTaskInfo = (taskId: string) => useKanbanStore((state: State) => state.tasksMap[taskId]);

export const useKanbanTaskComments = (taskId: string) =>
    useKanbanStore((state: State) => Object.values(state.commentsMap).filter((comment) => comment.id === taskId));
