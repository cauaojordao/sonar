import type { AudioTrack } from '../media'

export interface ResultSectionProps {
  edlFile: File | string
  tracks: AudioTrack[]
}

export interface EDLExportProps {
  text: string
  fileName: string
  title: string
}
