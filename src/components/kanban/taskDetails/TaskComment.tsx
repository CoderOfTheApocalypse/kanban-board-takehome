import { memo, useRef } from "react";
import { Pencil, TrashIcon } from "lucide-react";
import type { StyleProps } from "@kanbanio/utils/componentTypes.ts";
import { Button } from "@kanbanio/components/common/Button.tsx";
import { EditableTextArea, type EditableTextAreaRef } from "@kanbanio/components/common/EditableTextArea.tsx";
import { editComment, removeComment } from "@kanbanio/stores/kanban/kanbanActions.ts";

type TaskCommentProps = {
    id: string;
    content: string;
    author: string;
    timestamp: Date;
    isEdited?: boolean;
} & StyleProps;

export const TaskComment = memo(({ id, author, className, isEdited, content, timestamp }: TaskCommentProps) => {
    // --- STATE ---

    const editableAreaRef = useRef<EditableTextAreaRef>(null);

    // --- CALLBACKS ---

    const handleRemoveComment = () => removeComment(id);

    const handleToggleEditComment = () => {
        editableAreaRef.current?.startEditing();
    };

    const handleEditComment = (updatedContent: string) => editComment(id, updatedContent);

    // --- RENDER ---

    return (
        <li className={`flex flex-col ${className}`}>
            <div className="flex flex-row justify-between">
                <p>
                    <strong>{author}</strong>&nbsp;
                    <small>{new Date(timestamp).toLocaleDateString()}</small>
                    {isEdited && <small>(edited)</small>}
                </p>

                <div className="flex flex-row gap-1">
                    <Button
                        className="self-center border-none p-1 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                        icon={<Pencil size={20} />}
                        onClick={handleToggleEditComment}
                    />

                    <Button
                        className="self-center border-none p-1 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                        icon={<TrashIcon size={20} />}
                        onClick={handleRemoveComment}
                    />
                </div>
            </div>

            <EditableTextArea ref={editableAreaRef} value={content} onEdit={handleEditComment} />
        </li>
    );
});
