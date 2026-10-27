"use client";

import { useEffect, useId, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

let locks = 0;
let previousOverflow = '';

export default function AccessibleModal({ isOpen, onClose, title, description, children, size = 'default' }: {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    description?: string;
    children: ReactNode;
    size?: 'default' | 'wide' | 'archive';
}) {
    const ref = useRef<HTMLDialogElement>(null);
    const onCloseRef = useRef(onClose);
    onCloseRef.current = onClose;
    const id = useId();

    useEffect(() => {
        if (!isOpen || !ref.current) return;
        const dialog = ref.current;
        const trigger = document.activeElement instanceof HTMLElement ? document.activeElement : null;
        if (locks++ === 0) {
            previousOverflow = document.body.style.overflow;
            document.body.style.overflow = 'hidden';
        }
        dialog.showModal();
        return () => {
            dialog.close();
            if (--locks === 0) document.body.style.overflow = previousOverflow;
            if (trigger?.isConnected) trigger.focus({ preventScroll: true });
        };
    }, [isOpen]);

    if (!isOpen || typeof document === 'undefined') return null;
    return createPortal(
        <dialog ref={ref} className="event-modal event-site" aria-labelledby={`${id}-title`}
            aria-describedby={description ? `${id}-description` : undefined}
            onCancel={event => { event.preventDefault(); event.stopPropagation(); onCloseRef.current(); }}
            onClick={event => { if (event.target === event.currentTarget) onCloseRef.current(); }}>
            <div className={`event-modal-panel event-modal-${size}`}>
                <header className="event-modal-header">
                    <div className="min-w-0">
                        <h2 id={`${id}-title`} className="text-xl font-bold text-white">{title}</h2>
                        {description && <p id={`${id}-description`} className="mt-2 text-sm text-gray-300">{description}</p>}
                    </div>
                    <button type="button" autoFocus onClick={onClose} aria-label={`Tutup ${title}`} className="event-close">
                        <X size={22} aria-hidden="true" />
                    </button>
                </header>
                <div className="event-modal-content">{children}</div>
            </div>
        </dialog>, document.body,
    );
}
