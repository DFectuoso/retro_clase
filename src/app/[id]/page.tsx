'use client';

import { useEffect, useState } from 'react';

interface FeedbackForm {
  id: string;
  name: string;
  description: string;
}

export default function FeedbackFormPage({ params }: { params: { id: string } }) {
  const [feedbackForm, setFeedbackForm] = useState<FeedbackForm | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [score, setScore] = useState<number | null>(null);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchFeedbackForm = async () => {
      try {
        const response = await fetch(`/api/feedback/${params.id}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'No se pudo cargar el formulario');
        }

        setFeedbackForm(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar el formulario');
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbackForm();
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (score === null) {
      setError('Por favor, selecciona una puntuación');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const response = await fetch(`/api/feedback/${params.id}/response`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ score, comment }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al enviar el feedback');
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al enviar el feedback');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-16 max-w-2xl text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-[#0F2642]/10 rounded-full w-3/4 mx-auto mb-8"></div>
          <div className="h-4 bg-[#0F2642]/10 rounded-full w-1/2 mx-auto mb-4"></div>
          <div className="h-64 bg-[#0F2642]/5 rounded-xl w-full mx-auto"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-6 py-16 max-w-2xl">
        <div className="bg-[#CC3B36]/10 border border-[#CC3B36]/20 text-[#CC3B36] px-6 py-4 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  if (!feedbackForm) {
    return (
      <div className="container mx-auto px-6 py-16 max-w-2xl">
        <div className="bg-[#CC3B36]/10 border border-[#CC3B36]/20 text-[#CC3B36] px-6 py-4 rounded-lg">
          No se encontró el formulario
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="container mx-auto px-6 py-16 max-w-2xl text-center">
        <div className="bg-[#7CC470]/10 border border-[#7CC470]/20 text-[#2A6B26] px-6 py-12 rounded-xl mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4 text-[#7CC470]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-3xl font-bold mb-4">¡Gracias por tu feedback!</h2>
          <p className="text-lg">Tu respuesta ha sido registrada correctamente.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-16 max-w-2xl">
      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-[#0F2642]">{feedbackForm.name}</h1>
      <p className="text-gray-700 mb-10">{feedbackForm.description}</p>

      {error && (
        <div className="bg-[#CC3B36]/10 border border-[#CC3B36]/20 text-[#CC3B36] px-6 py-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-xl p-8">
        <div className="mb-10">
          <label className="block text-[#0F2642] font-medium mb-6 text-lg">
            ¿Qué tan probable es que recomiendes {feedbackForm.name} a un amigo o colega?
          </label>
          
          <div className="flex flex-wrap justify-between mb-4">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => {
              let buttonClass = "w-11 h-11 mb-3 rounded-full flex items-center justify-center font-medium border transition-all duration-300 ";
              
              if (score === value) {
                if (value <= 6) {
                  buttonClass += "bg-[#CC3B36] text-white border-[#CC3B36] shadow-md";
                } else if (value <= 8) {
                  buttonClass += "bg-[#F2B544] text-white border-[#F2B544] shadow-md";
                } else {
                  buttonClass += "bg-[#7CC470] text-white border-[#7CC470] shadow-md";
                }
              } else {
                buttonClass += "bg-white text-[#0F2642] border-gray-200 hover:border-[#0F2642]/70 hover:scale-110";
              }
              
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => setScore(value)}
                  className={buttonClass}
                >
                  {value}
                </button>
              );
            })}
          </div>
          
          <div className="flex justify-between text-sm text-gray-600 px-2">
            <span>Poco probable</span>
            <span>Muy probable</span>
          </div>
        </div>

        <div className="mb-8">
          <label htmlFor="comment" className="block text-[#0F2642] font-medium mb-3 text-lg">
            ¿Algún comentario o sugerencia adicional?
          </label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Tu opinión es muy valiosa para nosotros"
            rows={4}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E3562A] focus:border-transparent transition-all"
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            disabled={submitting}
            className="px-8 py-3 bg-[#E3562A] text-white font-medium rounded-lg hover:bg-[#CC3B36] transition-all duration-300 shadow-md transform hover:scale-105 disabled:bg-gray-400 disabled:transform-none disabled:hover:scale-100"
          >
            {submitting ? 'Enviando...' : 'Enviar Feedback'}
          </button>
        </div>
      </form>
    </div>
  );
} 