export type DraggingEntityType = "card" | "column";

// IMPORTANT: all keys must be lowercase
export type KanbanDraggingData = {
    id: string;
    type: DraggingEntityType;
};


