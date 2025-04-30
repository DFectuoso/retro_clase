'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateFeedbackForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    email: '',
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
    <div className="container mx-auto px-6 py-16 max-w-2xl">
      <h1 className="text-3xl md:text-4xl font-bold mb-10 text-center text-[#0F2642]">
        Crear Nuevo Formulario de Feedback
      </h1>

      {error && (
        <div className="bg-[#CC3B36]/10 border border-[#CC3B36]/20 text-[#CC3B36] px-6 py-4 rounded-lg mb-8">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-xl p-8 mb-10">
        <div className="mb-8">
          <label htmlFor="name" className="block text-[#0F2642] font-medium mb-3 text-lg">
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
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E3562A] focus:border-transparent transition-all"
          />
        </div>

        <div className="mb-8">
          <label htmlFor="description" className="block text-[#0F2642] font-medium mb-3 text-lg">
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
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E3562A] focus:border-transparent transition-all"
          />
        </div>

        <div className="mb-10">
          <label htmlFor="email" className="block text-[#0F2642] font-medium mb-3 text-lg">
            Email (opcional)
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Recibe notificaciones cuando alguien responda"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E3562A] focus:border-transparent transition-all"
          />
          <p className="text-sm text-gray-500 mt-2">
            Si proporcionas tu email, recibirás una notificación cada vez que alguien envíe feedback.
          </p>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            disabled={isLoading}
            className="px-8 py-3 bg-[#E3562A] text-white font-medium rounded-lg hover:bg-[#CC3B36] transition-all duration-300 shadow-md transform hover:scale-105 disabled:bg-gray-400 disabled:transform-none disabled:hover:scale-100"
          >
            {isLoading ? 'Creando...' : 'Crear Formulario'}
          </button>
        </div>
      </form>

      <div className="bg-gradient-to-br from-[#0F2642] to-[#1A3A5F] text-white p-8 rounded-xl shadow-xl">
        <h2 className="text-xl font-semibold mb-6 text-[#F2ECDF]">¿Cómo funciona?</h2>
        <ol className="space-y-4 text-[#F2ECDF]/90 ml-4">
          <li className="flex items-start">
            <span className="bg-[#E3562A] text-white h-6 w-6 rounded-full flex items-center justify-center font-bold text-sm mr-3 mt-0.5 flex-shrink-0">1</span>
            <p>Completa este formulario con la información de tu evento o clase.</p>
          </li>
          <li className="flex items-start">
            <span className="bg-[#E3562A] text-white h-6 w-6 rounded-full flex items-center justify-center font-bold text-sm mr-3 mt-0.5 flex-shrink-0">2</span>
            <p>Recibirás un enlace único que puedes compartir con tus participantes.</p>
          </li>
          <li className="flex items-start">
            <span className="bg-[#E3562A] text-white h-6 w-6 rounded-full flex items-center justify-center font-bold text-sm mr-3 mt-0.5 flex-shrink-0">3</span>
            <p>Ellos podrán calificar el evento y dejar comentarios de forma anónima.</p>
          </li>
          <li className="flex items-start">
            <span className="bg-[#E3562A] text-white h-6 w-6 rounded-full flex items-center justify-center font-bold text-sm mr-3 mt-0.5 flex-shrink-0">4</span>
            <p>Podrás ver los resultados en tiempo real en tu panel de administración.</p>
          </li>
        </ol>
      </div>
    </div>
  );
} 