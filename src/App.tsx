import { KanbanBoard } from "@kanbanio/components/kanban/board/KanbanBoard.tsx";

export const App = (): React.ReactNode => (
    <div className="align-center absolute top-0 right-0 bottom-0 left-0 flex flex-col justify-start">
        <section className="my-auto w-full shrink-0 grow-0 px-10 py-10 text-center">
            <h1 className="text-3xl text-shadow-2xs">KanbanIO 🐗</h1>
        </section>

        <KanbanBoard className="relative h-full w-full shrink grow px-10" />
    </div>
);
