import { memo, useRef, useState } from "react";
import { flushSync } from "react-dom";

type EditableLabelProps = {
    value: string;
    placeholder?: string;
    onEdit: (updatedValue: string) => void;
    className?: string;
};

export const EditableLabel = memo(({ value, placeholder, onEdit, className }: EditableLabelProps): React.JSX.Element => {
    // --- STATE ---

    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [draftValue, setDraftValue] = useState<string>(value);
    const inputRef = useRef<HTMLInputElement>(null);

    // --- CALLBACKS ---

    const handleStartEditing = () => {
        inputRef.current?.focus();
        inputRef.current?.select();
        setIsEditing(true);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDraftValue(e.target.value);
    };

    const handleSave = () => {
        inputRef.current?.blur();
        setIsEditing(false);

        if (value !== draftValue) {
            onEdit(draftValue);
        }
    };

    const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
        e.stopPropagation();

        if (e.key === "Enter") {
            handleSave();
        }

        if (e.key === "Escape") {
            flushSync(() => {
                setDraftValue(value);
                setIsEditing(false);
            });
            inputRef.current?.blur();
        }
    };

    // --- RENDER ---

    return (
        <div className={`relative min-w-0 ${className}`}>
            <button
                tabIndex={isEditing ? -1 : 0}
                className={`dark:br-zinc-600 w-full cursor-pointer overflow-hidden rounded-md border-none p-2 text-left
                    text-nowrap text-ellipsis text-black hover:bg-zinc-50 dark:hover:bg-zinc-700 dark:text-white
                    ${isEditing && "absolute top-0 left-0 z-[-1]"}`}
                onClick={handleStartEditing}
            >
                {value}
            </button>

            <input
                className={`w-full border-none p-2 text-black dark:text-white ${!isEditing && "absolute top-0 left-0 z-[-1]"}`}
                ref={inputRef}
                type="text"
                tabIndex={isEditing ? 0 : -1}
                value={draftValue}
                placeholder={placeholder}
                onBlur={handleSave}
                onKeyUp={handleKeyUp}
                onChange={handleChange}
            />
        </div>
    );
});
