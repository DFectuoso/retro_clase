'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateFeedbackForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al crear el formulario');
      }

      router.push(`/${data.id}/success`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear el formulario');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-600">
        Crear Nuevo Formulario de Feedback
      </h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
        <div className="mb-6">
          <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
            Nombre del Evento o Clase
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ej: Taller de Diseño Web"
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
            Descripción
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe el evento o clase para el que deseas recibir feedback"
            required
            rows={4}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400"
          >
            {isLoading ? 'Creando...' : 'Crear Formulario'}
          </button>
        </div>
      </form>

      <div className="mt-8 bg-blue-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-blue-600">¿Cómo funciona?</h2>
        <ol className="list-decimal pl-5 space-y-2 text-gray-700">
          <li>Completa este formulario con la información de tu evento o clase.</li>
          <li>Recibirás un enlace único que puedes compartir con tus participantes.</li>
          <li>Ellos podrán calificar el evento y dejar comentarios de forma anónima.</li>
          <li>Podrás ver los resultados en tiempo real en tu panel de administración.</li>
        </ol>
      </div>
    </div>
  );
} 