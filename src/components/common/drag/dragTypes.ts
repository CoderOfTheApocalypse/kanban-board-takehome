import type { DraggingDTO } from "@kanbanio/utils/draggingUtils.ts";

export interface DraggingEventData<T extends string> extends DraggingDTO {
    id: string;
    type: T;
}