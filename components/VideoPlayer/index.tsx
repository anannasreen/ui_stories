import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  HTMLProps,
  MouseEvent,
  forwardRef,
  useImperativeHandle,
} from "react";
import { FaExpand } from "react-icons/fa";
import clsx from "clsx";
import styles from "./VideoPlayer.module.scss";
import PlayButton from "../assets/play-button.svg";
import PauseButton from "../assets/pause-button.svg";
import { Text } from "../Text";
import { formatTime } from "@library/ui/utils/format/time";
import useResizeObserver from "use-resize-observer";
import { clamp } from "lodash";

declare global {
  interface HTMLVideoElement {
    seek?: (timestamp: string) => void;
  }
}

/**
 * Interface for timeline events in the video player
 * @property {string} time - ISO format UTC time string when the event occurs
 * @property {React.ReactNode} icon - SVG icon component to display as the event marker
 * @property {string} title - Title text shown when hovering over the event marker
 */
export interface TimelineEvent {
  time: string;
  icon: React.ReactNode;
  title: string;
}

export interface VideoPlayerProps
  extends Pick<HTMLProps<HTMLVideoElement>, "onLoadedMetadata"> {
  /** URL of the video file to play (MP4 format) */
  videoUrl: string;

  /** ISO format UTC time string for the video's start time */
  videoStartTime: string;

  /** ISO format UTC time string for the video's end time */
  videoEndTime?: string;

  /** Array of timeline events to display on the progress bar */
  events?: TimelineEvent[];

  /** Whether to show timestamps in the control bar. Default: true */
  showTimestamps?: boolean;

  /** Whether to show the fullscreen toggle button. Default: true */
  showFullscreenButton?: boolean;

  /** Width of the video player container. Default: '100%' */
  width?: string;

  /** Whether to show the video control bar. Default: true */
  showControls?: boolean;

  /** Aspect ratio for the video container (e.g., '16/9', '4/3'). Default: '16/9' */
  aspectRatio?: string;

  /** Whether to auto-play the video when hovering over it. Default: false */
  playOnHover?: boolean;

  /** Whether to show the meridiem (AM/PM) in the time display. Default: true */
  showMeridiem?: boolean;

  /** Timezone to display timestamps in. If not provided, local timezone is used. */
  timezone?: string;

  /** Callback function called when the video has loaded */
  onLoadedMetadata?: () => void;
}

/**
 * VideoPlayer component for playing videos.
 *
 * ```
 * <VideoPlayer
 *   videoUrl="https://example.com/video.mp4"
 *   videoStartTime="2023-01-01T00:00:00"
 *   showTimestamps={true}
 *   showFullscreenButton={true}
 *   width="100%"
 *   showControls={true}
 *   aspectRatio="16/9"
 *   playOnHover={false}
 *   showMeridiem={true}
 *   onLoadedMetadata={() => {}}
 * />
 * ```
 */
export const VideoPlayer = forwardRef<HTMLVideoElement, VideoPlayerProps>(
  (
    {
      videoUrl,
      videoStartTime,
      events = [],
      showTimestamps = true,
      showFullscreenButton = true,
      width = "100%",
      showControls = true,
      aspectRatio = "16/9",
      playOnHover = false,
      showMeridiem = true,
      timezone,
      onLoadedMetadata,
      videoEndTime,
    },
    ref
  ) => {
    const { ref: inputRef, width: inputWidth = 0 } = useResizeObserver();
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [hideBtn, setHideBtn] = useState(false);
    const hideBtnTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState<string>(videoStartTime);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [currentTimeS, setCurrentTimeS] = useState(0);
    const durationS = duration;
    const animationFrameRef = useRef<number>();

    // Calculate the actual, offset position of the center of an entry for it to not overflow on either end
    // (this matches how the browser computes thumb position).
    const getTrackPosition = useCallback(
      (timeFraction: number, itemWidthPx: number) =>
        timeFraction * (inputWidth - itemWidthPx) + itemWidthPx / 2,
      [inputWidth]
    );

    useImperativeHandle(ref, () => {
      if (!videoRef.current) {
        return document.createElement("video");
      }

      const video = videoRef.current;
      video.seek = (timestamp: string) => {
        const eventTime = new Date(timestamp).getTime();
        const startTime = new Date(videoStartTime).getTime();
        const seekTime = (eventTime - startTime) / 1000;

        if (seekTime >= 0 && seekTime <= video.duration) {
          video.currentTime = seekTime;
          setCurrentTime(timestamp);
          setProgress(seekTime / video.duration);
          video.play();
          setIsPlaying(true);
        }
      };
      return video;
    }, [videoStartTime]);

    useEffect(() => {
      if (videoRef.current) {
        videoRef.current.addEventListener(
          "loadedmetadata",
          handleLoadedMetadata
        );
      }

      return () => {
        if (videoRef.current) {
          videoRef.current.removeEventListener(
            "loadedmetadata",
            handleLoadedMetadata
          );
        }
        // Clean up animation frame on unmount
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    }, []);

    useEffect(() => {
      const updateProgress = () => {
        if (videoRef.current && isPlaying) {
          const currentS = videoRef.current.currentTime;
          setCurrentTimeS(currentS);
          setCurrentTime(addSeconds(videoStartTime, currentS));
          setProgress(Math.min(currentS / duration, 1));
          animationFrameRef.current = requestAnimationFrame(updateProgress);
        }
      };

      if (isPlaying) {
        animationFrameRef.current = requestAnimationFrame(updateProgress);
      } else if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    }, [isPlaying, videoStartTime, duration]);

    useEffect(() => {
      const handleFullscreenChange = () => {
        setIsFullscreen(document.fullscreenElement !== null);
      };

      document.addEventListener("fullscreenchange", handleFullscreenChange);
      return () =>
        document.removeEventListener(
          "fullscreenchange",
          handleFullscreenChange
        );
    }, []);

    useEffect(() => {
      const handleKeyPress = (event: KeyboardEvent) => {
        if (event.key === "Escape" && isFullscreen) {
          document.exitFullscreen();
          setIsFullscreen(false);
        }
      };

      document.addEventListener("keydown", handleKeyPress);
      return () => document.removeEventListener("keydown", handleKeyPress);
    }, [isFullscreen]);

    const addSeconds = (isoTime: string, seconds: number): string => {
      const date = new Date(isoTime);
      date.setSeconds(date.getSeconds() + seconds);
      return date.toISOString();
    };

    const handleTimeUpdate = () => {
      if (videoRef.current) {
        // We'll use the animation frame for smoother updates instead
        // Just set the duration here if needed
        if (duration === 0) {
          setDuration(videoRef.current.duration);
        }
      }
    };

    const handleLoadedMetadata = () => {
      if (videoRef.current) {
        setDuration(videoRef.current.duration);
      }
      onLoadedMetadata?.();
    };

    const togglePlay = (e: MouseEvent) => {
      e.stopPropagation();
      if (videoRef.current) {
        if (isPlaying) {
          videoRef.current.pause();
        } else {
          videoRef.current.play();
        }
        setIsPlaying(!isPlaying);
      }
    };

    const toggleFullscreen = () => {
      if (!document.fullscreenElement && containerRef.current) {
        containerRef.current.requestFullscreen();
        setIsFullscreen(true);
      } else if (document.fullscreenElement && document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    };

    const onStartSeek = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTime = parseFloat(e.target.value);
        setCurrentTimeS(newTime);
        if (videoRef.current) {
          videoRef.current.currentTime = newTime;
          // Update the timestamp immediately for better UX
          setCurrentTime(addSeconds(videoStartTime, newTime));
          setProgress(Math.min(newTime / duration, 1));
        }
      },
      [videoStartTime, duration]
    );

    const getEventPosition = useCallback(
      (eventTime: string) => {
        const eventDate = new Date(eventTime);
        const startDate = new Date(videoStartTime);
        const eventTimeMs = eventDate.getTime();
        const startTimeMs = startDate.getTime();
        const endTimeMs = startTimeMs + duration * 1000;

        const normalizedPosition =
          (eventTimeMs - startTimeMs) / (endTimeMs - startTimeMs);
        const clampedPosition = clamp(normalizedPosition, 0, 1);
        return `${getTrackPosition(clampedPosition, 19)}px`;
      },
      [videoStartTime, duration, getTrackPosition]
    );

    const handleMouseEnter = useCallback(() => {
      if (playOnHover && videoRef.current && !isPlaying) {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }, [playOnHover, videoRef, isPlaying]);

    const handleMouseLeave = useCallback(() => {
      if (playOnHover && videoRef.current && isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }, [playOnHover, videoRef, isPlaying]);

    const thumbSizePx = 9;

    const startHideBtnTimeout = () => {
      if (hideBtn) setHideBtn(false);
      if (hideBtnTimeout.current) clearTimeout(hideBtnTimeout.current);
      hideBtnTimeout.current = setTimeout(() => setHideBtn(true), 2000);
    };

    return (
      <div
        className={clsx(styles.videoWrapper, isFullscreen && styles.fullscreen)}
        ref={containerRef}
        style={{ width, aspectRatio }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className={styles.videoOverlayContainer}>
          <video
            ref={videoRef}
            src={videoUrl}
            className={styles.video}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onPlay={() => {
              setIsPlaying(true);
              startHideBtnTimeout();
            }}
            onPause={() => {
              setIsPlaying(false);
              if (hideBtnTimeout.current) {
                clearTimeout(hideBtnTimeout.current);
                hideBtnTimeout.current = null;
              }
              setHideBtn(false);
            }}
            onMouseMove={() => {
              if (!isPlaying) return;
              startHideBtnTimeout();
            }}
            role="video"
            aria-label="Video player"
            playsInline
            onClick={togglePlay}
          />

          <button
            className={clsx(styles.playButton, hideBtn && styles.hidden)}
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause" : "Play"}
            name={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <PauseButton height={48} width={48} />
            ) : (
              <PlayButton height={48} width={48} />
            )}
          </button>

          {showControls && (
            <div
              className={styles.controls}
              role="group"
              aria-label="Video controls"
            >
              {showTimestamps && videoStartTime && (
                <Text
                  variant="body-sm-med"
                  data-testid="current-time"
                  className={styles.control}
                >
                  {formatTime(currentTime, {
                    hideTz: true,
                    showMeridiem,
                    relativeTo: currentTime,
                    tz: timezone,
                  })}
                </Text>
              )}

              <div className={styles.seekBar}>
                <input
                  type="range"
                  className={styles.seekIndicator}
                  min="0"
                  max={durationS || 100}
                  step="0.01"
                  value={currentTimeS}
                  onChange={onStartSeek}
                  ref={inputRef}
                  style={
                    {
                      "--thumb-pos": `${getTrackPosition(progress, thumbSizePx)}px`,
                      "--thumb-size": `${thumbSizePx}px`,
                    } as React.CSSProperties
                  }
                />
                {!!durationS &&
                  events.map((event, index) => (
                    <div
                      key={index}
                      className={styles.pointOfInterest}
                      style={{
                        left: getEventPosition(event.time),
                      }}
                      title={event.title}
                      data-time={event.time}
                      data-testid={`event-marker-${index}`}
                      onClick={(e: MouseEvent) => {
                        e.stopPropagation();
                        if (videoRef.current) {
                          const eventTime = new Date(event.time).getTime();
                          const startTime = new Date(videoStartTime).getTime();
                          const seekTime = (eventTime - startTime) / 1000;

                          if (
                            seekTime >= 0 &&
                            seekTime <= videoRef.current.duration
                          ) {
                            videoRef.current.currentTime = seekTime;
                            setCurrentTime(event.time);
                            setProgress(seekTime / videoRef.current.duration);
                            videoRef.current.play();
                            setIsPlaying(true);
                          }
                        }
                      }}
                    >
                      {event.icon}
                    </div>
                  ))}
              </div>

              {showTimestamps && videoEndTime && (
                <Text
                  variant="body-sm-med"
                  data-testid="end-time"
                  className={styles.control}
                >
                  {formatTime(videoEndTime, {
                    hideTz: true,
                    showMeridiem,
                    tz: timezone,
                    relativeTo: videoEndTime,
                  })}
                </Text>
              )}
              {showFullscreenButton && (
                <button
                  className={clsx(styles.fullscreenButton, styles.control)}
                  onClick={toggleFullscreen}
                  title="Toggle fullscreen"
                  aria-label="Toggle fullscreen"
                  name="Toggle fullscreen"
                >
                  <FaExpand />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
);

export default VideoPlayer;
