import { useContext, useCallback } from 'react';
import ModalContext from './context';

/**
 * Returns a memoized callback function to imperatively close a modal from within its contents.
 *
 * If this hook is used outside of a modal, a warning is issued, but it is a no-op.
 */
export const useImperativeModalClose = ({ IKnowThisIsIntentionallyBeingUsedOutsideAModal = false } = {}) => {
    const modal = useContext(ModalContext);
    return useCallback(() => {
        if (!modal) {
            if (!IKnowThisIsIntentionallyBeingUsedOutsideAModal) {
                console.warn('useImperativeModalClose should only be used inside a Modal');
            }
            return;
        }
        modal.onClose();
    }, [modal, IKnowThisIsIntentionallyBeingUsedOutsideAModal]);
};
