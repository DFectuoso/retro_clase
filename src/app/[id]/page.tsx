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
      <div className="container mx-auto px-4 py-12 max-w-2xl text-center">
        <p className="text-gray-600">Cargando formulario...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  if (!feedbackForm) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          No se encontró el formulario
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-2xl text-center">
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-8 rounded mb-6">
          <h2 className="text-2xl font-bold mb-4">¡Gracias por tu feedback!</h2>
          <p>Tu respuesta ha sido registrada correctamente.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <h1 className="text-3xl font-bold mb-4 text-blue-600">{feedbackForm.name}</h1>
      <p className="text-gray-700 mb-8">{feedbackForm.description}</p>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
        <div className="mb-8">
          <label className="block text-gray-700 font-medium mb-4">
            ¿Qué tan probable es que recomiendes {feedbackForm.name} a un amigo o colega?
          </label>
          
          <div className="flex flex-wrap justify-between mb-2">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setScore(value)}
                className={`w-10 h-10 mb-2 rounded-full flex items-center justify-center font-medium border ${
                  score === value
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-blue-500'
                }`}
              >
                {value}
              </button>
            ))}
          </div>
          
          <div className="flex justify-between text-sm text-gray-600 px-2">
            <span>Poco probable</span>
            <span>Muy probable</span>
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="comment" className="block text-gray-700 font-medium mb-2">
            ¿Algún comentario o sugerencia adicional?
          </label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Tu opinión es muy valiosa para nosotros"
            rows={4}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400"
          >
            {submitting ? 'Enviando...' : 'Enviar Feedback'}
          </button>
        </div>
      </form>
    </div>
  );
} 