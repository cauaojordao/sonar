import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import type { AudioTrack } from '@/types/media'
import type { ProcessingStatus, ProcessingOptions } from '@/types/api/types'

interface AudioProcessingState {
  isProcessing: boolean
  currentStep: string | null
  progress: number
  tracks: AudioTrack[]
  processingStatus: ProcessingStatus | null
  
  processingOptions: ProcessingOptions
  
  setProcessing: (isProcessing: boolean) => void
  setCurrentStep: (step: string | null) => void
  setProgress: (progress: number) => void
  setTracks: (tracks: AudioTrack[]) => void
  addTrack: (track: AudioTrack) => void
  removeTrack: (trackId: string) => void
  updateTrack: (trackId: string, updates: Partial<AudioTrack>) => void
  setProcessingStatus: (status: ProcessingStatus | null) => void
  setProcessingOptions: (options: ProcessingOptions) => void
  reset: () => void
}

const defaultProcessingOptions: ProcessingOptions = {
  quality: 'high',
  format: 'wav',
  enableSegmentation: true,
  enableMusicDetection: true,
}

export const useAudioProcessingStore = create<AudioProcessingState>()(
  devtools(
    persist(
      (set, get) => ({
        isProcessing: false,
        currentStep: null,
        progress: 0,
        tracks: [],
        processingStatus: null,
        processingOptions: defaultProcessingOptions,

        setProcessing: (isProcessing) => set({ isProcessing }),
        
        setCurrentStep: (currentStep) => set({ currentStep }),
        
        setProgress: (progress) => set({ progress }),
        
        setTracks: (tracks) => set({ tracks }),
        
        addTrack: (track) => set((state) => ({
          tracks: [...state.tracks, track]
        })),
        
        removeTrack: (trackId) => set((state) => ({
          tracks: state.tracks.filter(track => track.name !== trackId)
        })),
        
        updateTrack: (trackId, updates) => set((state) => ({
          tracks: state.tracks.map(track =>
            track.name === trackId ? { ...track, ...updates } : track
          )
        })),
        
        setProcessingStatus: (processingStatus) => set({ processingStatus }),
        
        setProcessingOptions: (processingOptions) => set({ processingOptions }),
        
        reset: () => set({
          isProcessing: false,
          currentStep: null,
          progress: 0,
          tracks: [],
          processingStatus: null,
          processingOptions: defaultProcessingOptions,
        }),
      }),
      {
        name: 'audio-processing-store',
        partialize: (state) => ({
          processingOptions: state.processingOptions,
          tracks: state.tracks,
        }),
      }
    ),
    {
      name: 'audio-processing-store',
    }
  )
)
