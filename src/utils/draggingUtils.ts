type DraggingDTO = {
    [key: string]: string | null;
};

const DATA_PARSING_REGEX: RegExp = /^custom-type#([^#]+)#(.+)$/;
const composeKey = (key: string, value: string | null): string => `custom-type#${key}#${value}`;

export const attachDraggingInfo = <Data extends DraggingDTO>(e: React.DragEvent, data: Data) => {
    for (const [key, value] of Object.entries(data)) {
        // In dragover, dragenter, dragleave events we have access only to types, not to values (HTML DnD API Spec),
        // so this way we can hack it to access values when needed via custom types.
        //
        // It works with keys ONLY IN LOWER CASE.
        e.dataTransfer.setData(composeKey(key, value), value ?? "");
    }
};

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
