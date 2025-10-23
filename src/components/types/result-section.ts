// Types for ResultSection component
export interface Ocorrencia {
  inicio: string;
  fim: string;
}

export interface Trilha {
  nome: string;
  album: string;
  ano: number;
  autores: string[];
  generos: string[];
  isrc: string;
  gmusic: string;
  ocorrencias: Ocorrencia[];
}

export interface ResultSectionProps {
  arquivoEDL: File | string;
  trilhas: Trilha[];
}

