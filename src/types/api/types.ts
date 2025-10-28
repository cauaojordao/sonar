export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
  timestamp: string
}

export interface ApiError {
  message: string
  code: string
  details?: Record<string, unknown>
  timestamp: string
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface AudioProcessingRequest {
  file: File
  options: ProcessingOptions
}

export interface ProcessingOptions {
  quality: 'low' | 'medium' | 'high'
  format: 'wav' | 'mp3' | 'flac'
  enableSegmentation: boolean
  enableMusicDetection: boolean
}

export interface ProcessingStatus {
  id: string
  status: 'pending' | 'processing' | 'completed' | 'failed'
  progress: number
  currentStep: string
  estimatedTimeRemaining?: number
}

export interface EDLGenerationRequest {
  tracks: string[]
  format: 'edl' | 'xml' | 'json'
  includeMetadata: boolean
}

export interface FileUploadRequest {
  file: File
  chunkSize?: number
  onProgress?: (progress: number) => void
}

export interface FileUploadResponse {
  fileId: string
  fileName: string
  fileSize: number
  mimeType: string
  uploadUrl: string
}

export interface ApiConfig {
  baseUrl: string
  timeout: number
  retryAttempts: number
  retryDelay: number
}

export interface ApiHeaders {
  'Content-Type'?: string
  'Authorization'?: string
  'X-Request-ID'?: string
}
