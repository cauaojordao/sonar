import type { FileUploadRequest, FileUploadResponse, ApiResponse } from '../../types/api/types'
import { HttpClient } from './http-client'

export class FileUploadService {
  constructor(private httpClient: HttpClient) {}

  async uploadFile(request: FileUploadRequest): Promise<FileUploadResponse> {
    const formData = new FormData()
    formData.append('file', request.file)

    const response = await this.httpClient.upload<FileUploadResponse>(
      '/files/upload',
      formData,
      request.onProgress
    )

    return response.data
  }

  async uploadChunk(
    fileId: string,
    chunk: Blob,
    chunkIndex: number,
    totalChunks: number,
    onProgress?: (progress: number) => void
  ): Promise<void> {
    const formData = new FormData()
    formData.append('fileId', fileId)
    formData.append('chunk', chunk)
    formData.append('chunkIndex', chunkIndex.toString())
    formData.append('totalChunks', totalChunks.toString())

    await this.httpClient.upload<void>(
      '/files/upload-chunk',
      formData,
      onProgress
    )
  }

  async getUploadStatus(fileId: string): Promise<{
    status: 'uploading' | 'processing' | 'completed' | 'failed'
    progress: number
    error?: string
  }> {
    const response = await this.httpClient.get<{
      status: 'uploading' | 'processing' | 'completed' | 'failed'
      progress: number
      error?: string
    }>(`/files/${fileId}/status`)

    return response.data
  }

  async deleteFile(fileId: string): Promise<void> {
    await this.httpClient.delete(`/files/${fileId}`)
  }

  async getFileInfo(fileId: string): Promise<FileUploadResponse> {
    const response = await this.httpClient.get<FileUploadResponse>(`/files/${fileId}`)
    return response.data
  }
}
