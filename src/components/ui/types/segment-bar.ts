/**
 * segment-bar.ts
 * Types for the visual segment markers rendered under the progress track.
 */

export interface SegmentMarker {
  id: string
  startTime: number
  endTime: number
  color?: string
  isActive?: boolean
}

export interface SegmentBarProps {
  segments: SegmentMarker[]
  duration: number
}

