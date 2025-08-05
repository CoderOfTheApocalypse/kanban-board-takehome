import { memo, useRef, useState } from "react";
import { flushSync } from "react-dom";

type EditableLabelProps = {
    value: string;
    placeholder?: string;
    resetOnBlur?: boolean;
    onEdit: (updatedValue: string) => void;
    className?: string;
    buttonClassName?: string;
    inputClassName?: string;
};

export const EditableLabel = memo(
    ({
        value,
        placeholder,
        resetOnBlur,
        onEdit,
        className,
        buttonClassName,
        inputClassName,
    }: EditableLabelProps): React.JSX.Element => {
        // --- STATE ---

        const [isEditing, setIsEditing] = useState<boolean>(false);
        const [draftValue, setDraftValue] = useState<string>(value);
        const inputRef = useRef<HTMLInputElement>(null);

        // --- CALLBACKS ---

        const handleStartEditing = (e: React.MouseEvent) => {
            e.stopPropagation();

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

        const handleReset = () => {
            flushSync(() => {
                setDraftValue(value);
                setIsEditing(false);
            });
            inputRef.current?.blur();
        };

        const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
            e.stopPropagation();

            if (e.key === "Enter") {
                handleSave();
            }

            if (e.key === "Escape") {
                handleReset();
            }
        };

        const handleClick = (e: React.MouseEvent<HTMLInputElement>) => e.stopPropagation();

        // --- RENDER ---

        return (
            <div className={`relative min-w-0 ${className}`}>
                <button
                    tabIndex={isEditing ? -1 : 0}
                    className={`w-full cursor-pointer overflow-hidden rounded-md border-none p-2 text-left text-nowrap
                        text-ellipsis ${isEditing && "absolute top-0 left-0 z-[-1]"}
                        ${buttonClassName}`}
                    onClick={handleStartEditing}
                >
                    {value}
                </button>

                <input
                    className={`w-full border-none p-2
                        ${!isEditing && "absolute top-0 left-0 z-[-1]"} ${inputClassName}`}
                    ref={inputRef}
                    type="text"
                    tabIndex={isEditing ? 0 : -1}
                    value={draftValue}
                    placeholder={placeholder}
                    onBlur={resetOnBlur ? handleReset : handleSave}
                    onKeyDown={handleKeyDown}
                    onChange={handleChange}
                    onClick={handleClick}
                />
            </div>
        );
    }
);
