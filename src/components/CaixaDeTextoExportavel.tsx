"use client"

import React, { useState, useCallback } from 'react';

interface CaixaDeTextoExportavelProps {
  texto: string;
  nomeArquivo?: string;
  titulo?: string;
}

const CaixaDeTextoExportavel: React.FC<CaixaDeTextoExportavelProps> = ({
  texto,
  nomeArquivo = 'relatorio.txt',
  titulo = 'RESULTADOS'
}) => {
  const [feedbackCopia, setFeedbackCopia] = useState<'Copiar' | 'Copiado!' | 'Erro!'>('Copiar');

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(texto);
      setFeedbackCopia('Copiado!');
      setTimeout(() => setFeedbackCopia('Copiar'), 2000);
    } catch (err) {
      console.error('Falha ao copiar:', err);
      setFeedbackCopia('Erro!');
      setTimeout(() => setFeedbackCopia('Copiar'), 3000);
    }
  }, [texto]);

  const handleDownload = useCallback(() => {
    const blob = new Blob([texto], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = nomeArquivo;

    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [texto, nomeArquivo]);

  const classeBotaoCopia =
    feedbackCopia === 'Copiado!'
      ? 'bg-green-600 hover:bg-green-500'
      : feedbackCopia === 'Erro!'
        ? 'bg-red-600 hover:bg-red-500'
        : 'bg-primary text-primary-foreground hover:bg-primary/90';

  return (
    <div className="max-w-4xl w-full mx-auto my-6 border border-border rounded-lg bg-card text-card-foreground shadow-xl">

      <div className="flex justify-between items-center p-4 border-b border-border">
        <h3 className="text-xl font-bold font-sans">
          {titulo}
        </h3>
        <div className="flex gap-2">

          <button
            onClick={handleCopy}
            className={`px-3 py-1.5 rounded-md text-sm font-semibold transition-colors ${classeBotaoCopia}`}
          >
            {feedbackCopia}
          </button>

          <button
            onClick={handleDownload}
            className="px-3 py-1.5 rounded-md text-sm font-semibold bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
          >
            Baixar
          </button>
        </div>
      </div>

      <pre className="p-4 overflow-auto max-h-[400px] bg-background text-foreground text-sm rounded-b-lg font-mono">
        {texto}
      </pre>
    </div>
  );
};

export default CaixaDeTextoExportavel;