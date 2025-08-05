import { type SetStateAction, useCallback, useState } from "react";
import {
    DragContext,
    DragUpdateContext,
} from "@kanbanio/stores/dragging/dragContext.ts";

export const DragProvider = ({ children }: { children: React.ReactNode }) => {
    const [isDragging, setIsDragging] = useState<boolean>(false);

    // Required timeout, because React will batch ondragenter and ondragleave events, preventing to actually drag element
    const delayedSetIsDragging = useCallback((action: SetStateAction<boolean>) => {
        setTimeout(() => setIsDragging(action), 0);
    }, []);

    return (
        <DragContext value={isDragging}>
            <DragUpdateContext value={delayedSetIsDragging}>{children}</DragUpdateContext>
        </DragContext>
    );
};
