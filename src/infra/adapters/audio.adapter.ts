import type { AudioTrack } from '@/types/media'

export interface ApiAudioTrack {
  id: string
  name: string
  album: string
  year: string
  authors: string[]
  genres: string[]
  isrc: string
  gmusic: string
  occurrences: Array<{
    start_time: number
    end_time: number
  }>
  image_url?: string
  confidence_score: number
  duration: number
}

export interface ApiProcessingStatus {
  id: string
  status: 'pending' | 'processing' | 'completed' | 'failed'
  progress: number
  current_step: string
  estimated_time_remaining?: number
  created_at: string
  updated_at: string
}

export class AudioAdapter {
  static fromApiResponse(apiData: ApiAudioTrack): AudioTrack {
    return {
      name: apiData.name,
      album: apiData.album,
      year: apiData.year,
      authors: apiData.authors,
      genres: apiData.genres,
      isrc: apiData.isrc,
      gmusic: apiData.gmusic,
      occurrences: apiData.occurrences.map(occ => ({
        startTime: occ.start_time,
        endTime: occ.end_time,
      })),
      imageUrl: apiData.image_url,
    }
  }

  static toApiRequest(track: AudioTrack): Partial<ApiAudioTrack> {
    return {
      name: track.name,
      album: track.album,
      year: track.year,
      authors: track.authors,
      genres: track.genres,
      isrc: track.isrc,
      gmusic: track.gmusic,
      occurrences: track.occurrences.map(occ => ({
        start_time: occ.startTime,
        end_time: occ.endTime,
      })),
      image_url: track.imageUrl,
    }
  }

  static fromApiArray(apiData: ApiAudioTrack[]): AudioTrack[] {
    return apiData.map(track => this.fromApiResponse(track))
  }

  static fromApiProcessingStatus(apiStatus: ApiProcessingStatus) {
    return {
      id: apiStatus.id,
      status: apiStatus.status,
      progress: apiStatus.progress,
      currentStep: apiStatus.current_step,
      estimatedTimeRemaining: apiStatus.estimated_time_remaining,
    }
  }
}
