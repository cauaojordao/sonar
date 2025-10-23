/**
 * progress-bar.ts
 * Types for the ProgressBar molecule which composes SegmentBar + Slider.
 */

import type { VideoSegment } from "./video-segment"

export interface ProgressBarProps {
  value: number
  duration: number
  isSeeking: boolean
  isHovering: boolean
  onSeek: (time: number) => void
  onSeekStart: () => void
  onSeekEnd: (time: number) => void
  segments: Array<VideoSegment & { isActive?: boolean }>
}

