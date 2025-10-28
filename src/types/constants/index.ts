export const MEDIA_FORMATS = {
  VIDEO: ['.mp4', '.mov', '.avi', '.mkv', '.webm'] as const,
  AUDIO: ['.mp3', '.wav', '.flac', '.aac', '.ogg'] as const,
  IMAGE: ['.jpg', '.jpeg', '.png', '.gif', '.webp'] as const,
} as const

export const PLAYBACK_RATES = [0.5, 0.75, 1, 1.25, 1.5, 2] as const

export const VOLUME_LEVELS = {
  MIN: 0,
  MAX: 1,
  DEFAULT: 1,
  MUTED: 0,
} as const

export const TIME_FORMATS = {
  SECONDS_PER_MINUTE: 60,
  SECONDS_PER_HOUR: 3600,
  MILLISECONDS_PER_SECOND: 1000,
} as const

export const UI_BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
} as const

export const ANIMATION_DURATIONS = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
} as const

export const Z_INDEX_LEVELS = {
  DROPDOWN: 1000,
  STICKY: 1020,
  FIXED: 1030,
  MODAL_BACKDROP: 1040,
  MODAL: 1050,
  POPOVER: 1060,
  TOOLTIP: 1070,
} as const

export type MediaFormat = typeof MEDIA_FORMATS[keyof typeof MEDIA_FORMATS][number]
export type VolumeLevel = typeof VOLUME_LEVELS[keyof typeof VOLUME_LEVELS]
export type UIBreakpoint = keyof typeof UI_BREAKPOINTS
export type AnimationDuration = typeof ANIMATION_DURATIONS[keyof typeof ANIMATION_DURATIONS]
export type ZIndexLevel = keyof typeof Z_INDEX_LEVELS
