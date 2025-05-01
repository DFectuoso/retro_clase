'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface FeedbackForm {
  id: string;
  name: string;
  description: string;
}

export default function SuccessPage({ params }: { params: Promise<{ id: string }> }) {
  const [feedbackForm, setFeedbackForm] = useState<FeedbackForm | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [shareableLink, setShareableLink] = useState('');
  const [resultsLink, setResultsLink] = useState('');
  const [copied, setCopied] = useState<'shareable' | 'results' | null>(null);
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
    // Only fetch the form when we have resolved the formId
    if (!formId) return;

    const fetchFeedbackForm = async () => {
      try {
        const response = await fetch(`/api/feedback/${formId}`);
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
  }, [formId]);

  const copyToClipboard = (text: string, type: 'shareable' | 'results') => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-16 max-w-2xl text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-[#0F2642]/10 rounded-full w-3/4 mx-auto mb-8"></div>
          <div className="h-4 bg-[#0F2642]/10 rounded-full w-1/2 mx-auto mb-4"></div>
          <div className="h-32 bg-[#0F2642]/5 rounded-xl w-full mx-auto mb-4"></div>
          <div className="h-32 bg-[#0F2642]/5 rounded-xl w-full mx-auto"></div>
        </div>
      </div>
    );
  }

  if (error || !feedbackForm) {
    return (
      <div className="container mx-auto px-6 py-16 max-w-2xl">
        <div className="bg-[#CC3B36]/10 border border-[#CC3B36]/20 text-[#CC3B36] px-6 py-4 rounded-lg">
          {error || 'No se encontró el formulario'}
        </div>
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="px-6 py-3 bg-[#E3562A] text-white font-medium rounded-lg hover:bg-[#CC3B36] transition-all duration-300 shadow-md transform hover:scale-105"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-16 max-w-2xl">
      <div className="bg-gradient-to-br from-[#7CC470]/20 to-[#7CC470]/10 border border-[#7CC470]/20 text-[#2A6B26] px-6 py-8 rounded-xl mb-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 -m-8 bg-[#7CC470]/5 rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 -m-6 bg-[#7CC470]/5 rounded-full"></div>
        
        <div className="relative">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4 text-[#7CC470]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">¡Formulario creado con éxito!</h2>
          <p className="text-center text-lg">
            Tu formulario para <strong>{feedbackForm.name}</strong> ha sido creado correctamente.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white shadow-xl rounded-xl p-6 border-t-4 border-[#E3562A]">
          <h2 className="text-xl font-semibold mb-4 text-[#0F2642]">Enlace para compartir</h2>
          <p className="mb-4 text-gray-600">
            Comparte este enlace con tus asistentes para recibir su retroalimentación:
          </p>
          
          <div className="flex flex-col gap-3">
            <div className="relative">
              <input
                type="text"
                value={shareableLink}
                readOnly
                className="w-full px-4 py-3 pr-20 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E3562A] focus:border-transparent"
              />
              <button
                onClick={() => copyToClipboard(shareableLink, 'shareable')}
                className="absolute right-2 top-2 px-3 py-1 bg-[#E3562A] text-white font-medium rounded-md hover:bg-[#CC3B36] transition-colors"
              >
                {copied === 'shareable' ? '¡Copiado!' : 'Copiar'}
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-xl rounded-xl p-6 border-t-4 border-[#F2B544]">
          <h2 className="text-xl font-semibold mb-4 text-[#0F2642]">Enlace de resultados</h2>
          <p className="mb-4 text-gray-600">
            Usa este enlace para ver los resultados y estadísticas (guárdalo en un lugar seguro):
          </p>
          
          <div className="flex flex-col gap-3">
            <div className="relative">
              <input
                type="text"
                value={resultsLink}
                readOnly
                className="w-full px-4 py-3 pr-20 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#F2B544] focus:border-transparent"
              />
              <button
                onClick={() => copyToClipboard(resultsLink, 'results')}
                className="absolute right-2 top-2 px-3 py-1 bg-[#F2B544] text-white font-medium rounded-md hover:bg-[#E3A432] transition-colors"
              >
                {copied === 'results' ? '¡Copiado!' : 'Copiar'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
        <Link
          href={`/${feedbackForm.id}`}
          className="px-6 py-3 bg-[#0F2642] text-white font-medium rounded-lg hover:bg-[#1A3A5F] transition-all duration-300 shadow-md transform hover:scale-105 text-center"
        >
          Ver Formulario
        </Link>
        <Link
          href={`/resultados/${feedbackForm.id}`}
          className="px-6 py-3 border-2 border-[#0F2642] text-[#0F2642] font-medium rounded-lg hover:bg-[#0F2642]/5 transition-all duration-300 transform hover:scale-105 text-center"
        >
          Ver Resultados
        </Link>
      </div>
    </div>
  );
} 