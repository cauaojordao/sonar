import type React from "react";

export interface VideoSegment {
  id: string;
  music: string;
  author: string;
  genre: string;
  startTime: number;
  endTime: number;
  color: string;
}

export interface MediaPlayerProps {
  videoSrc: string;
  segments: VideoSegment[];
  className?: string;
}

