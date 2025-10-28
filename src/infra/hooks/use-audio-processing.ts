import { useState, useCallback } from 'react'
import type { AudioTrack } from '@/types/media'
import type { ProcessingOptions, ProcessingStatus, ApiError } from '../../types/api/types'
import { AudioProcessingService } from '../api/audio-processing.service'
import { AudioAdapter } from '../adapters/audio.adapter'
import { useApiClient } from './use-api-client'

export function useAudioProcessing() {
  const { apiClient } = useApiClient()
  const [isProcessing, setIsProcessing] = useState(false)
  const [tracks, setTracks] = useState<AudioTrack[]>([])
  const [processingStatus, setProcessingStatus] = useState<ProcessingStatus | null>(null)
  const [error, setError] = useState<ApiError | null>(null)

  const audioService = new AudioProcessingService(apiClient)

  const processAudio = useCallback(async (
    file: File, 
    options: ProcessingOptions,
    onProgress?: (progress: number) => void
  ) => {
    try {
      setIsProcessing(true)
      setError(null)
      setTracks([])
      
      const result = await audioService.processAudio({ 
        file, 
        options: {
          ...options,
          onProgress
        }
      })
      
      const adaptedTracks = AudioAdapter.fromApiArray(result)
      setTracks(adaptedTracks)
      return adaptedTracks
    } catch (err) {
      const apiError = err as ApiError
      setError(apiError)
      throw apiError
    } finally {
      setIsProcessing(false)
    }
  }, [audioService])

  const getProcessingStatus = useCallback(async (processingId: string) => {
    try {
      const status = await audioService.getProcessingStatus(processingId)
      const adaptedStatus = AudioAdapter.fromApiProcessingStatus(status)
      setProcessingStatus(adaptedStatus)
      return adaptedStatus
    } catch (err) {
      const apiError = err as ApiError
      setError(apiError)
      throw apiError
    }
  }, [audioService])

  const generateEDL = useCallback(async (trackIds: string[], format: 'edl' | 'xml' | 'json' = 'edl') => {
    try {
      setError(null)
      const edlContent = await audioService.generateEDL({
        tracks: trackIds,
        format,
        includeMetadata: true
      })
      return edlContent
    } catch (err) {
      const apiError = err as ApiError
      setError(apiError)
      throw apiError
    }
  }, [audioService])

  const downloadEDL = useCallback(async (edlId: string, format: 'edl' | 'xml' | 'json' = 'edl') => {
    try {
      setError(null)
      const blob = await audioService.downloadEDL(edlId, format)
      return blob
    } catch (err) {
      const apiError = err as ApiError
      setError(apiError)
      throw apiError
    }
  }, [audioService])

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  const reset = useCallback(() => {
    setTracks([])
    setProcessingStatus(null)
    setError(null)
    setIsProcessing(false)
  }, [])

  return {
    // State
    isProcessing,
    tracks,
    processingStatus,
    error,
    
    // Actions
    processAudio,
    getProcessingStatus,
    generateEDL,
    downloadEDL,
    clearError,
    reset,
  }
}
