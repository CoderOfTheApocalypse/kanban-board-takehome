import { useRef } from "react";
import { Pencil, TextIcon } from "lucide-react";
import { EditableTextArea, type EditableTextAreaRef } from "@kanbanio/components/common/EditableTextArea.tsx";
import type { KanbanTaskModel } from "@kanbanio/stores/kanban/kanbanTypes.ts";
import type { StyleProps } from "@kanbanio/utils/componentTypes.ts";
import { Button } from "@kanbanio/components/common/Button.tsx";

type TaskDetailsProps = {
    taskDetails: KanbanTaskModel;
    onEdit: (updates: Partial<KanbanTaskModel>) => void;
} & StyleProps;

export const TaskDetails = ({ taskDetails, onEdit, className }: TaskDetailsProps) => {
    // --- STATE ---

    const descriptionTextAreaRef = useRef<EditableTextAreaRef>(null);

    // --- CALLBACKS ---

    const handleDetailsEditToggle = () => descriptionTextAreaRef.current?.startEditing();

    const handleUpdateDescription = (description: string) => onEdit({ description });

    // --- RENDER ---

    return (
        <div className={`flex w-full flex-col gap-2 ${className}`}>
            <div className="flex flex-row items-center justify-between">
                <div className="flex flex-row items-center gap-2">
                    <TextIcon size={20} />
                    Description
                </div>

                <Button className="border-none hover:bg-zinc-200 dark:hover:bg-zinc-700" icon={<Pencil size={20} />} onClick={handleDetailsEditToggle} />
            </div>

            <EditableTextArea
                ref={descriptionTextAreaRef}
                wrapperStyles="h-full md:overflow-y-auto"
                value={taskDetails.description}
                onEdit={handleUpdateDescription}
            />
        </div>
    );
};
