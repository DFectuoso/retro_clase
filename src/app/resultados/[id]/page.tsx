'use client';

import { useEffect, useState } from 'react';

interface FeedbackForm {
  id: string;
  name: string;
  description: string;
}

interface Response {
  id: string;
  score: number;
  comment: string | null;
  createdAt: string;
}

interface Stats {
  totalResponses: number;
  averageScore: number;
  npsBreakdown: {
    promoters: number;
    passives: number;
    detractors: number;
  };
  npsScore: number;
}

interface ResultsData {
  form: FeedbackForm;
  stats: Stats;
  responses: Response[];
}

export default function ResultsPage({ params }: { params: { id: string } }) {
  const [resultsData, setResultsData] = useState<ResultsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch(`/api/feedback/${params.id}/results`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'No se pudieron cargar los resultados');
        }

        setResultsData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar los resultados');
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [params.id]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-16 max-w-4xl text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-[#0F2642]/10 rounded-full w-1/2 mx-auto mb-8"></div>
          <div className="h-4 bg-[#0F2642]/10 rounded-full w-1/3 mx-auto mb-12"></div>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="h-32 bg-[#0F2642]/5 rounded-xl"></div>
            <div className="h-32 bg-[#0F2642]/5 rounded-xl"></div>
          </div>
          <div className="h-64 bg-[#0F2642]/5 rounded-xl"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-6 py-16 max-w-4xl">
        <div className="bg-[#CC3B36]/10 border border-[#CC3B36]/20 text-[#CC3B36] px-6 py-4 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  if (!resultsData) {
    return (
      <div className="container mx-auto px-6 py-16 max-w-4xl">
        <div className="bg-[#CC3B36]/10 border border-[#CC3B36]/20 text-[#CC3B36] px-6 py-4 rounded-lg">
          No se encontraron resultados
        </div>
      </div>
    );
  }

  const { form, stats, responses } = resultsData;
  const shareableLink = typeof window !== 'undefined' ? `${window.location.origin}/${form.id}` : '';

  return (
    <div className="container mx-auto px-6 py-16 max-w-4xl">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-3 text-[#0F2642]">{form.name}</h1>
        <p className="text-gray-700">{form.description}</p>
      </div>

      {stats.totalResponses === 0 ? (
        <div className="bg-gradient-to-br from-[#F2B544]/20 to-[#F2B544]/10 border border-[#F2B544]/20 text-[#8B6000] px-6 py-8 rounded-xl mb-8">
          <div className="flex items-center justify-center md:justify-start mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#F2B544] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="text-xl font-semibold">Aún no hay respuestas</h2>
          </div>
          <p className="mb-6">Comparte el enlace de tu formulario para recibir feedback.</p>
          
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-grow">
              <input
                type="text"
                value={shareableLink}
                readOnly
                className="w-full px-4 py-3 pr-20 border border-[#F2B544]/30 rounded-lg bg-white/80 focus:outline-none"
              />
              <button
                onClick={() => copyToClipboard(shareableLink)}
                className="absolute right-2 top-2 px-4 py-1 bg-[#F2B544] text-white font-medium rounded-md hover:bg-[#E3A432] transition-colors"
              >
                {copiedLink ? '¡Copiado!' : 'Copiar'}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="grid md:grid-cols-2 gap-8 mb-10">
            <div className="bg-white shadow-xl rounded-xl p-8 border-t-4 border-[#0F2642]">
              <h2 className="text-xl font-semibold mb-6 text-[#0F2642]">Estadísticas Generales</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2 text-[#0F2642]">NPS (Net Promoter Score)</h3>
                  <div className="flex items-baseline">
                    <div className="text-4xl font-bold text-[#0F2642]">{stats.npsScore}</div>
                    <div className="text-sm text-gray-600 ml-2">/ 100</div>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    % promotores - % detractores
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2 text-[#0F2642]">Puntuación Promedio</h3>
                  <div className="flex items-baseline">
                    <div className="text-4xl font-bold text-[#0F2642]">
                      {stats.averageScore.toFixed(1)}
                    </div>
                    <div className="text-sm text-gray-600 ml-2">/ 10</div>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {stats.totalResponses} respuesta{stats.totalResponses !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white shadow-xl rounded-xl p-8 border-t-4 border-[#E3562A]">
              <h3 className="text-xl font-semibold mb-6 text-[#0F2642]">Distribución de Respuestas</h3>
              
              <div className="space-y-5">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-[#2A6B26]">Promotores (9-10)</span>
                    <span className="text-sm font-medium text-[#2A6B26]">
                      {stats.npsBreakdown.promoters} ({stats.totalResponses > 0 ? Math.round((stats.npsBreakdown.promoters / stats.totalResponses) * 100) : 0}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-[#7CC470] h-3 rounded-full" 
                      style={{ width: `${stats.totalResponses > 0 ? (stats.npsBreakdown.promoters / stats.totalResponses) * 100 : 0}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-[#8B6000]">Pasivos (7-8)</span>
                    <span className="text-sm font-medium text-[#8B6000]">
                      {stats.npsBreakdown.passives} ({stats.totalResponses > 0 ? Math.round((stats.npsBreakdown.passives / stats.totalResponses) * 100) : 0}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-[#F2B544] h-3 rounded-full" 
                      style={{ width: `${stats.totalResponses > 0 ? (stats.npsBreakdown.passives / stats.totalResponses) * 100 : 0}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-[#A72A25]">Detractores (0-6)</span>
                    <span className="text-sm font-medium text-[#A72A25]">
                      {stats.npsBreakdown.detractors} ({stats.totalResponses > 0 ? Math.round((stats.npsBreakdown.detractors / stats.totalResponses) * 100) : 0}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-[#CC3B36] h-3 rounded-full" 
                      style={{ width: `${stats.totalResponses > 0 ? (stats.npsBreakdown.detractors / stats.totalResponses) * 100 : 0}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white shadow-xl rounded-xl p-8 mb-10 border-t-4 border-[#F2B544]">
            <h2 className="text-xl font-semibold mb-4 text-[#0F2642]">Comparte el enlace de tu formulario</h2>
            <div className="flex flex-col md:flex-row gap-3">
              <div className="relative flex-grow">
                <input
                  type="text"
                  value={shareableLink}
                  readOnly
                  className="w-full px-4 py-3 pr-20 border border-gray-200 rounded-lg"
                />
                <button
                  onClick={() => copyToClipboard(shareableLink)}
                  className="absolute right-2 top-2 px-3 py-1 bg-[#F2B544] text-white font-medium rounded-md hover:bg-[#E3A432] transition-colors"
                >
                  {copiedLink ? '¡Copiado!' : 'Copiar'}
                </button>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-6 text-[#0F2642] flex items-center">
              Comentarios 
              <span className="ml-3 bg-[#0F2642] text-white text-sm px-2 py-0.5 rounded-full">
                {responses.filter(r => r.comment).length}
              </span>
            </h2>
            
            {responses.filter(r => r.comment).length === 0 ? (
              <p className="text-gray-600 bg-gray-50 p-6 rounded-xl text-center">No hay comentarios para mostrar</p>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {responses
                  .filter(r => r.comment)
                  .map(response => {
                    let badgeColor = '';
                    if (response.score >= 9) {
                      badgeColor = 'bg-[#7CC470]';
                    } else if (response.score >= 7) {
                      badgeColor = 'bg-[#F2B544]';
                    } else {
                      badgeColor = 'bg-[#CC3B36]';
                    }
                    
                    return (
                      <div key={response.id} className="bg-white shadow-md rounded-xl p-5 border-l-4 border-gray-200">
                        <div className="flex items-center mb-3">
                          <div className={`${badgeColor} w-9 h-9 rounded-full flex items-center justify-center font-medium text-white mr-3`}>
                            {response.score}
                          </div>
                          <div className="text-sm text-gray-500">
                            {new Date(response.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                        <p className="text-gray-700">{response.comment}</p>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
} 