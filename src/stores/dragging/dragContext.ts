import { createContext, type Dispatch, type SetStateAction } from "react";

export const DragContext = createContext<boolean>(false);
export const DragUpdateContext = createContext<Dispatch<SetStateAction<boolean>>>(() => {});
