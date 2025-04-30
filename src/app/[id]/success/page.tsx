'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface FeedbackForm {
  id: string;
  name: string;
  description: string;
}

export default function SuccessPage({ params }: { params: { id: string } }) {
  const [feedbackForm, setFeedbackForm] = useState<FeedbackForm | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [shareableLink, setShareableLink] = useState('');
  const [resultsLink, setResultsLink] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchFeedbackForm = async () => {
      try {
        const response = await fetch(`/api/feedback/${params.id}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'No se pudo cargar el formulario');
        }

        setFeedbackForm(data);
        
        if (typeof window !== 'undefined') {
          setShareableLink(`${window.location.origin}/${data.id}`);
          setResultsLink(`${window.location.origin}/resultados/${data.id}`);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar el formulario');
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbackForm();
  }, [params.id]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-2xl text-center">
        <p className="text-gray-600">Cargando información...</p>
      </div>
    );
  }

  if (error || !feedbackForm) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error || 'No se encontró el formulario'}
        </div>
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-6 rounded-lg mb-8">
        <h2 className="text-2xl font-bold mb-4 text-center">¡Formulario creado con éxito!</h2>
        <p className="text-center">
          Tu formulario para <strong>{feedbackForm.name}</strong> ha sido creado correctamente.
        </p>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-6 text-blue-600">Enlace para compartir</h2>
        <p className="mb-4">
          Comparte este enlace con tus asistentes para recibir su retroalimentación:
        </p>
        
        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <input
            type="text"
            value={shareableLink}
            readOnly
            className="flex-grow px-4 py-2 border rounded-lg"
          />
          <button
            onClick={() => copyToClipboard(shareableLink)}
            className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            {copied ? '¡Copiado!' : 'Copiar'}
          </button>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-6 text-blue-600">Enlace de resultados</h2>
        <p className="mb-4">
          Usa este enlace para ver los resultados y estadísticas de tu formulario (guárdalo en un lugar seguro):
        </p>
        
        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <input
            type="text"
            value={resultsLink}
            readOnly
            className="flex-grow px-4 py-2 border rounded-lg"
          />
          <button
            onClick={() => copyToClipboard(resultsLink)}
            className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            {copied ? '¡Copiado!' : 'Copiar'}
          </button>
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-8">
        <Link
          href={`/${feedbackForm.id}`}
          className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          Ver Formulario
        </Link>
        <Link
          href={`/resultados/${feedbackForm.id}`}
          className="px-4 py-2 border border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors"
        >
          Ver Resultados
        </Link>
      </div>
    </div>
  );
} 