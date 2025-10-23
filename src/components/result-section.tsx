import * as React from "react";
import EdlExportBox from "@/components/ui/edl-export-box";
import type { ResultSectionProps } from "@/components/types";

const mockEDL = `
TITLE: Projeto de Áudio
FCM: NON-DROP FRAME
001  AX       V     C        00:00:00:00 00:00:10:00 00:00:00:00 00:00:10:00
002  AX       V     C        00:00:10:00 00:00:20:00 00:00:10:00 00:00:20:00
`;

export function ResultSection({arquivoEDL, trilhas}: ResultSectionProps) {
    return (
        <section className="bg-background py-20 relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="mb-16">
                    <p className="text-muted-foreground text-sm uppercase tracking-wider mb-2">
                        RESULTADOS
                    </p>
                    <h2 className="text-3xl font-bold">
                        FreeMXF-mxf1
                    </h2>
                </div>

                <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-2">Arquivo EDL</h3>
                    <p>{typeof arquivoEDL === "string" ? arquivoEDL : arquivoEDL.name}</p>
                </div>

                <div>
                    <h3 className="text-xl font-semibold mb-4">Trilhas</h3>
                    {trilhas.map((trilha, index) => (
                        <div key={index} className="mb-6 p-4 border rounded-lg bg-background shadow-sm">
                            <p><strong>Nome:</strong> {trilha.nome}</p>
                            <p><strong>Album:</strong> {trilha.album}</p>
                            <p><strong>Ano:</strong> {trilha.ano}</p>
                            <p><strong>Autores:</strong> {trilha.autores.join(", ")}</p>
                            <p><strong>Gêneros:</strong> {trilha.generos.join(", ")}</p>
                            <p><strong>ISRC:</strong> {trilha.isrc}</p>
                            <p><strong>GMusic:</strong> {trilha.gmusic}</p>
                            <div className="mt-2">
                                <strong>Ocorrências:</strong>
                                <ul className="list-disc ml-6">
                                    {trilha.ocorrencias.map((oc, i) => (
                                        <li key={i}>
                                            Início: {oc.inicio}, Fim: {oc.fim}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <EdlExportBox
                texto={mockEDL}
                nomeArquivo="ProjetoEDL.edl"
                titulo="Arquivo EDL Exportável"
            />
        </section>
    );
}
