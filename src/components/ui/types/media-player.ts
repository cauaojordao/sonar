/**
 * media-player.ts
 * Props and handler types related to the MediaPlayer component.
 * Contains lightweight descriptions of business logic (seek, play, segment handling).
 */

import type { VideoSegment } from "./video-segment"

export interface MediaPlayerProps {
  videoSrc: string
  segments: VideoSegment[]
  className?: string
}

export type SeekHandler = (time: number) => void

export interface MediaPlayerInternalState {
  isPlaying: boolean
  currentTime: number
  duration: number
  volume: number
  isMuted: boolean
  playbackRate: number
  skipEmptySegments: boolean
  currentSegmentIndex: number
  isFullscreen: boolean
  isHovering: boolean
  isSeeking: boolean
  isLoading: boolean
}

