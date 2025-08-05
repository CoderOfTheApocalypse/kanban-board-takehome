import { type Ref, useImperativeHandle, useRef, useState } from "react";
import { Button } from "@kanbanio/components/common/Button.tsx";
import TextareaAutosize from "react-textarea-autosize";

type EditableTextAreaProps = {
    ref?: Ref<EditableTextAreaRef>;
    value?: string;
    onEdit: (value: string) => void;
    wrapperStyles?: string;
    labelStyles?: string;
    textAreaStyles?: string;
};

export type EditableTextAreaRef = {
    startEditing: () => void;
    stopEditing: () => void;
};

export const EditableTextArea = ({
    ref,
    value = "",
    onEdit,
    labelStyles,
    textAreaStyles,
    wrapperStyles,
}: EditableTextAreaProps) => {
    // --- STATE ---

    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [draft, setDraft] = useState<string>(value);

    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    // Ref

    useImperativeHandle(
        ref,
        () => ({
            startEditing() {
                setIsEditing(true);
            },
            stopEditing() {
                setIsEditing(false);
            },
        }),
        []
    );

    // --- CALLBACKS ---

    const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setDraft(e.target.value);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Escape") {
            e.stopPropagation();

            handleReset();
        }
    };

    const handleReset = () => {
        setDraft(value);
        textAreaRef.current?.blur();
        setIsEditing(false);
    };

    const handleSave = () => {
        console.log("save!");
        onEdit(draft);
        setIsEditing(false);
        textAreaRef.current?.blur();
    };

    // --- RENDER ---

    return (
        <div className={`flex w-full gap-2 ${isEditing ? "flex-col" : "flex-row"} ${wrapperStyles}`}>
            {!isEditing && <div className={`w-full p-2 ${labelStyles}`}>{value}</div>}

            {isEditing && (
                <>
                    <TextareaAutosize
                        autoFocus
                        cacheMeasurements
                        ref={textAreaRef}
                        className={`w-full resize-none border p-2 focus:border-blue-800 ${textAreaStyles}`}
                        value={draft}
                        onChange={handleTextAreaChange}
                        onKeyDown={handleKeyDown}
                    />

                    <div className="flex flex-row justify-end gap-2">
                        <Button
                            className="border-0 bg-transparent px-2 py-1 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                            onClick={handleReset}
                        >
                            Cancel
                        </Button>

                        <Button
                            className="border-blue-700 bg-blue-400 px-2 py-1 text-black hover:bg-blue-300
                                dark:bg-blue-400 dark:text-black dark:hover:bg-blue-300"
                            onClick={handleSave}
                        >
                            Save
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
};
