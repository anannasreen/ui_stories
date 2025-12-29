import React from 'react';

/**
 * Interface for the Video component props
 */
export interface VideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
    /**
     * The MediaStream object to display in the video element
     */
    srcObject: MediaStream | null;

    /**
     * Whether the video should be enabled
     * @default true
     */
    enabled?: boolean;
}

interface VideoState {
    /** Whether the video is visible */
    visible: boolean;
}

/**
 * Video component for displaying MediaStream content
 *
 * This component renders a video element that can display a MediaStream object.
 * It has built-in visibility handling and can be enabled/disabled as needed.
 *
 * ```tsx
 * // Example usage:
 * <Video
 *   srcObject={mediaStream}
 *   enabled={true}
 *   muted={true}
 *   autoPlay
 * />
 * ```
 */
export class Video extends React.Component<VideoProps, VideoState> {
    state: VideoState = {
        visible: false,
    };

    ref = React.createRef<HTMLVideoElement>();

    static defaultProps = {
        enabled: true,
    };

    updateSrcObject = () => {
        const { srcObject } = this.props;

        if (this.ref.current) {
            if (!this.props.enabled || !this.state.visible) {
                this.ref.current.srcObject = null;
                return;
            }

            if (this.ref.current.srcObject !== srcObject) {
                this.ref.current.srcObject = srcObject;
            }
        }
    };

    onVisibilityStateChanged = () => {
        this.setState({ visible: document.visibilityState === 'visible' });
    };

    componentDidMount() {
        document.addEventListener('visibilitychange', this.onVisibilityStateChanged);
        this.onVisibilityStateChanged();
        this.updateSrcObject();
    }

    componentDidUpdate() {
        this.updateSrcObject();
    }

    componentWillUnmount() {
        document.removeEventListener('visibilitychange', this.onVisibilityStateChanged);
    }

    render() {
        const { srcObject, enabled, ...props } = this.props;

        return <video ref={this.ref} {...props} />;
    }
}
