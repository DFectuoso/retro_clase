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

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-4xl text-center">
        <p className="text-gray-600">Cargando resultados...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  if (!resultsData) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          No se encontraron resultados
        </div>
      </div>
    );
  }

  const { form, stats, responses } = resultsData;
  const shareableLink = typeof window !== 'undefined' ? `${window.location.origin}/${form.id}` : '';

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-blue-600">{form.name}</h1>
        <p className="text-gray-700">{form.description}</p>
      </div>

      {stats.totalResponses === 0 ? (
        <div className="bg-yellow-50 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold mb-2">Aún no hay respuestas</h2>
          <p className="mb-4">Comparte el enlace de tu formulario para recibir feedback.</p>
          
          <div className="flex flex-col md:flex-row gap-3">
            <input
              type="text"
              value={shareableLink}
              readOnly
              className="flex-grow px-4 py-2 border rounded-lg bg-white"
            />
            <button
              onClick={() => {
                navigator.clipboard.writeText(shareableLink);
                alert('¡Enlace copiado al portapapeles!');
              }}
              className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Copiar Enlace
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="bg-white shadow-md rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-6 text-blue-600">Estadísticas</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-2">NPS (Net Promoter Score)</h3>
                  <div className="text-4xl font-bold text-blue-600">{stats.npsScore}</div>
                  <p className="text-sm text-gray-600 mt-1">
                    Porcentaje de promotores menos porcentaje de detractores
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Puntuación Promedio</h3>
                  <div className="text-4xl font-bold text-blue-600">
                    {stats.averageScore.toFixed(1)}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    Basado en {stats.totalResponses} respuesta{stats.totalResponses !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-3">Distribución de Respuestas</h3>
                
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-green-700">Promotores (9-10)</span>
                      <span className="text-sm font-medium text-green-700">
                        {stats.npsBreakdown.promoters} ({stats.totalResponses > 0 ? Math.round((stats.npsBreakdown.promoters / stats.totalResponses) * 100) : 0}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: `${stats.totalResponses > 0 ? (stats.npsBreakdown.promoters / stats.totalResponses) * 100 : 0}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-yellow-700">Pasivos (7-8)</span>
                      <span className="text-sm font-medium text-yellow-700">
                        {stats.npsBreakdown.passives} ({stats.totalResponses > 0 ? Math.round((stats.npsBreakdown.passives / stats.totalResponses) * 100) : 0}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-yellow-500 h-2 rounded-full" 
                        style={{ width: `${stats.totalResponses > 0 ? (stats.npsBreakdown.passives / stats.totalResponses) * 100 : 0}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-red-700">Detractores (0-6)</span>
                      <span className="text-sm font-medium text-red-700">
                        {stats.npsBreakdown.detractors} ({stats.totalResponses > 0 ? Math.round((stats.npsBreakdown.detractors / stats.totalResponses) * 100) : 0}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-red-500 h-2 rounded-full" 
                        style={{ width: `${stats.totalResponses > 0 ? (stats.npsBreakdown.detractors / stats.totalResponses) * 100 : 0}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4 text-blue-600">Comparte el enlace de tu formulario</h2>
            <div className="flex flex-col md:flex-row gap-3">
              <input
                type="text"
                value={shareableLink}
                readOnly
                className="flex-grow px-4 py-2 border rounded-lg"
              />
              <button
                onClick={() => {
                  navigator.clipboard.writeText(shareableLink);
                  alert('¡Enlace copiado al portapapeles!');
                }}
                className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Copiar Enlace
              </button>
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4 text-blue-600">Comentarios ({responses.filter(r => r.comment).length})</h2>
            
            {responses.filter(r => r.comment).length === 0 ? (
              <p className="text-gray-600">No hay comentarios para mostrar</p>
            ) : (
              <div className="space-y-4">
                {responses
                  .filter(r => r.comment)
                  .map(response => (
                    <div key={response.id} className="bg-white shadow-md rounded-lg p-4">
                      <div className="flex items-center mb-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-medium text-white mr-2 ${
                          response.score >= 9 ? 'bg-green-500' :
                          response.score >= 7 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}>
                          {response.score}
                        </div>
                        <div className="text-sm text-gray-500">
                          {new Date(response.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                      <p className="text-gray-700">{response.comment}</p>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
} 