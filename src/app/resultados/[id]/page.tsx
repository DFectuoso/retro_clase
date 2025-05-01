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

export default function ResultsPage({ params }: { params: Promise<{ id: string }> }) {
  const [resultsData, setResultsData] = useState<ResultsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [formId, setFormId] = useState<string | null>(null);

  useEffect(() => {
    // Get the ID from params (which is now a Promise)
    const resolveParams = async () => {
      try {
        const resolvedParams = await params;
        setFormId(resolvedParams.id);
      } catch (err) {
        console.error('Error resolving params:', err);
        setError(err instanceof Error ? err.message : 'Error al cargar los parámetros');
        setLoading(false);
      }
    };

    resolveParams();
  }, [params]);

  useEffect(() => {
    // Only fetch the results when we have resolved the formId
    if (!formId) return;

    const fetchResults = async () => {
      try {
        const response = await fetch(`/api/feedback/${formId}/results`);
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
  }, [formId]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-16 max-w-4xl text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-[#0F2642]/10 dark:bg-white/10 rounded-full w-1/2 mx-auto mb-8"></div>
          <div className="h-4 bg-[#0F2642]/10 dark:bg-white/10 rounded-full w-1/3 mx-auto mb-12"></div>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="h-32 bg-[#0F2642]/5 dark:bg-white/5 rounded-xl"></div>
            <div className="h-32 bg-[#0F2642]/5 dark:bg-white/5 rounded-xl"></div>
          </div>
          <div className="h-64 bg-[#0F2642]/5 dark:bg-white/5 rounded-xl"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-6 py-16 max-w-4xl">
        <div className="bg-[#CC3B36]/10 dark:bg-[#CC3B36]/20 border border-[#CC3B36]/20 dark:border-[#CC3B36]/30 text-[#CC3B36] dark:text-red-400 px-6 py-4 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  if (!resultsData) {
    return (
      <div className="container mx-auto px-6 py-16 max-w-4xl">
        <div className="bg-[#CC3B36]/10 dark:bg-[#CC3B36]/20 border border-[#CC3B36]/20 dark:border-[#CC3B36]/30 text-[#CC3B36] dark:text-red-400 px-6 py-4 rounded-lg">
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
        <h1 className="text-3xl md:text-4xl font-bold mb-3 text-[#0F2642] dark:text-white">{form.name}</h1>
        <p className="text-gray-700 dark:text-gray-300">{form.description}</p>
      </div>

      {stats.totalResponses === 0 ? (
        <div className="bg-gradient-to-br from-[#F2B544]/20 to-[#F2B544]/10 dark:from-[#F2B544]/30 dark:to-[#F2B544]/20 border border-[#F2B544]/20 dark:border-[#F2B544]/30 text-[#8B6000] dark:text-yellow-400 px-6 py-8 rounded-xl mb-8">
          <div className="flex items-center justify-center md:justify-start mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#F2B544] dark:text-yellow-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                className="w-full px-4 py-3 pr-20 border border-[#F2B544]/30 dark:border-[#F2B544]/40 rounded-lg bg-white/80 dark:bg-gray-700 dark:text-white focus:outline-none"
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
            <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-8 border-t-4 border-[#0F2642]">
              <h2 className="text-xl font-semibold mb-6 text-[#0F2642] dark:text-white">Estadísticas Generales</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2 text-[#0F2642] dark:text-white">NPS (Net Promoter Score)</h3>
                  <div className="flex items-baseline">
                    <div className="text-4xl font-bold text-[#0F2642] dark:text-white">{stats.npsScore}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 ml-2">/ 100</div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    % promotores - % detractores
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2 text-[#0F2642] dark:text-white">Puntuación Promedio</h3>
                  <div className="flex items-baseline">
                    <div className="text-4xl font-bold text-[#0F2642] dark:text-white">
                      {stats.averageScore.toFixed(1)}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 ml-2">/ 10</div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {stats.totalResponses} respuesta{stats.totalResponses !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-8 border-t-4 border-[#E3562A]">
              <h3 className="text-xl font-semibold mb-6 text-[#0F2642] dark:text-white">Distribución de Respuestas</h3>
              
              <div className="space-y-5">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-[#2A6B26] dark:text-green-400">Promotores (9-10)</span>
                    <span className="text-sm font-medium text-[#2A6B26] dark:text-green-400">
                      {stats.npsBreakdown.promoters} ({stats.totalResponses > 0 ? Math.round((stats.npsBreakdown.promoters / stats.totalResponses) * 100) : 0}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div 
                      className="bg-[#7CC470] h-3 rounded-full" 
                      style={{ width: `${stats.totalResponses > 0 ? (stats.npsBreakdown.promoters / stats.totalResponses) * 100 : 0}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-[#8B6000] dark:text-yellow-400">Pasivos (7-8)</span>
                    <span className="text-sm font-medium text-[#8B6000] dark:text-yellow-400">
                      {stats.npsBreakdown.passives} ({stats.totalResponses > 0 ? Math.round((stats.npsBreakdown.passives / stats.totalResponses) * 100) : 0}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div 
                      className="bg-[#F2B544] h-3 rounded-full" 
                      style={{ width: `${stats.totalResponses > 0 ? (stats.npsBreakdown.passives / stats.totalResponses) * 100 : 0}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-[#8A2721] dark:text-red-400">Detractores (0-6)</span>
                    <span className="text-sm font-medium text-[#8A2721] dark:text-red-400">
                      {stats.npsBreakdown.detractors} ({stats.totalResponses > 0 ? Math.round((stats.npsBreakdown.detractors / stats.totalResponses) * 100) : 0}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div 
                      className="bg-[#CC3B36] h-3 rounded-full" 
                      style={{ width: `${stats.totalResponses > 0 ? (stats.npsBreakdown.detractors / stats.totalResponses) * 100 : 0}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-8 border-t-4 border-[#0F2642] mb-10">
            <h2 className="text-xl font-semibold mb-6 text-[#0F2642] dark:text-white">Respuestas Individuales</h2>
            
            {responses.length > 0 ? (
              <div className="space-y-6">
                {responses.map((response) => {
                  let scoreClass = 'text-[#CC3B36]';
                  if (response.score >= 9) {
                    scoreClass = 'text-[#7CC470]';
                  } else if (response.score >= 7) {
                    scoreClass = 'text-[#F2B544]';
                  }
                  
                  return (
                    <div key={response.id} className="border-b border-gray-200 dark:border-gray-700 pb-6">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <span className={`text-xl font-bold ${scoreClass}`}>{response.score}/10</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {new Date(response.createdAt).toLocaleDateString('es-ES', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                      {response.comment ? (
                        <p className="text-gray-700 dark:text-gray-300">{response.comment}</p>
                      ) : (
                        <p className="text-gray-500 dark:text-gray-400 italic">Sin comentarios</p>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 italic">No hay respuestas con comentarios</p>
            )}
          </div>
          
          <div className="bg-gradient-to-br from-[#0F2642]/10 to-[#1A3A5F]/5 dark:from-[#0F2642]/20 dark:to-[#1A3A5F]/15 border border-[#0F2642]/20 dark:border-[#0F2642]/30 text-[#0F2642] dark:text-gray-200 px-6 py-6 rounded-xl">
            <h3 className="text-lg font-semibold mb-4">Compartir formulario</h3>
            <div className="flex flex-col md:flex-row gap-3">
              <div className="relative flex-grow">
                <input
                  type="text"
                  value={shareableLink}
                  readOnly
                  className="w-full px-4 py-3 pr-20 border border-[#0F2642]/30 dark:border-[#0F2642]/40 rounded-lg bg-white/80 dark:bg-gray-700 dark:text-white focus:outline-none"
                />
                <button
                  onClick={() => copyToClipboard(shareableLink)}
                  className="absolute right-2 top-2 px-4 py-1 bg-[#0F2642] text-white font-medium rounded-md hover:bg-[#1A3A5F] transition-colors"
                >
                  {copiedLink ? '¡Copiado!' : 'Copiar'}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
} 