import { useState, useCallback } from 'react'
import type { FileUploadResponse, ApiError } from '../../types/api/types'
import { FileUploadService } from '../api/file-upload.service'
import { useApiClient } from './use-api-client'

export function useFileUpload() {
  const { apiClient } = useApiClient()
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadedFile, setUploadedFile] = useState<FileUploadResponse | null>(null)
  const [error, setError] = useState<ApiError | null>(null)

  const fileService = new FileUploadService(apiClient)

  const uploadFile = useCallback(async (file: File) => {
    try {
      setIsUploading(true)
      setError(null)
      setUploadProgress(0)
      
      const result = await fileService.uploadFile({
        file,
        onProgress: (progress) => setUploadProgress(progress)
      })
      
      setUploadedFile(result)
      return result
    } catch (err) {
      const apiError = err as ApiError
      setError(apiError)
      throw apiError
    } finally {
      setIsUploading(false)
    }
  }, [fileService])

  const uploadChunk = useCallback(async (
    fileId: string,
    chunk: Blob,
    chunkIndex: number,
    totalChunks: number
  ) => {
    try {
      setError(null)
      await fileService.uploadChunk(
        fileId,
        chunk,
        chunkIndex,
        totalChunks,
        (progress) => setUploadProgress(progress)
      )
    } catch (err) {
      const apiError = err as ApiError
      setError(apiError)
      throw apiError
    }
  }, [fileService])

  const getUploadStatus = useCallback(async (fileId: string) => {
    try {
      setError(null)
      const status = await fileService.getUploadStatus(fileId)
      return status
    } catch (err) {
      const apiError = err as ApiError
      setError(apiError)
      throw apiError
    }
  }, [fileService])

  const deleteFile = useCallback(async (fileId: string) => {
    try {
      setError(null)
      await fileService.deleteFile(fileId)
      setUploadedFile(null)
    } catch (err) {
      const apiError = err as ApiError
      setError(apiError)
      throw apiError
    }
  }, [fileService])

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  const reset = useCallback(() => {
    setUploadedFile(null)
    setUploadProgress(0)
    setError(null)
    setIsUploading(false)
  }, [])

  return {
    isUploading,
    uploadProgress,
    uploadedFile,
    error,
    
    uploadFile,
    uploadChunk,
    getUploadStatus,
    deleteFile,
    clearError,
    reset,
  }
}
