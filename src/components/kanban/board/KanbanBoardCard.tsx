import { memo, useCallback } from "react";
import { EditableLabel } from "@kanbanio/components/common/EditableLabel.tsx";
import { DragAndDropItem } from "@kanbanio/components/common/DragAndDropItem.tsx";
import { useKanbanTaskInfo } from "@kanbanio/stores/kanban/kanbanSelectors.ts";
import { updateTask, moveTask } from "@kanbanio/stores/kanban/kanbanActions.ts";

type KanbanBoardCardProps = {
    id: string;
};

export const KanbanBoardCard = memo(({ id }: KanbanBoardCardProps): React.JSX.Element => {
    // --- STATE ---

    const task = useKanbanTaskInfo(id);

    const cutoffDescription =
        task.description && task.description.length > 80
            ? `${task.description.substring(0, 80)} ...`
            : task.description;

    // --- CALLBACKS ---

    const handleTitleChange = useCallback((updatedTitle: string) => updateTask(id, { title: updatedTitle }), [id]);

    const handleDrop = useCallback(
        (sourceId: string, destinationId: string, insertPosition: "before" | "after") =>
            moveTask({ sourceTaskId: sourceId, destinationTaskId: destinationId, insertPosition }),
        []
    );

    // --- RENDER ---

    return (
        <DragAndDropItem
            as="li"
            entityId={id}
            entityType="card"
            sortingDirection="vertical"
            wrapperStyles="rounded-xl my-2 flex flex-col gap-2"
            elementStyles="flex gap-2 h-[120px] min-h-[120px] w-full flex-col rounded-xl border border-zinc-300 bg-gray-50 p-2.5
                dark:border-zinc-500 dark:bg-zinc-900 transition-all ease-linear duration-200"
            onDrop={handleDrop}
        >
            <EditableLabel value={task.title} onEdit={handleTitleChange} />

            <span className="h-full overflow-hidden text-sm font-medium text-zinc-600">{cutoffDescription}</span>
        </DragAndDropItem>
    );
});
