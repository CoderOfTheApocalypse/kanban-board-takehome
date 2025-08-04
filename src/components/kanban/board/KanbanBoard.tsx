import { useCallback, useContext } from "react";
import { Plus } from "lucide-react";
import { KanbanBoardColumn } from "@kanbanio/components/kanban/board/KanbanBoardColumn.tsx";
import { Button } from "@kanbanio/components/common/Button.tsx";
import { DragContext } from "@kanbanio/stores/dragging/dragContext.ts";
import { useKanbanColumns } from "@kanbanio/stores/kanban/kanbanSelectors.ts";
import { addColumn } from "@kanbanio/stores/kanban/kanbanActions.ts";

export const KanbanBoard = (props: React.HTMLAttributes<HTMLDivElement>): React.ReactNode => {
    // --- STATE ---

    const columns = useKanbanColumns();

    const { isDragging } = useContext(DragContext);

    // --- CALLBACKS ---

    const handleCreateColumn = useCallback(() => addColumn({
        title: `Column ${columns.length + 1}`,
        tasksOrder: [],
    }), [columns]);

    // --- RENDER ---

    return (
        <main
            className={`flex w-full snap-x snap-mandatory flex-row justify-start gap-4 overflow-y-auto py-5 ${isDragging ? 'suppress-dropzone-events' : ''}
                ${props.className}`}
        >
            {columns.map((columnId) => (
                <KanbanBoardColumn key={columnId} id={columnId} />
            ))}

            <Button className="bg-white dark:bg-zinc-800 mt-5 snap-end self-start" icon={<Plus />} onClick={handleCreateColumn}>
                Add Column
            </Button>
        </main>
    );
};
