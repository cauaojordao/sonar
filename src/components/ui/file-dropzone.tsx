"use client"

import * as React from "react"
import { useDropzone } from "react-dropzone"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { UploadCloud, FileX, CheckCircle2 } from "lucide-react"

interface FileDropzoneProps {
    onFileAccepted?: (file: File) => void
    className?: string
    tone?: "neutral" | "gold" | "magenta"
}

export function FileDropzone({
                                 onFileAccepted,
                                 className,
                                 tone = "neutral",
                             }: FileDropzoneProps) {
    const [file, setFile] = React.useState<File | null>(null)
    const [error, setError] = React.useState<string | null>(null)

    const onDrop = React.useCallback(
        (acceptedFiles: File[], rejectedFiles: unknown[]) => {
            if (rejectedFiles.length > 0) {
                setError("Apenas arquivos .xmf são permitidos.")
                return
            }
            const selected = acceptedFiles[0]
            setFile(selected)
            setError(null)
            onFileAccepted?.(selected)
        },
        [onFileAccepted]
    )

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: { "application/octet-stream": [".xmf"] },
        multiple: false,
        onDrop,
    })

    const baseGlass = cn(
        "relative overflow-hidden rounded-[24px] border border-white/30 backdrop-blur-[11px]",
        "shadow-[0_8px_32px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.4),inset_0_-1px_0_rgba(255,255,255,0.1),inset_0_0_54px_27px_rgba(255,255,255,0.03)]",
        "transition-all duration-300 ease-out cursor-pointer",
        isDragActive && "bg-white/30 border-white/40 shadow-[0_0_20px_rgba(255,255,255,0.2)]",
        "hover:bg-white/10",
        error && "border-destructive/50 bg-destructive/10",
        tone === "gold" &&
        "bg-gradient-to-r from-[#C59A2E]/40 to-[#E9C46A]/40 hover:from-[#C59A2E]/60 hover:to-[#E9C46A]/60",
        tone === "magenta" &&
        "bg-gradient-to-r from-[#C4459F]/40 to-[#7B4397]/40 hover:from-[#C4459F]/60 hover:to-[#7B4397]/60",
        className
    )

    return (
        <Card {...getRootProps()} className={cn("border-none shadow-none bg-transparent", className)}>
            <CardContent
                className={cn(
                    baseGlass,
                    "flex flex-col items-center justify-center py-32 px-8 text-center space-y-3"
                )}
            >
                <input {...getInputProps()} />

                {file ? (
                    <>
                        <CheckCircle2 className="size-10 text-green-400 drop-shadow-[0_0_10px_rgba(34,197,94,0.4)]" />
                        <p className="text-sm ">
                            Arquivo selecionado: <strong>{file.name}</strong>
                        </p>
                    </>
                ) : isDragActive ? (
                    <>
                        <UploadCloud className="size-10 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]" />
                        <p className="text-sm font-medium ">
                            Solte o arquivo <strong>.xmf</strong> aqui
                        </p>
                    </>
                ) : (
                    <>
                        <UploadCloud className="size-10" />
                        <p className="text-sm">
                            Arraste um arquivo <strong>.xmf</strong> ou clique para selecionar
                        </p>
                    </>
                )}

                {error && (
                    <div className="flex items-center gap-2 text-destructive text-sm mt-2">
                        <FileX className="size-4" />
                        {error}
                    </div>
                )}

                {file && (
                    <Button
                        type="button"
                        variant="glass"
                        size="sm"
                        tone="neutral"
                        onClick={(e) => {
                            e.stopPropagation()
                            setFile(null)
                        }}
                    >
                        Remover arquivo
                    </Button>
                )}
            </CardContent>
        </Card>
    )
}
