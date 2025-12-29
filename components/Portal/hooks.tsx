import React, {
    useState,
    useCallback,
    createContext,
    useMemo,
    useContext,
    isValidElement,
    cloneElement,
    useRef,
    ReactNode,
} from 'react';
import { createPortal } from 'react-dom';
import { useCheckMounted } from '../../hooks';

export const usePortal = (captureFinalContent?: boolean) => {
    const checkMounted = useCheckMounted();

    const [el, setEl] = useState<HTMLDivElement | null>(null);

    const receiverRef = useCallback(
        (ref: HTMLDivElement | null) => {
            if (el === ref) return;
            if (!ref && !checkMounted()) return;

            setEl(ref);
        },
        [el, checkMounted],
    );

    const content = useRef<ReactNode>(null);
    const finalContent = useRef<ReactNode>(null);

    const send = useCallback(
        (children: React.ReactNode) => {
            content.current = children;
            if (!el) return null;
            return createPortal(children, el);
        },
        [el],
    );

    const receive = useCallback(() => {
        return finalContent.current ? <div>{finalContent.current}</div> : <div ref={receiverRef} />;
    }, [receiverRef]);

    const close = useCallback(() => {
        if (!captureFinalContent) return;

        const currentContent = content.current;
        finalContent.current = isValidElement(currentContent) ? cloneElement(currentContent) : currentContent || true;
    }, [captureFinalContent]);

    return useMemo(() => ({ send, receive, close }), [send, receive, close]);
};

const portalContext = createContext<ReturnType<typeof usePortal> | null>(null);

export function PortalBroker({ children }: { children?: ReactNode }) {
    const api = usePortal();
    return <portalContext.Provider value={api}>{children}</portalContext.Provider>;
}

export function PortalSource({ children }: { children?: ReactNode }) {
    const api = useContext(portalContext);
    if (!api) throw new Error('PortalSource must be used within a PortalBroker');

    return api.send(children);
}

export function PortalDestination() {
    const api = useContext(portalContext);
    if (!api) throw new Error('PortalDestination must be used within a PortalBroker');

    return api.receive();
}
