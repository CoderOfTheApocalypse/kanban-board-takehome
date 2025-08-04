import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";
import type {
    KanbanColumnModel,
    KanbanTaskCommentModel,
    KanbanTaskModel,
} from "@kanbanio/stores/kanban/kanbanTypes.ts";

export type State = {
    columnsOrder: string[];
    columnsMap: Record<string, KanbanColumnModel>;
    tasksMap: Record<string, KanbanTaskModel>;
    commentsMap: Record<string, KanbanTaskCommentModel>;
};

const INITIAL_STORE_STATE: State = {
    columnsMap: {
        "to-do": {
            id: "to-do",
            title: "To Do",
            tasksOrder: ["task-1"],
        },
        "in-progress": {
            id: "in-progress",
            title: "In Progress",
            tasksOrder: [],
        },
        done: {
            id: "done",
            title: "Done",
            tasksOrder: [],
        },
    },
    columnsOrder: ["to-do", "in-progress", "done"],

    tasksMap: {
        "task-1": {
            id: "task-1",
            columnId: "to-do",
            title: "Complete Me!",
            description: "You have to complete me, brother! It is indeed the time for that!",
        },
    },

    commentsMap: {},
};

export const useKanbanStore = create<State>()(
    persist(
        immer(() => ({
            ...INITIAL_STORE_STATE,
        })),
        {
            name: "kanban-store",
        }
    )
);
