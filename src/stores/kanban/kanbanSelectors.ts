import { useMemo } from "react";
import { type State, useKanbanStore } from "@kanbanio/stores/kanban/kanbanStore.ts";

export const useKanbanColumns = () => useKanbanStore((state: State) => state.columnsOrder);

export const useKanbanColumnInfo = (columnId: string) => useKanbanStore((state: State) => state.columnsMap[columnId]);

export const useKanbanTaskInfo = (taskId: string) => useKanbanStore((state: State) => state.tasksMap[taskId]);

export const useSelectedTaskDetails = () =>
    useKanbanStore((state: State) => (state.selectedTaskId ? state.tasksMap[state.selectedTaskId] : null));

export const useSelectedTaskComments = () => {
    const selectedTaskId = useKanbanStore((state) => state.selectedTaskId);
    const commentsMap = useKanbanStore((state) => state.commentsMap);

    return useMemo(
        () => Object.values(commentsMap).filter((comment) => comment.id === selectedTaskId),
        [selectedTaskId, commentsMap]
    );
};
