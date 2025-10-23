import React from "react"
import { Button } from "../button"
import { Play, Pause } from "lucide-react"
import { cn } from "@/lib/utils"

interface Props {
  isPlaying: boolean
  onToggle: () => void
  className?: string
}

export const PlayPauseButton: React.FC<Props> = ({ isPlaying, onToggle, className }) => (
  <Button
    variant="glass"
    size="icon"
    onClick={onToggle}
    className={className ?? cn("rounded-full hover:bg-white/20 text-xs text-white px-3 py-1.5")}
  >
    {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
  </Button>
)
