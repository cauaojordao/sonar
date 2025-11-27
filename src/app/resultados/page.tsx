import { ResultSection } from "@/components/layouts/result-section";
import { MediaPlayer } from "@/components/modules/media-player/media-player";
import type { VideoSegment } from "@/types";

const generateRandomColorHexCode = () => {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const segments: VideoSegment[] = [
    {
        id: "1",
        music: "Summer Vibes",
        author: "Artist One",
        genre: "Pop",
        startTime: 0,
        endTime: 2,
        color: generateRandomColorHexCode(),
    },
    {
        id: "2",
        music: "Chill Beats",
        author: "Artist Two",
        genre: "Electronic",
        year: "2022",
        startTime: 5,
        endTime: 6,
        color: generateRandomColorHexCode(),
    },
    {
        id: "3",
        music: "Acoustic Dreams",
        author: "Artist Three",
        genre: "Acoustic",
        year: "2023",
        startTime: 9,
        endTime: 10,
        color: generateRandomColorHexCode(),
    }
]

const mockEDL: string = `
TITLE:   PERNAMBUCANOS BR 
FCM: NON-DROP FRAME
000001  BROWN_CHILD_JUNIOR_SOARES,LUCIAN A3    C        01:00:00:00 01:00:00:14 01:00:00:04 01:00:00:18 
*FROM CLIP NAME:  BROWN CHILD_JUNIOR SOARES,LUCIANO ROBERTO,LUIZAO DANTAS,MARCELO SILVA#210436.WAV 
*SOURCE FILE: BROWN CHILD_JUNIOR SOARES,LUCIANO ROBERTO,LUIZAO DANTAS,MARCELO SILVA#210436.WAV

000002  BROWN_CHILD_JUNIOR_SOARES,LUCIAN A3    C        01:00:00:14 01:00:01:04 01:00:00:18 01:00:01:08 
*FROM CLIP NAME:  BROWN CHILD_JUNIOR SOARES,LUCIANO ROBERTO,LUIZAO DANTAS,MARCELO SILVA#210436.WAV 
*TO CLIP NAME:  BROWN CHILD_JUNIOR SOARES,LUCIANO ROBERTO,LUIZAO DANTAS,MARCELO SILVA#210436.WAV 
*SOURCE FILE: BROWN CHILD_JUNIOR SOARES,LUCIANO ROBERTO,LUIZAO DANTAS,MARCELO SILVA#210436.WAV

000003  BROWN_CHILD_JUNIOR_SOARES,LUCIAN A3    C        01:00:01:04 01:00:13:02 01:00:01:08 01:00:13:06 
*FROM CLIP NAME:  BROWN CHILD_JUNIOR SOARES,LUCIANO ROBERTO,LUIZAO DANTAS,MARCELO SILVA#210436.WAV 
*SOURCE FILE: BROWN CHILD_JUNIOR SOARES,LUCIANO ROBERTO,LUIZAO DANTAS,MARCELO SILVA#210436.WAV

000004  BREGA_FUNK_LEVADINHA_TOPIX_LEO_B A3    C        01:00:00:00 01:00:11:26 01:00:13:21 01:00:25:17 
*FROM CLIP NAME:  BREGA FUNK LEVADINHA TOPIX_LEO BARY#215897.WAV 
*SOURCE FILE: BREGA FUNK LEVADINHA TOPIX_LEO BARY#215897.WAV

000005  BREGA_FUNK_LEVADINHA_TOPIX_LEO_B A3    C        01:00:11:26 01:00:17:17 01:00:25:17 01:00:31:08 
*FROM CLIP NAME:  BREGA FUNK LEVADINHA TOPIX_LEO BARY#215897.WAV 
*SOURCE FILE: BREGA FUNK LEVADINHA TOPIX_LEO BARY#215897.WAV

000006  BREGA_FUNK_LEVADINHA_TOPIX_LEO_B A3    C        01:00:17:17 01:00:26:24 01:00:31:08 01:00:40:15 
*FROM CLIP NAME:  BREGA FUNK LEVADINHA TOPIX_LEO BARY#215897.WAV 
*SOURCE FILE: BREGA FUNK LEVADINHA TOPIX_LEO BARY#215897.WAV

000007  BREGA_FUNK_LEVADINHA_TOPIX_LEO_B A3    C        01:00:26:24 01:00:27:14 01:00:40:15 01:00:41:05 
*FROM CLIP NAME:  BREGA FUNK LEVADINHA TOPIX_LEO BARY#215897.WAV 
*TO CLIP NAME:  BREGA FUNK LEVADINHA TOPIX_LEO BARY#215897.WAV 
*SOURCE FILE: BREGA FUNK LEVADINHA TOPIX_LEO BARY#215897.WAV

000008  BREGA_FUNK_LEVADINHA_TOPIX_LEO_B A3    C        01:00:27:14 01:00:33:22 01:00:41:05 01:00:47:13 
*FROM CLIP NAME:  BREGA FUNK LEVADINHA TOPIX_LEO BARY#215897.WAV 
*SOURCE FILE: BREGA FUNK LEVADINHA TOPIX_LEO BARY#215897.WAV

000009  FUNKUNDUM_ELETRICO_ARMANDO_SOUSA A3    C        01:00:00:00 01:00:07:25 01:00:47:13 01:00:55:08 
*FROM CLIP NAME:  FUNKUNDUM ELETRICO_ARMANDO SOUSA#84568.WAV 
*SOURCE FILE: FUNKUNDUM ELETRICO_ARMANDO SOUSA#84568.WAV

000010  FUNKUNDUM_ELETRICO_ARMANDO_SOUSA A3    C        01:02:03:05 01:02:03:25 01:00:55:08 01:00:55:28 
*FROM CLIP NAME:  FUNKUNDUM ELETRICO_ARMANDO SOUSA#84568.WAV 
*TO CLIP NAME:  FUNKUNDUM ELETRICO_ARMANDO SOUSA#84568.WAV 
*SOURCE FILE: FUNKUNDUM ELETRICO_ARMANDO SOUSA#84568.WAV

000011  FUNKUNDUM_ELETRICO_ARMANDO_SOUSA A3    C        01:02:03:25 01:02:07:23 01:00:55:28 01:00:59:26 
*FROM CLIP NAME:  FUNKUNDUM ELETRICO_ARMANDO SOUSA#84568.WAV 
*SOURCE FILE: FUNKUNDUM ELETRICO_ARMANDO SOUSA#84568.WAV

000012  FUNKUNDUM_ELETRICO_ARMANDO_SOUSA A3    C        01:02:07:23 01:02:08:25 01:00:59:26 01:01:00:28 
*FROM CLIP NAME:  FUNKUNDUM ELETRICO_ARMANDO SOUSA#84568.WAV 
*SOURCE FILE: FUNKUNDUM ELETRICO_ARMANDO SOUSA#84568.WAV
`;

const mapSegmentsToTracks = (segments: VideoSegment[]) => {
    return segments.map((segment, index) => {
        const occurrences = [];
        
        if (index === 0) {
            occurrences.push(
                { startTime: 0, endTime: 2 },
                { startTime: 45, endTime: 47 },
                { startTime: 90, endTime: 92 }
            );
        } else if (index === 1) {
            occurrences.push(
                { startTime: 5, endTime: 6 }
            );
        } else {
            occurrences.push(
                { startTime: 9, endTime: 10 }
            );
        }
        
        return {
            name: segment.music || "Unknown Track",
            album: segment.author || "Unknown Album",
            year: segment.year || "Unknown Year",
            authors: [segment.author || "Unknown Artist"],
            genres: [segment.genre || "Unknown Genre"],
            isrc: "BR73M2200005",
            gmusic: "GMCODE26",
            occurrences
        };
    });
}

const Resultados = () => {
    return (
        <div className="flex flex-col gap-18">
            <div className="container mx-auto px-6">
                <MediaPlayer videoSrc="/freeMXF-mxf1.mp4" segments={segments} />
            </div>
            <ResultSection
                edlFile={mockEDL}
                tracks={mapSegmentsToTracks(segments)}
            />
        </div>
    );
};

export default Resultados;
