import { memo, useCallback } from "react";
import { Plus, Trash } from "lucide-react";
import { EditableLabel } from "@kanbanio/components/common/EditableLabel.tsx";
import { Button } from "@kanbanio/components/common/Button.tsx";
import { KanbanBoardCard } from "@kanbanio/components/kanban/board/KanbanBoardCard.tsx";
import { useKanbanColumnInfo } from "@kanbanio/stores/kanban/kanbanSelectors.ts";
import { renameColumn, removeColumn, addTask } from "@kanbanio/stores/kanban/kanbanActions.ts";

type KanbanBoardColumnProps = {
    id: string;
};

export const KanbanBoardColumn = memo(({ id }: KanbanBoardColumnProps) => {
    // --- STATE ---

    const column = useKanbanColumnInfo(id);

    // --- CALLBACKS ---

    const handleEditTitle = useCallback((updatedTitle: string) => renameColumn(id, updatedTitle), [id]);

    const handleRemoveColumn = useCallback(() => removeColumn(id), [id]);

    const handleAddTask = useCallback(() =>
        addTask({
            columnId: id,
            title: `New Task ${column.tasksOrder.length + 1}`,
            description: "",
        }), [id, column.tasksOrder.length]);

    // --- RENDER ---

    return (
        <li className="flex w-[300px] shrink-0 snap-center flex-col gap-4 rounded-2xl bg-white p-5 dark:bg-zinc-800">
            <div className="flex flex-row justify-between gap-4">
                <EditableLabel className="flex-1" value={column.title} onEdit={handleEditTitle} />

                <Button className="flex-none border-none bg-transparent" icon={<Trash min={24} />} onClick={handleRemoveColumn} />
            </div>

            <hr className="my-2 border-zinc-400 dark:border-zinc-300" />

            <Button className="w-full" icon={<Plus />} onClick={handleAddTask}>
                New Task
            </Button>

            <ol className="flex flex-col grow overflow-y-auto">
                {column.tasksOrder.map((taskId) => (
                    <KanbanBoardCard key={taskId} id={taskId} />
                ))}
            </ol>
        </li>
    );
});
