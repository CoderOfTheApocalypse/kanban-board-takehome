import type { KanbanBoardModel } from "./kanbanTypes.ts";

export const DEFAULT_KANBAN_BOARD: KanbanBoardModel = {
    columns: [
        {
            id: crypto.randomUUID(),
            title: "To Do",
            order: 1,
            tasks: [
                {
                    id: crypto.randomUUID(),
                    title: "PackIO",
                    description: "Pack my shit and go begging for forgiveness",
                    comments: [],
                },
                {
                    id: crypto.randomUUID(),
                    title: "Make it double",
                    description: "Cry me a river cry me cry me xdd",
                    comments: [],
                },
                {
                    id: crypto.randomUUID(),
                    title: "Tripple",
                    description: "Sad but true",
                    comments: [],
                },
                {
                    id: crypto.randomUUID(),
                    title: "QUADRUPLE",
                    description: "Just a tonn of text here and thereJust a tonn of text here and thereJust a tonn of text here and thereJust a tonn of text here and thereJust a tonn of text here and thereJust a tonn of text here and thereJust a tonn of text here and thereJust a tonn of text here and there",
                    comments: [],
                },
            ],
        },
        {
            id: crypto.randomUUID(),
            title: "In Progress",
            order: 2,
            tasks: [
                {
                    id: crypto.randomUUID(),
                    title: "Another one bites the dust",
                    description: "Tu ru bum bum bum param pam pam param",
                    comments: [],
                },
            ],
        },
        {
            id: crypto.randomUUID(),
            title: "In Testing",
            order: 3,
            tasks: [],
        },
        {
            id: crypto.randomUUID(),
            title: "In Review",
            order: 3,
            tasks: [],
        },
        {
            id: crypto.randomUUID(),
            title: "Done",
            order: 3,
            tasks: [],
        },
    ],
};
