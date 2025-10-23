/**
 * video-controls.ts
 * Props types for the VideoControls molecule and its child atoms (play/pause, volume, skip, rate, fullscreen).
 * Business logic: the controls are pure UI - they receive handler callbacks from the MediaPlayer orchestration.
 */

export interface VideoControlsProps {
  isPlaying: boolean
  isMuted: boolean
  volume: number
  playbackRate: number
  skipEmptySegments: boolean
  onPlayPause: () => void
  onMute: () => void
  onVolumeChange: (value: number) => void
  onNext: () => void
  onSkipToggle: (checked: boolean) => void
  onRateChange: () => void
  onFullscreen: () => void
  currentTime: number
  duration: number
  formatTime: (t: number) => string
}

export interface PlayPauseButtonProps {
  isPlaying: boolean
  onToggle: () => void
  className?: string
}

export interface VolumeControlProps {
  isMuted: boolean
  volume: number
  onMute: () => void
  onVolumeChange: (value: number) => void
  className?: string
}

export interface SkipSectionProps {
  onNext: () => void
  skipEmptySegments: boolean
  onSkipToggle: (checked: boolean) => void
  className?: string
}

export interface RateButtonProps {
  rate: number
  onClick: () => void
  className?: string
}

export interface FullscreenButtonProps {
  onClick: () => void
  className?: string
}

