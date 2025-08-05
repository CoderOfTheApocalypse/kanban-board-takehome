import { memo, useCallback } from "react";
import { Trash } from "lucide-react";
import { EditableLabel } from "@kanbanio/components/common/EditableLabel.tsx";
import { DragAndDropItem } from "@kanbanio/components/common/drag/DragAndDropItem.tsx";
import { useKanbanTaskInfo } from "@kanbanio/stores/kanban/kanbanSelectors.ts";
import { moveTask, removeTask, selectTask, updateTask } from "@kanbanio/stores/kanban/kanbanActions.ts";
import { Button } from "@kanbanio/components/common/Button.tsx";

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

    const handleClick = () => selectTask(id);

    const handleTitleChange = useCallback((updatedTitle: string) => updateTask(id, { title: updatedTitle }), [id]);

    const handleDrop = useCallback(
        (sourceId: string, destinationId: string, insertPosition: "before" | "after") =>
            moveTask({ sourceTaskId: sourceId, destinationTaskId: destinationId, insertPosition }),
        []
    );

    const handleDelete = useCallback(() => {
        removeTask(id);
    }, [id]);

    // --- RENDER ---

    return (
        <>
            <DragAndDropItem
                as="li"
                entityId={id}
                entityType="card"
                sortingDirection="vertical"
                wrapperStyles="rounded-xl my-2 flex flex-col gap-2"
                elementStyles="flex gap-2 h-[120px] min-h-[120px] w-full flex-col rounded-xl border border-zinc-300 bg-neutral-50 p-2.5
                dark:border-zinc-500 dark:bg-zinc-900"
                onDrop={handleDrop}
            >
                <a className="flex h-full w-full cursor-pointer flex-col text-left" onClick={handleClick}>
                    <div className="flex flex-row justify-between">
                        <EditableLabel
                            className="w-full"
                            buttonClassName="hover:bg-zinc-200 dark:hover:bg-zinc-800"
                            value={task.title}
                            onEdit={handleTitleChange}
                        />

                        <Button
                            className="self-center border-0 hover:bg-zinc-200 dark:hover:bg-zinc-800 p-2"
                            icon={<Trash size={20} />}
                            onClick={handleDelete}
                        />
                    </div>

                    <span className="h-full overflow-hidden px-2 text-sm font-medium text-zinc-600">
                        {cutoffDescription}
                    </span>
                </a>
            </DragAndDropItem>
        </>
    );
});
