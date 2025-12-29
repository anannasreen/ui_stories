import { createContext, MouseEvent } from 'react';

const ModalContext = createContext<{
    id: string;
    onClose: (e?: MouseEvent) => any;
} | null>(null);

export default ModalContext;
