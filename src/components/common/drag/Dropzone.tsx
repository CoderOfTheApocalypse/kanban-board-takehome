import { useContext, useState } from "react";
import { getDraggingInfo } from "@kanbanio/utils/draggingUtils.ts";
import type { StyleProps } from "@kanbanio/utils/componentTypes.ts";
import type { DraggingEntityType } from "@kanbanio/components/kanban/utils/kanbanComponentTypes.ts";
import type { DraggingEventData } from "@kanbanio/components/common/drag/dragTypes.ts";
import { DragUpdateContext } from "@kanbanio/stores/dragging/dragContext.ts";

type DropzoneProps = {
    catchingType: DraggingEntityType;
    onDrop: (sourceId: string) => void;
    wrapperStyles?: string;
} & StyleProps;

export const Dropzone = ({ catchingType, onDrop, className, wrapperStyles }: DropzoneProps): React.JSX.Element => {
    // --- STATE ---

    const [isReceiving, setIsReceiving] = useState<boolean>(false);
    const setGlobalDragging = useContext(DragUpdateContext);

    // --- CALLBACKS ---

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();

        const { type } = getDraggingInfo<DraggingEventData<DraggingEntityType>>(e);
        if (catchingType === type) {
            setIsReceiving(true);
        }
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();

        const { type } = getDraggingInfo<DraggingEventData<DraggingEntityType>>(e);
        if (catchingType === type) {
            setIsReceiving(false);
        }
    };
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsReceiving(false);

        console.log("SET FALSE BITCH");
        setGlobalDragging(false);

        const { id, type } = getDraggingInfo<DraggingEventData<DraggingEntityType>>(e);
        if (catchingType === type) {
            onDrop(id);
        }

        e.dataTransfer.clearData();
    };

    // --- RENDER ---

    return (
        <div
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className={`dropzone flex flex-col justify-start ${wrapperStyles}`}
        >
            {isReceiving && (
                <div className={`${isReceiving ? "border-2 border-dashed" : ""} ${className}`} />
            )}
        </div>
    );
};
