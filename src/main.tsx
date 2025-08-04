import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "@kanbanio/App.tsx";
import { DragProvider } from "@kanbanio/stores/dragging/DragProvider.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <DragProvider>
            <App />
        </DragProvider>
    </StrictMode>
);
