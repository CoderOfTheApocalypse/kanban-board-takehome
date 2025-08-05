import { useCallback, useContext } from "react";
import { Plus } from "lucide-react";
import { KanbanBoardColumn } from "@kanbanio/components/kanban/board/KanbanBoardColumn.tsx";
import { Button } from "@kanbanio/components/common/Button.tsx";
import { DragContext } from "@kanbanio/stores/dragging/dragContext.ts";
import { useKanbanColumns } from "@kanbanio/stores/kanban/kanbanSelectors.ts";
import { addColumn } from "@kanbanio/stores/kanban/kanbanActions.ts";
import { TaskDetailsModal } from "@kanbanio/components/kanban/taskDetails/TaskDetailsModal.tsx";

export const KanbanBoard = (props: React.HTMLAttributes<HTMLDivElement>): React.ReactNode => {
    // --- STATE ---

    const columns = useKanbanColumns();

    const isDragging = useContext(DragContext);

    // --- CALLBACKS ---

    const handleCreateColumn = useCallback(
        () =>
            addColumn({
                title: `Column ${columns.length + 1}`,
                tasksOrder: [],
            }),
        [columns]
    );

    // --- RENDER ---

    return (
        <>
            <main
                className={`flex w-full snap-x snap-mandatory flex-row justify-start gap-4 overflow-y-auto py-5
                    ${isDragging ? "suppress-dropzone-events" : ""} ${props.className}`}
            >
                {columns.map((columnId) => (
                    <KanbanBoardColumn key={columnId} id={columnId} />
                ))}

                <Button
                    className="mt-5 snap-center self-start bg-white p-2 border-2 border-indigo-600 dark:border-amber-600 text-indigo-600 dark:text-amber-600 hover:bg-indigo-100  dark:bg-zinc-800
                        dark:hover:bg-zinc-700"
                    icon={<Plus className="self-center" size={20} />}
                    onClick={handleCreateColumn}
                >
                    Add Column
                </Button>
            </main>

            <TaskDetailsModal />
        </>
    );
};
