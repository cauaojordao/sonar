"use client"

import { useState, useCallback } from 'react'
import { FileDropzone } from '@/components/modules/hero-container/file-dropzone'
import { ProcessingTimeline } from '@/components/modules/hero-container/processing-timeline'
import { Button } from '@/components/ui/button'
import { FaDropbox, FaGoogleDrive } from 'react-icons/fa'
import BouncingDots from '@/components/ui/bouncing-dots'
import baseGlass from '@/styles/baseGlass'
import { cn } from '@/lib/utils'
import { upload as uploadMxf, getStatus as getMxfStatus } from '@/services/mxfService'
import {router} from "next/client";
import {useRouter} from "next/navigation";

const PROCESSING_STEPS = [
  'Extração de áudio',
  'Separação de segmentos',
  'Identificação de música',
  'Geração de EDL'
]

export function HeroSection() {
    const router = useRouter()
  const [currentStepIndex, setCurrentStepIndex] = useState<number | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<any>(null)
  const [uploadId, setUploadId] = useState<string | null>(null)

  const clearError = useCallback(() => setError(null), [])

  const pollStatus = useCallback((id: string) => {
    setIsProcessing(true)
    const interval = setInterval(async () => {
      try {
        const statusResp = await getMxfStatus(id)

        if (statusResp.status === 5) {
          setIsProcessing(false)
          setCurrentStepIndex(PROCESSING_STEPS.length)
          clearInterval(interval)
          try {
            router.push(`/resultados`)
          } catch {

          }
        } else {
          const stepNum = statusResp.status
          if (stepNum >= 1 && stepNum <= PROCESSING_STEPS.length) {
            setCurrentStepIndex(stepNum - 1)
          } else {
            setCurrentStepIndex(stepNum)
          }
        }
      } catch (err) {
        setError(err)
        setIsProcessing(false)
        clearInterval(interval)
      }
    }, 1000)
  }, [])

  const handleFileUpload = useCallback(async (file: File | Blob) => {
    setError(null)
    setIsProcessing(true)
    setCurrentStepIndex(0)
    try {
      const resp = await uploadMxf(file)
      if (resp.id) {
        setUploadId(resp.id)
        pollStatus(resp.id)
      } else {
        throw new Error('ID de upload não encontrado na resposta.')
      }
    } catch (err) {
      setError(err)
      setIsProcessing(false)
    }
  }, [pollStatus])

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
        </div>
      </div>
    </div>
  )
}