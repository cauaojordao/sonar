"use client"

import {useState} from "react"
import type {TracksSummaryProps} from "@/types"
import {TrackCard} from "./track-card"
import TrackSeparator from "./track-separator"
import baseGlass from "@/styles/baseGlass"
import {cn} from "@/lib/utils"
import {BsMusicNote} from "react-icons/bs";
import {Button} from "@/components/ui/button";
import {BiDetail} from "react-icons/bi";

export function TracksSummary({tracks}: TracksSummaryProps) {

    const [isMusicSectionOpen, setMusicSectionOpen] = useState(true)

    return (
        <div>
            <div className="w-full flex justify-between">
                <Button
                    variant={"glass"}
                    tone={isMusicSectionOpen ? "primary" : "muted"}
                    className={"font-normal py-6 mb-6 gap-2 rounded-xl"}
                    onClick={() => setMusicSectionOpen(true)}>
                    <BsMusicNote/>
                    <h2>Músicas Identificadas <span
                        className="text-sm">•</span> {tracks.length}</h2>
                </Button>
                <Button
                    variant={"glass"}
                    tone={!isMusicSectionOpen ? "primary" : "muted"}
                    onClick={() => setMusicSectionOpen(false)}
                    className={"font-normal py-6 mb-6 gap-2 rounded-xl"}>
                    <BiDetail/>
                    <h2>Detalhes do Upload</h2>
                </Button>
            </div>

            <div className={cn(baseGlass, "rounded-xl p-6")}>
                <div className="space-y-4">
                    {tracks.map((track, index) => (
                        <div key={index}>
                            <TrackCard
                                track={track}
                            />
                            <TrackSeparator/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
