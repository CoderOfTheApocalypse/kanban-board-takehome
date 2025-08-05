import { memo, type RefObject, useCallback } from "react";
import { Plus, Trash } from "lucide-react";
import { EditableLabel } from "@kanbanio/components/common/EditableLabel.tsx";
import { Button } from "@kanbanio/components/common/Button.tsx";
import { KanbanBoardCard } from "@kanbanio/components/kanban/board/KanbanBoardCard.tsx";
import { useKanbanColumnInfo } from "@kanbanio/stores/kanban/kanbanSelectors.ts";
import { addTask, moveTask, removeColumn, renameColumn } from "@kanbanio/stores/kanban/kanbanActions.ts";
import { Dropzone } from "@kanbanio/components/common/drag/Dropzone.tsx";

type KanbanBoardColumnProps = {
    id: string;
    ref?: React.RefObject<HTMLElement>;
};

export const KanbanBoardColumn = memo(({ id, ref }: KanbanBoardColumnProps) => {
    // --- STATE ---

    const column = useKanbanColumnInfo(id);

    // --- CALLBACKS ---

    const handleEditTitle = useCallback((updatedTitle: string) => renameColumn(id, updatedTitle), [id]);

    const handleRemoveColumn = useCallback(() => removeColumn(id), [id]);

    const handleAddTask = useCallback(
        () =>
            addTask({
                columnId: id,
                title: `New Task ${column.tasksOrder.length + 1}`,
                description: "",
            }),
        [id, column.tasksOrder.length]
    );

    const handleDropTask = useCallback(
        (taskId: string) => {
            moveTask({
                sourceTaskId: taskId,
                newColumnId: id,
            });
        },
        [id]
    );

    // --- RENDER ---

    return (
        <li
            ref={ref as RefObject<HTMLLIElement>}
            className="flex w-[300px] shrink-0 snap-center flex-col gap-4 overflow-hidden rounded-2xl bg-zinc-100 py-4
                dark:bg-zinc-800"
        >
            <div className="flex flex-col gap-4 px-4">
                <div className="flex flex-row justify-between gap-2">
                    <EditableLabel
                        className="flex-1 text-xl"
                        buttonClassName="hover:bg-zinc-200 dark:hover:bg-zinc-700"
                        value={column.title}
                        onEdit={handleEditTitle}
                    />

                    <Button
                        className="self-center p-2 border-none bg-transparent hover:bg-zinc-200 dark:hover:bg-zinc-700"
                        icon={<Trash min={24} />}
                        onClick={handleRemoveColumn}
                    />
                </div>

                <hr className="my-2 w-full border border-zinc-400 dark:border-zinc-300" />

                <Button
                    className="w-full p-2 border-indigo-600 dark:border-amber-600 text-indigo-600 dark:text-amber-600 bg-white dark:bg-zinc-900 hover:bg-indigo-100 dark:hover:bg-zinc-700"
                    icon={<Plus />}
                    onClick={handleAddTask}
                >
                    New Task
                </Button>
            </div>

            <div className="basis-auto overflow-y-auto px-4">
                {!!column.tasksOrder.length && (
                    <ol className="flex flex-col">
                        {column.tasksOrder.map((taskId) => (
                            <KanbanBoardCard key={taskId} id={taskId} />
                        ))}
                    </ol>
                )}
            </div>

            <Dropzone
                catchingType="card"
                className="h-[120px] rounded-xl border-zinc-300 dark:border-zinc-500"
                wrapperStyles="w-full h-full grow shrink basis-0 px-4"
                onDrop={handleDropTask}
            />
        </li>
    );
});
