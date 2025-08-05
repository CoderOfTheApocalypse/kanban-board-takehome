import { useRef } from "react";
import { MessageCircleMore } from "lucide-react";
import { useSelectedTaskComments } from "@kanbanio/stores/kanban/kanbanSelectors.ts";
import type { StyleProps } from "@kanbanio/utils/componentTypes.ts";
import { addComment } from "@kanbanio/stores/kanban/kanbanActions.ts";
import TextareaAutosize from "react-textarea-autosize";
import { TaskComment } from "@kanbanio/components/kanban/taskDetails/TaskComment.tsx";

type TaskCommentsProps = {
    taskId: string;
} & StyleProps;

export const TaskComments = ({ taskId, className }: TaskCommentsProps) => {
    // --- STATE ---

    const taskComments = useSelectedTaskComments();

    const commentInputRef = useRef<HTMLTextAreaElement>(null);

    // --- CALLBACKS ---

    const handleCommentInputKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter") {
            e.stopPropagation();

            const value = e.currentTarget.value;
            commentInputRef.current!.blur();
            commentInputRef.current!.value = "";

            addComment(taskId, value);
        }

        if (e.key === "Escape") {
            e.stopPropagation();

            commentInputRef.current!.blur();
            commentInputRef.current!.value = "";
        }
    };

    // --- RENDER ---

    return (
        <div className={`flex w-full flex-col gap-4 ${className}`}>
            <div className="flex flex-row items-center gap-2">
                <MessageCircleMore size={20} />
                Comments
            </div>

            <div className="w-full">
                <TextareaAutosize
                    ref={commentInputRef}
                    className="w-full grow resize-none rounded-md border border-zinc-200 bg-white p-2 hover:border-zinc-400 dark:bg-zinc-800
                        hover:dark:bg-zinc-700"
                    placeholder="Write a comment..."
                    onKeyDown={handleCommentInputKeyDown}
                />
            </div>

            {!!taskComments.length && (
                <ol className="flex flex-col gap-4 md:overflow-y-auto">
                    {taskComments?.map((comment) => (
                        <TaskComment
                            key={comment.id}
                            id={comment.id}
                            author={comment.author}
                            content={comment.content}
                            timestamp={comment.timestamp}
                        />
                    ))}
                </ol>
            )}

            {!taskComments.length && <p className="w-full text-center text-gray-500">No comments here yet...</p>}
        </div>
    );
};
