import MediaPlayer from "@/components/ui/media-player";
import { ResultSection } from "@/components/result-section";
import EdlExportBox from "@/components/ui/edl-export-box";

const mockTrilhas = [
    {
        nome: "Song A",
        album: "Album 1",
        ano: 2023,
        autores: ["Autor 1", "Autor 2"],
        generos: ["Pop", "Dance"],
        emocoes: ["Feliz", "Energético"],
        isrc: "US1234567890",
        gmusic: "gmusic123",
        ocorrencias: [
            { inicio: "00:00:10", fim: "00:00:30" },
            { inicio: "00:01:00", fim: "00:01:30" },
        ],
    },
    {
        nome: "Song B",
        album: "Album 2",
        ano: 2022,
        autores: ["Autor 3"],
        generos: ["Rock"],
        emocoes: ["Triste"],
        isrc: "US0987654321",
        gmusic: "gmusic456",
        ocorrencias: [
            { inicio: "00:00:05", fim: "00:00:25" },
        ],
    },
];


const Resultados = () => {
    return (
        <div className="flex flex-col gap-24">
            <div className="container mx-auto px-6">
                <MediaPlayer />
            </div>

            <ResultSection arquivoEDL="ProjetoEDL.edl" trilhas={mockTrilhas} />

        </div>
    );
};

export default Resultados;
