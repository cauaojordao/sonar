import type { AudioTrack } from '@/types/media'
import type { 
  AudioProcessingRequest, 
  ProcessingStatus, 
  EDLGenerationRequest,
  ApiResponse 
} from '../../types/api/types'
import { HttpClient } from './http-client'

export class AudioProcessingService {
  constructor(private httpClient: HttpClient) {}

  async processAudio(request: AudioProcessingRequest): Promise<AudioTrack[]> {
    const formData = new FormData()
    formData.append('file', request.file)
    formData.append('options', JSON.stringify(request.options))

    const response = await this.httpClient.upload<AudioTrack[]>(
      '/audio/process',
      formData,
      request.options.onProgress
    )

    return response.data
  }

  async getProcessingStatus(processingId: string): Promise<ProcessingStatus> {
    const response = await this.httpClient.get<ProcessingStatus>(
      `/audio/processing/${processingId}/status`
    )
    return response.data
  }

  async generateEDL(request: EDLGenerationRequest): Promise<string> {
    const response = await this.httpClient.post<string>('/edl/generate', request)
    return response.data
  }

  async downloadEDL(edlId: string, format: 'edl' | 'xml' | 'json' = 'edl'): Promise<Blob> {
    const response = await fetch(`${this.httpClient['config'].baseUrl}/edl/${edlId}/download?format=${format}`)
    
    if (!response.ok) {
      throw new Error(`Failed to download EDL: ${response.statusText}`)
    }

    return response.blob()
  }

  async getAudioTracks(processingId: string): Promise<AudioTrack[]> {
    const response = await this.httpClient.get<AudioTrack[]>(
      `/audio/processing/${processingId}/tracks`
    )
    return response.data
  }

  async deleteProcessing(processingId: string): Promise<void> {
    await this.httpClient.delete(`/audio/processing/${processingId}`)
  }
}
