'use client'

import { useState, useCallback } from 'react'
import { FileDropzone } from '@/components/ui/file-dropzone'
import { ProcessingTimeline } from '@/components/processing-timeline'
import { ResultSection } from '@/components/result-section'
import { useAudioProcessing } from '@/infra/hooks/use-audio-processing'
import { useAudioProcessingStore } from '@/infra/store/audio-processing.store'
import { Button } from '@/components/ui/button'
import { FaDropbox, FaGoogleDrive } from 'react-icons/fa'
import BouncingDots from '@/components/ui/bouncing-dots'
import baseGlass from '@/styles/baseGlass'
import { cn } from '@/lib/utils'

const PROCESSING_STEPS = [
  'Extração de áudio',
  'Separação de segmentos', 
  'Identificação de música',
  'Geração de EDL'
]

export function AudioProcessingPage() {
  const [currentStepIndex, setCurrentStepIndex] = useState<number | null>(null)
  
  const {
    isProcessing,
    tracks,
    error,
    processAudio,
    clearError,
    reset
  } = useAudioProcessing()

  const {
    processingOptions,
    setProcessingOptions,
    setTracks,
    setProcessing
  } = useAudioProcessingStore()

  const handleFileUpload = useCallback(async (formData: FormData) => {
    const file = formData.get('file') as File
    if (!file) return

    try {
      clearError()
      setProcessing(true)
      setCurrentStepIndex(0)

      for (let i = 0; i < PROCESSING_STEPS.length; i++) {
        setCurrentStepIndex(i)
        await new Promise(resolve => setTimeout(resolve, 2000))
      }

      const result = await processAudio(file, processingOptions, (progress) => {
        console.log(`Progresso: ${progress}%`)
      })

      setTracks(result)
      setCurrentStepIndex(null)
      
      setTimeout(() => {
        window.location.href = '/resultados'
      }, 1000)

    } catch (err) {
      console.error('Erro no processamento:', err)
      setCurrentStepIndex(null)
    } finally {
      setProcessing(false)
    }
  }, [processAudio, processingOptions, clearError, setTracks, setProcessing])

  const handleOptionsChange = useCallback((newOptions: Partial<typeof processingOptions>) => {
    setProcessingOptions({ ...processingOptions, ...newOptions })
  }, [processingOptions, setProcessingOptions])

  if (isProcessing || currentStepIndex !== null) {
    return (
      <div className="container mx-auto px-6">
        <div className="flex items-center gap-4 mb-6">
          <h1 className="text-4xl">
            <strong>Aguarde</strong>, estamos trabalhando nisso
            <BouncingDots />
          </h1>
        </div>
        <ProcessingTimeline 
          currentStep={currentStepIndex || 0}  
          steps={PROCESSING_STEPS}
        />
      </div>
    )
  }

  if (tracks.length > 0) {
    return (
      <div className="container mx-auto px-6">
        <ResultSection 
          edlFile={new File([], 'edl.txt')}
          tracks={tracks}
        />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-24">
      <div className="container mx-auto px-6">
        <h1 className="mb-6 text-4xl">
          <strong>Gerador de EDL</strong> e <strong>Identificador</strong> de trilhas sonoras
        </h1>
        
        {error && (
          <div className={cn(baseGlass,"mt-4 p-4 border-destructive/50 bg-destructive/10 flex flex-col justify-center")}>
            <p><strong>Erro:</strong> {error.message}</p>
            <Button 
              onClick={clearError}
              variant="glass" 
              size="sm" 
              className="flex items-center gap-2 text-sm mt-2 max-w-24"
            >
              Fechar
            </Button>
          </div>
        )}
        
        <FileDropzone onUpload={handleFileUpload} />

        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas quis auctor leo,
            eget cursus odio. Integer ipsum odio, congue ac ex vitae, vulputate laoreet sem.
          </p>

          <div className="flex gap-2">
            <Button className="cursor-pointer" variant="glass" size="icon">
              <FaDropbox className="w-5 h-5"/>
            </Button>
            <Button className="cursor-pointer" variant="glass" size="icon">
              <FaGoogleDrive className="w-5 h-5"/>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
