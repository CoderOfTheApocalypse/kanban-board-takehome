import { produce } from "immer";
import type { KanbanColumnModel, KanbanTaskModel } from "@kanbanio/stores/kanban/kanbanTypes.ts";
import { type State, useKanbanStore } from "@kanbanio/stores/kanban/kanbanStore.ts";

// --- COLUMN ACTIONS ---
export const addColumn = (column: Omit<KanbanColumnModel, "id">) => {
    const columnId = crypto.randomUUID();

    useKanbanStore.setState(
        produce((state: State) => {
            state.columnsMap[columnId] = { id: columnId, ...column };
            state.columnsOrder.push(columnId);
        })
    );
};

export const renameColumn = (columnId: string, title: string) => {
    useKanbanStore.setState(
        produce((state: State) => {
            state.columnsMap[columnId].title = title;
        })
    );
};

export const moveColumn = (sourceId: string, targetId: string, insertPosition: "before" | "after") => {
    useKanbanStore.setState(
        produce((state: State) => {
            const sourceIdIndex = state.columnsOrder.findIndex((id) => id === sourceId);
            const targetIdIndex = state.columnsOrder.findIndex((id) => id === targetId);

            if (
                (insertPosition === "before" && sourceIdIndex === targetIdIndex - 1) ||
                (insertPosition === "after" && sourceIdIndex === targetIdIndex + 1)
            ) {
                return state;
            }

            state.columnsOrder.splice(sourceIdIndex, 1);
            const insertionIndex = state.columnsOrder.findIndex((id) => id === targetId);
            state.columnsOrder.splice(insertPosition === "before" ? insertionIndex : insertionIndex + 1, 0, sourceId);
        })
    );
};

export const removeColumn = (columnId: string) => {
    useKanbanStore.setState(
        produce((state: State) => {
            const taskIdsToRemove = state.columnsMap[columnId].tasksOrder;

            // Remove all related comments
            Object.values(state.commentsMap).forEach((comment) => {
                if (taskIdsToRemove.includes(comment.taskId)) {
                    delete state.commentsMap[comment.id];
                }
            });

            // Remove all related tasks
            taskIdsToRemove.forEach((taskId) => {
                delete state.tasksMap[taskId];
            });

            // Remove from columns order
            const orderIndex = state.columnsOrder.findIndex((id) => id === columnId);
            state.columnsOrder.splice(orderIndex, 1);

            // Remove from columns
            delete state.columnsMap[columnId];
        })
    );
};

// --- TASK ACTIONS ---

export const addTask = (task: Omit<KanbanTaskModel, "id">) => {
    const taskId = crypto.randomUUID();

    useKanbanStore.setState(
        produce((state: State) => {
            state.tasksMap[taskId] = { id: taskId, ...task };
            state.columnsMap[task.columnId].tasksOrder.push(taskId);
        })
    );
};

export const updateTask = (taskId: string, updates: Partial<KanbanTaskModel>) => {
    useKanbanStore.setState(
        produce((state: State) => {
            const prevTaskState = state.tasksMap[taskId];
            const isColumnChanged = updates.columnId && updates.columnId !== prevTaskState.columnId;

            if (isColumnChanged) {
                const prevOrderIndex = state.columnsMap[prevTaskState.columnId].tasksOrder.findIndex(
                    (id) => id === taskId
                );
                state.columnsMap[prevTaskState.columnId].tasksOrder.splice(prevOrderIndex, 1);
                state.columnsMap[updates.columnId!].tasksOrder.push(taskId);
            }

            state.tasksMap[taskId] = {
                ...state.tasksMap[taskId],
                ...updates,
            };
        })
    );
};

type MoveTaskArgs = {
    sourceTaskId: string;
    destinationTaskId?: string;
    newColumnId?: string;
    insertPosition?: "before" | "after";
};
export const moveTask = ({ sourceTaskId, destinationTaskId, newColumnId, insertPosition }: MoveTaskArgs) => {
    if (newColumnId) {
        useKanbanStore.setState(
            produce((state: State) => {
                // remove from previous column
                const prevColumnId = state.tasksMap[sourceTaskId].columnId;
                const orderIndex = state.columnsMap[prevColumnId].tasksOrder.findIndex((id) => id === sourceTaskId);
                state.columnsMap[prevColumnId].tasksOrder.splice(orderIndex, 1);

                // add to new column and update entity
                state.columnsMap[newColumnId].tasksOrder.push(sourceTaskId);
                state.tasksMap[sourceTaskId].columnId = newColumnId;
            })
        );
        return;
    }

    if (destinationTaskId && insertPosition) {
        useKanbanStore.setState(
            produce((state: State) => {
                // remove from previous column
                const prevColumnId = state.tasksMap[sourceTaskId].columnId;
                const orderIndex = state.columnsMap[prevColumnId].tasksOrder.findIndex((id) => id === sourceTaskId);
                state.columnsMap[prevColumnId].tasksOrder.splice(orderIndex, 1);

                // change column reference
                const destinationColumnId = state.tasksMap[destinationTaskId].columnId;
                state.tasksMap[sourceTaskId].columnId = destinationColumnId;

                // add to new column
                const destinationOrderIndex = state.columnsMap[destinationColumnId].tasksOrder.findIndex(
                    (id) => id === destinationTaskId
                );
                const insertionIndex = insertPosition === "before" ? destinationOrderIndex : destinationOrderIndex + 1;
                state.columnsMap[destinationColumnId].tasksOrder.splice(insertionIndex, 0, sourceTaskId);
            })
        );
    }
};

export const removeTask = (taskId: string) => {
    useKanbanStore.setState(
        produce((state: State) => {
            // remove all related comments
            Object.values(state.commentsMap).forEach((comment) => {
                if (comment.taskId === taskId) {
                    delete state.commentsMap[comment.id];
                }
            });

            // remove from column order
            const columnId = state.tasksMap[taskId].columnId;
            const taskOrderIndex = state.columnsMap[columnId].tasksOrder.findIndex((id) => id === taskId);
            state.columnsMap[columnId].tasksOrder.splice(taskOrderIndex, 1);

            // remove from tasks
            delete state.tasksMap[taskId];
        })
    );
};

// --- COMMENTS ACTIONS ---

export const addComment = (taskId: string, content: string) => {
    const commentId = crypto.randomUUID();

    useKanbanStore.setState(
        produce((state: State) => {
            state.commentsMap[commentId] = {
                id: commentId,
                isEdited: false,
                content,
                author: "Boar",
                taskId,
                timestamp: new Date(),
            };
        })
    );
};

export const editComment = (commentId: string, updatedContent: string) => {
    useKanbanStore.setState(
        produce((state: State) => {
            state.commentsMap[commentId].content = updatedContent;
            state.commentsMap[commentId].isEdited = true;
        })
    );
};

export const removeComment = (commentId: string) => {
    useKanbanStore.setState(
        produce((state: State) => {
            delete state.commentsMap[commentId];
        })
    );
};

// --- TASK MODAL ACTIONS ---

export const selectTask = (taskId: string) => {
    useKanbanStore.setState(
        produce((state: State) => {
            state.selectedTaskId = taskId;
        })
    );
};

export const deselectTask = () => {
    useKanbanStore.setState(
        produce((state: State) => {
            state.selectedTaskId = null;
        })
    );
};
