import { useContext, useRef, useState } from "react";

import { attachDraggingInfo, getDraggingInfo } from "@kanbanio/utils/draggingUtils.ts";
import { DragUpdateContext, INITIAL_DRAG_STATE } from "@kanbanio/stores/dragging/dragContext.ts";

type DraggingDTO = {
    id: string;
    type: string;
};

type DroppableZoneProps = {
    as?: React.ElementType;
    entityId: string;
    entityType: string;
    sortingDirection: "horizontal" | "vertical";
    wrapperStyles?: string;
    elementStyles?: string;
    onDrop: (sourceId: string, destinationId: string, position: "before" | "after") => void;
} & React.PropsWithChildren;

export const DragAndDropItem = ({
    as,
    entityId,
    entityType,
    sortingDirection,
    wrapperStyles,
    elementStyles,
    onDrop,
    children,
}: DroppableZoneProps): React.JSX.Element => {
    // --- STATE ---

    const setGlobalDragging = useContext(DragUpdateContext);

    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [isReceiving, setIsReceiving] = useState<boolean>(false);
    const [insertionPosition, setInsertionPosition] = useState<"before" | "after" | null>(null);

    const dropzoneRootRef = useRef(null);

    // --- DRAGGING ELEMENT CALLBACKS ---

    const handleDragStart = (e: React.DragEvent<HTMLElement>) => {
        attachDraggingInfo<DraggingDTO>(e, { id: entityId, type: entityType });

        setIsDragging(true);
        setGlobalDragging({ isDragging: true, entityType, entityId });
    };

    const handleDragEnd = (e: React.DragEvent<HTMLElement>) => {
        e.dataTransfer.clearData();

        setIsDragging(false);
        setGlobalDragging(INITIAL_DRAG_STATE);
    };

    // --- DROPZONE CALLBACKS ---

    const handleDragEnter = (e: React.DragEvent<HTMLElement>) => {
        const { id: draggableId } = getDraggingInfo<DraggingDTO>(e);

        if (entityId !== draggableId) {
            setIsReceiving(true);
        }
    };

    const handleDragLeave = (e: React.DragEvent<HTMLElement>) => {
        const { id: draggableId } = getDraggingInfo<DraggingDTO>(e);

        if (entityId !== draggableId) {
            setIsReceiving(false);
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLElement>) => {
        e.preventDefault();

        const { id: draggableId } = getDraggingInfo<DraggingDTO>(e);
        if (entityId === draggableId) {
            return;
        }

        if (sortingDirection === "vertical") {
            const mouseY = e.clientY;
            const { height, y } = e.currentTarget.getBoundingClientRect();
            setInsertionPosition(mouseY < y + height / 2 ? "before" : "after");
        } else {
            const mouseX = e.clientX;
            const { width, x } = e.currentTarget.getBoundingClientRect();
            setInsertionPosition(mouseX < x + width / 2 ? "before" : "after");
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLElement>) => {
        e.preventDefault();
        setIsReceiving(false);
        setInsertionPosition(null);

        const { id: sourceId } = getDraggingInfo<DraggingDTO>(e);

        if (sourceId !== entityId) {
            onDrop(sourceId, entityId, insertionPosition ?? "after");
        }
    };

    // --- RENDER ---

    const Component = as || "div";

    return (
        <Component
            draggable
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`dropzone ${wrapperStyles} ${isDragging && "opacity-25"}`}
        >
            {isReceiving && insertionPosition === "before" && (
                <div className={`${elementStyles} border-2 border-dashed bg-white/1 dark:bg-zinc-900/1`} />
            )}

            <div ref={dropzoneRootRef} className={elementStyles}>
                {children}
            </div>

            {isReceiving && insertionPosition === "after" && (
                <div className={`${elementStyles} border-2 border-dashed bg-white/1 dark:bg-zinc-900/1`} />
            )}
        </Component>
    );
};
