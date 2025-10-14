"use client"

import React, {useRef, useState, useEffect} from "react";

import {Button} from "@/components/ui/button";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Switch} from "@/components/ui/switch";
import {Play, Pause, Maximize2, Repeat} from "lucide-react";
import {cn} from "@/lib/utils";

const BaseGlass = cn(
    "relative overflow-hidden rounded-[24px] border border-white/30 backdrop-blur-[11px]",
    "shadow-[0_8px_32px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.4),inset_0_-1px_0_rgba(255,255,255,0.1),inset_0_0_54px_27px_rgba(255,255,255,0.03)]",
    "transition-all duration-300 ease-out");

const MOCK_SEGMENTS = [
    {start: 0, end: 2, label: "Pop", colorKey: "neon1"},
    {start: 5, end: 7, label: "Eletrônica", colorKey: "neon2"},
    {start: 8, end: 10, label: "Rock", colorKey: "neon3"},
];

// Map color keys to CSS variables (use your global.css variables)
const NEON_COLORS: Record<string, string> = {
    neon1: "var(--chart-color-1, #ffb300)",
    neon2: "var(--chart-color-2, #7c3aed)",
    neon3: "var(--chart-color-3, #00d084)",
    default: "var(--primary)",
};

export default function MediaPlayer() {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);

    const [playing, setPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [time, setTime] = useState(0);
    const [speed, setSpeed] = useState<number>(1);
    const [autoSkipSilent, setAutoSkipSilent] = useState(false);
    const [segments, setSegments] = useState(MOCK_SEGMENTS);
    const [isClient, setIsClient] = useState(false);


    // Compute which ranges are silent (inverse of segments)
    const computeSilentRanges = (segs: typeof segments, total: number) => {
        if (segs.length === 0) return [{start: 0, end: total}];
        const sorted = segs.slice().sort((a, b) => a.start - b.start);
        const silent: { start: number; end: number }[] = [];
        let last = 0;
        for (const s of sorted) {
            if (s.start > last) silent.push({start: last, end: s.start});
            last = Math.max(last, s.end);
        }
        if (last < total) silent.push({start: last, end: total});
        return silent;
    };

    useEffect(() => {
        const v = videoRef.current;
        if (!v) return;
        const onLoaded = () => setDuration(v.duration || 0);
        const onTime = () => setTime(v.currentTime || 0);
        v.addEventListener("loadedmetadata", onLoaded);
        v.addEventListener("timeupdate", onTime);
        return () => {
            v.removeEventListener("loadedmetadata", onLoaded);
            v.removeEventListener("timeupdate", onTime);
        };
    }, []);

    useEffect(() => {
        if (!autoSkipSilent) return;
        const v = videoRef.current;
        if (!v || duration === 0) return;

        const check = () => {
            const silent = computeSilentRanges(segments, duration);
            const t = v.currentTime;
            for (const s of silent) {
                if (t >= s.start && t < s.end) {
                    const next = segments.find((seg) => seg.start >= s.end || seg.start > t);
                    if (next) {
                        v.currentTime = next.start + 0.01; // tiny offset
                    } else {
                        // no next music, go to end
                        v.currentTime = duration;
                        v.pause();
                        setPlaying(false);
                    }
                    break;
                }
            }
        };

        const id = setInterval(check, 300); // check periodically while enabled
        return () => clearInterval(id);
    }, [autoSkipSilent, segments, duration]);


    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) return null;

    const togglePlay = async () => {
        const v = videoRef.current;
        if (!v) return;
        if (v.paused) {
            await v.play();
            setPlaying(true);
        } else {
            v.pause();
            setPlaying(false);
        }
    };

    const seekTo = (seconds: number) => {
        const v = videoRef.current;
        if (!v) return;
        v.currentTime = Math.max(0, Math.min(seconds, duration));
        setTime(v.currentTime);
    };

    const onProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const el = e.currentTarget;
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const ratio = x / rect.width;
        seekTo(ratio * duration);
    };

    const formatTime = (s: number) => {
        if (!isFinite(s) || isNaN(s)) return "0:00";
        const mm = Math.floor(s / 60);
        const ss = Math.floor(s % 60)
            .toString()
            .padStart(2, "0");
        return `${mm}:${ss}`;
    };

    const toggleFullscreen = async () => {
        const el = containerRef.current;
        if (!el) return;
        if (!document.fullscreenElement) await el.requestFullscreen?.();
        else await document.exitFullscreen?.();
    };

    const handleSpeedChange = (value: number) => {
        setSpeed(value);
        if (videoRef.current) videoRef.current.playbackRate = value;
    };

    const skipToNextMusic = () => {
        const v = videoRef.current;
        if (!v) return;
        const t = v.currentTime;
        const next = segments.find((s) => s.end > t && s.start > t) || segments.find((s) => s.start > t);
        if (next) seekTo(next.start + 0.01);
    };

    // Paint markers position in percent
    const markerLeft = (timeSec: number) => (duration > 0 ? (timeSec / duration) * 100 : 0);
    const progress = duration > 0 ? (time / duration) * 100 : 0;

    return (
        <div ref={containerRef} className={cn(BaseGlass, "w-full max-w-full p-4 bg-white/5")}>
            <div
                className="w-full rounded-[12px] overflow-hidden bg-black/40 relative"
                ref={containerRef}
            >
                <video
                    ref={videoRef}
                    src="/freeMXF-mxf1.mp4"
                    crossOrigin="anonymous"
                    preload="metadata"
                    className="w-full max-h-[80vh] object-contain bg-black"
                    controls={false}
                    onLoadedMetadata={() => {
                        const v = videoRef.current;
                        if (!v) return;

                        const dur = v.duration;
                        if (isFinite(dur) && dur > 0) {
                            console.log("🎬 Duração detectada:", dur);
                            setDuration(dur);
                        } else {
                            console.warn("⚠️ Duração não detectada, tentando fallback...");
                            // fallback: força leitura depois de um pequeno atraso
                            setTimeout(() => {
                                if (v.duration && isFinite(v.duration)) setDuration(v.duration);
                            }, 800);
                        }
                    }}
                    onError={(e) => {
                        console.error("❌ Erro ao carregar vídeo:", e);
                    }}
                />
                {/* Overlaid controls area */
                }
                <div className="absolute bottom-0 left-0 right-0 p-4">
                    {/* Progress + markers */}
                    <div className="w-full">
                        <div
                            className="relative h-3 rounded-full bg-white/20 cursor-pointer"
                            onClick={onProgressClick}
                            aria-label="Progress bar"
                        >
                            <div
                                className="absolute left-0 top-0 bottom-0 rounded-full bg-white"
                                style={{ width: `${progress}%`, opacity: 0.95 }}


                            />

                            {/* markers for music segments */}
                            {segments.map((seg, i) => {
                                const left = markerLeft(seg.start);
                                const width = ((seg.end - seg.start) / Math.max(duration, 1)) * 100;
                                return (
                                    <div
                                        key={i}
                                        title={`${seg.label} ${formatTime(seg.start)} - ${formatTime(seg.end)}`}
                                        className="absolute top-0 bottom-0 rounded-full opacity-95"
                                        style={{
                                            left: `${left}%`,
                                            width: `${width}%`,
                                            background: NEON_COLORS[seg.colorKey] || NEON_COLORS.default,
                                            boxShadow: `0 0 12px ${NEON_COLORS[seg.colorKey] || NEON_COLORS.default}`,
                                        }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            seekTo(seg.start + 0.01);
                                        }}
                                    />
                                );
                            })}

                            {/* scrub handle */}
                            <div
                                className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 rounded-full border border-white/80 bg-white shadow-lg"
                                style={{left: `${(time / Math.max(duration, 1)) * 100}%`, transformOrigin: "center"}}
                            />
                        </div>

                        {/* Controls row */}
                        <div className="mt-3 flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={togglePlay}
                                    className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center"
                                    aria-label="play-pause"
                                >
                                    {playing ? <Pause/> : <Play/>}
                                </button>

                                <div className="text-sm text-white/80">{formatTime(time)} / {formatTime(duration)}</div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/8">
                                    <div className="flex items-center gap-2">
                                        <Repeat size={16}/>
                                        <span className="text-sm">Pular trechos sem música</span>
                                    </div>
                                    <Switch checked={autoSkipSilent} onCheckedChange={setAutoSkipSilent}/>
                                </div>

                                <Button variant="ghost" onClick={skipToNextMusic}>Pular agora</Button>

                                <div className="flex items-center gap-2">
                                    <Select onValueChange={(v: unknown) => handleSpeedChange(Number(v))}>
                                        <SelectTrigger className="w-[72px]">
                                            <SelectValue placeholder={`${speed}x`}/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="0.5">0.5x</SelectItem>
                                            <SelectItem value="0.75">0.75x</SelectItem>
                                            <SelectItem value="1">1x</SelectItem>
                                            <SelectItem value="1.25">1.25x</SelectItem>
                                            <SelectItem value="1.5">1.5x</SelectItem>
                                            <SelectItem value="2">2x</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <button onClick={toggleFullscreen}
                                        className="w-10 h-10 rounded-full bg-white/6 flex items-center justify-center">
                                    <Maximize2 size={16}/>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
        ;
}
