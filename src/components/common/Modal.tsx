import { createPortal } from "react-dom";
import { type PropsWithChildren, useEffect } from "react";

type ModalProps = {
    isOpen: boolean;
    closeOnOutsideClick?: boolean;
    onClose: () => void;
} & PropsWithChildren;

export const Modal = ({ isOpen, closeOnOutsideClick, onClose, children }: ModalProps) => {
    // --- EFFECTS ---

    useEffect(() => {
        if (!isOpen) return;

        const ac = new AbortController();
        document.addEventListener(
            "keydown",
            (e: KeyboardEvent) => {
                if (e.key === "Escape") {
                    onClose();
                }
            },
            { signal: ac.signal }
        );

        return () => ac.abort();
    }, [isOpen, onClose]);

    // --- RENDER ---

    if (!isOpen) return null;

    return createPortal(
        <div
            className="absolute top-0 left-0 z-50 flex h-full w-full items-center justify-center bg-zinc-300/70
                backdrop-blur-xs dark:bg-black/70"
            onClick={closeOnOutsideClick ? onClose : () => {}}
        >
            <div
                className="h-screen min-h-[50vh] w-full max-w-3xl rounded-xl bg-white p-6 shadow-lg sm:h-[90vh]
                    md:h-[80vh] lg:h-[70vh] dark:bg-black"
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
            >
                {children}
            </div>
        </div>,
        document.body
    );
};
