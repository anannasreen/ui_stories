import React from 'react';
import ReactDOM from 'react-dom';

type PortalProps = {
    /** Function to generate a custom name for the portal container element */
    renderName?: (index: number) => string;
    /** Z-index value for the portal container (defaults to 10) */
    zIndex?: number;
};

/**
 * Portal component renders its children outside the normal DOM hierarchy.
 * Creates a separate div element at the end of the document body for the portal content.
 * Useful for modals, tooltips, and other components that need to visually "break out" of their containers.
 *
 * Each Portal instance maintains its own DOM element that gets automatically removed on unmount.
 *
 * ```
 * <Portal>
 *   <div>This content will be rendered at the end of the body</div>
 * </Portal>
 * ```
 */
export class Portal extends React.Component<PortalProps> {
    element: HTMLDivElement;

    static count = 0;

    constructor(props: PortalProps) {
        super(props);

        Portal.count += 1;

        this.element = document.createElement('div');
        this.element.setAttribute(
            'data-name',
            props.renderName ? props.renderName(Portal.count) : `portal-${Portal.count}`,
        );
        this.element.style.position = 'relative';
        this.element.style.zIndex = props.zIndex == null ? '10' : `${props.zIndex}`;

        window.document.body.appendChild(this.element);
    }

    componentWillUnmount() {
        this.element.remove();
    }

    render() {
        const { children } = this.props;

        return ReactDOM.createPortal(children, this.element);
    }
}
