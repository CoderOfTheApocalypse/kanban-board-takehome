export type KanbanColumnModel = {
    id: string;
    title: string;
    tasksOrder: string[];
};

export type KanbanTaskModel = {
    id: string;
    columnId: string;
    title: string;
    description: string;
};

export type KanbanTaskCommentModel = {
    id: string;
    taskId: string;
    author: string;
    content: string;
    isEdited: boolean;
    timestamp: Date;
};
