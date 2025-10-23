import React from "react"

interface SegmentBarProps {
  segments: Array<{
    id: string
    startTime: number
    endTime: number
    color: string
    isActive: boolean
  }>
  duration: number
}

export const SegmentBar: React.FC<SegmentBarProps> = ({ segments, duration }) => (
  <>
    {segments.map(segment => {
      const leftPct = (segment.startTime / duration) * 100
      const widthPct = ((segment.endTime - segment.startTime) / duration) * 100
      return (
        <div
          key={segment.id}
          className="absolute top-0 h-full rounded"
          style={{
            left: `${leftPct}%`,
            width: `${widthPct}%`,
            backgroundColor: segment.color,
            opacity: segment.isActive ? 1 : 0.4,
            zIndex: 20
          }}
        />
      )
    })}
  </>
)

