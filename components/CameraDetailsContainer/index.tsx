import React from "react";
import styles from "./CameraDetailsContainer.module.scss";
import FullScreen from "@library/ui/components/assets/full-screen.svg";
import { Text } from "../Text";
import ActiveCameraStatus from "@library/ui/components/assets/active-camera-status.svg";

/**
 * Interface for the CameraDetailsContainer component.
 */
export interface CameraDetailsContainerProps {
  /** Name of the camera */
  cameraName: string;

  /** Status of the camera (online, offline) */
  status?: "online" | "offline";

  /** Custom class name for additional styling */
  className?: string;

  /** Callback function when full screen button is clicked */
  onFullScreenClick?: () => void;
}

/**
 * A component for displaying camera information in a standardized format.
 * Shows camera name with status indicator and a fullscreen button.
 *
 * @example
 * ```tsx
 * // Basic usage with online status
 * <CameraDetailsContainer
 *   cameraName="Main Entrance Camera"
 *   status="online"
 * />
 *
 * // Offline camera with fullscreen handler
 * <CameraDetailsContainer
 *   cameraName="Loading Dock Camera"
 *   status="offline"
 *   onFullScreenClick={() => console.log('Fullscreen clicked')}
 * />
 *
 * // With custom class name
 * <CameraDetailsContainer
 *   cameraName="Parking Lot Camera"
 *   className="featured-camera"
 * />
 * ```
 */
export default function CameraDetailsContainer({
  cameraName,
  status = "online",
  className = "",
  onFullScreenClick,
}: CameraDetailsContainerProps): JSX.Element {
  return (
    <div
      className={`${styles.container} ${className}`}
      data-testid="camera-details-container"
    >
      <div className={styles.cameraInfo}>
        <ActiveCameraStatus className={styles[status]} />
        <Text variant="body-lg-med">{cameraName}</Text>
      </div>
      <button
        className={styles.fullScreenButton}
        onClick={onFullScreenClick}
        aria-label="Full Screen"
        data-testid="full-screen-button"
      >
        <FullScreen />
      </button>
    </div>
  );
}
