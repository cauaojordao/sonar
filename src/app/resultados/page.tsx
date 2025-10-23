import {ResultSection} from "@/components/result-section";
import {MediaPlayer, VideoSegment} from "@/components/ui/media-player";

const segments: VideoSegment[] = [
    {
        id: "1",
        music: "Summer Vibes",
        author: "Artist One",
        genre: "Pop",
        startTime: 0,
        endTime: 2,
        color: "#FFD700",
    },
    {
        id: "2",
        music: "Chill Beats",
        author: "Artist Two",
        genre: "Electronic",
        startTime: 5,
        endTime: 6,
        color: "#9333EA",
    },
    {
        id: "3",
        music: "Acoustic Dreams",
        author: "Artist Three",
        genre: "Acoustic",
        startTime: 9,
        endTime: 10,
        color: "#4ECDC4",
    },
]

const mockEDL = `TITLE: Projeto de Áudio
FCM: NON-DROP FRAME
001  AX       V     C        00:00:00:00 00:00:10:00 00:00:00:00 00:00:10:00
002  AX       V     C        00:00:10:00 00:00:20:00 00:00:10:00 00:00:20:00`;

const Resultados = () => {

    return (
        <div className="flex flex-col gap-24">
            <div className="container mx-auto px-6">
                <MediaPlayer videoSrc="/freeMXF-mxf1.mp4" segments={segments}/>
            </div>
        </div>
    );
};

export default Resultados;
