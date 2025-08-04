import { type SetStateAction, useCallback, useState } from "react";
import {
    DragContext,
    type DragState,
    DragUpdateContext,
    INITIAL_DRAG_STATE,
} from "@kanbanio/stores/dragging/dragContext.ts";

export const DragProvider = ({ children }: { children: React.ReactNode }) => {
    const [isDragging, setIsDragging] = useState<DragState>(INITIAL_DRAG_STATE);

    // This is required, because otherwise style is applied too fast and react
    const delayedSetIsDragging = useCallback((action: SetStateAction<DragState>) => {
        setTimeout(() => setIsDragging(action), 0);
    }, []);

    return (
        <DragContext value={isDragging}>
            <DragUpdateContext value={delayedSetIsDragging}>{children}</DragUpdateContext>
        </DragContext>
    );
};
