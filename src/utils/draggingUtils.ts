export type DraggingDTO = {
    [key: string]: string;
};

/**
 * In dragover, dragenter, dragleave events dataTransfer object we have access only to transferring data types and not to
 * the actual values (see DragAndDrop API Spec).
 *
 * We can hack it with setting values into type names and extracting it by parsing type composed key.
 *
 * IMPORTANT: It works only if the key is LOWERCASE.
 */

const DATA_PARSING_REGEX: RegExp = /^custom-type#([^#]+)#(.+)$/;
const composeKey = (key: string, value: string): string => `custom-type#${key}#${value}`;

/**
 * Attaches transferring data to DragEvent dataTransfer types.
 *
 * @param e {React.DragEvent} - event to attach data to
 * @param data - generic data, that should be attached to event
 */
export const attachDraggingInfo = <Data extends DraggingDTO>(e: React.DragEvent, data: Data) => {
    for (const [key, value] of Object.entries(data)) {
        e.dataTransfer.setData(composeKey(key, value), value ?? "");
    }
};

/**
 * Retrieves transferring data attached to DragEvent via data types.
 *
 * @param e {React.DragEvent} - event with attached data in dataTransfer object types
 */
export const getDraggingInfo = <Data extends DraggingDTO>(e: React.DragEvent): Data => {
    const draggingInfo: DraggingDTO = {};

    e.dataTransfer.types.forEach((type) => {
        const match = type.match(DATA_PARSING_REGEX);
        const key = match?.[1];
        const value = match?.[2];

        if (key && value) {
            draggingInfo[key] = value;
        }
    });

    return draggingInfo as Data;
};
