import { createContext, type Dispatch, type SetStateAction } from "react";

export type DragState = {
    isDragging: boolean;
    entityType: string | null;
    entityId: string | null;
};

export const INITIAL_DRAG_STATE: DragState = {
    isDragging: false,
    entityId: null,
    entityType: null,
};

const INITIAL_DRAG_STATE_UPDATE_FN: Dispatch<SetStateAction<DragState>> = () => {};

export const DragContext = createContext<DragState>(INITIAL_DRAG_STATE);
export const DragUpdateContext = createContext<Dispatch<SetStateAction<DragState>>>(INITIAL_DRAG_STATE_UPDATE_FN);
