import { memo } from "react";
import { X } from "lucide-react";
import { Modal } from "@kanbanio/components/common/Modal.tsx";
import { useSelectedTaskDetails } from "@kanbanio/stores/kanban/kanbanSelectors.ts";
import { deselectTask, updateTask } from "@kanbanio/stores/kanban/kanbanActions.ts";
import { EditableLabel } from "@kanbanio/components/common/EditableLabel.tsx";
import { Button } from "@kanbanio/components/common/Button.tsx";
import { TaskDetails } from "@kanbanio/components/kanban/taskDetails/TaskDetails.tsx";
import { TaskComments } from "@kanbanio/components/kanban/taskDetails/TaskComments.tsx";
import type { KanbanTaskModel } from "@kanbanio/stores/kanban/kanbanTypes.ts";

export const TaskDetailsModal = memo(() => {
    // --- STATE ---

    const taskDetails = useSelectedTaskDetails();

    // --- CALLBACKS ---

    const handleTaskRename = (updatedTitle: string) => updateTask(taskDetails!.id, { title: updatedTitle });

    const handleUpdates = (updates: Partial<KanbanTaskModel>) => updateTask(taskDetails!.id, updates);

    // --- RENDER ---

    return (
        <Modal isOpen={!!taskDetails} onClose={deselectTask}>
            {taskDetails && (
                <div className="flex flex-col gap-2 h-full">
                    <div className="flex flex-row justify-between">
                        <EditableLabel
                            className="w-full rounded-md text-xl hover:bg-zinc-200 dark:hover:bg-zinc-700"
                            value={taskDetails.title}
                            onEdit={handleTaskRename}
                        />

                        <Button
                            className="self-center border-0 hover:bg-zinc-200 dark:hover:bg-zinc-700 p-2"
                            icon={<X size={20} />}
                            onClick={deselectTask}
                        />
                    </div>

                    {/* Task body */}
                    <div className="flex max-h-[80vh] h-full flex-col items-stretch gap-6 overflow-y-hidden md:flex-row">
                        <div className="rounded-md bg-zinc-50/25 p-2 md:basis-7/12 dark:bg-zinc-900">
                            <TaskDetails
                                className="max-h-full"
                                taskDetails={taskDetails}
                                onEdit={handleUpdates}
                            />
                        </div>

                        {/* Comments */}
                        <TaskComments
                            taskId={taskDetails.id}
                            className="rounded-md bg-zinc-50/25 p-2 md:basis-5/12 dark:bg-zinc-900"
                        />
                    </div>
                </div>
            )}
        </Modal>
    );
});
