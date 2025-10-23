/**
 * video-segment.ts
 * Domain type for a video segment (a marked audio/music region inside a video).
 * This type is used across MediaPlayer, ProgressBar and SegmentBar.
 */

export interface VideoSegment {
  id: string
  music?: string
  author?: string
  genre?: string
  startTime: number
  endTime: number
  color?: string
}

