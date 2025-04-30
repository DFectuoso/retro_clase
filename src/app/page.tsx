import Link from "next/link";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <section className="mb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-blue-600">
          RetroFeedback
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-8">
          Obtén retroalimentación valiosa de tus clases, cursos o eventos con nuestro sistema de Net Promoter Score (NPS)
        </p>
        <Link
          href="/create"
          className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          Crear Formulario de Feedback
        </Link>
      </section>

      <section className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-blue-600">Crea Formularios</h2>
          <p className="text-gray-700">
            Crea formularios personalizados con tu nombre y descripción para obtener retroalimentación específica para cada clase o evento.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-blue-600">Comparte Enlaces</h2>
          <p className="text-gray-700">
            Comparte un enlace único con tus participantes para recopilar sus comentarios de manera anónima y sencilla.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-blue-600">Analiza Resultados</h2>
          <p className="text-gray-700">
            Revisa estadísticas detalladas, puntuaciones NPS y comentarios para mejorar continuamente tus servicios.
          </p>
        </div>
      </section>

      <section className="bg-blue-50 p-8 rounded-lg mb-16">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">¿Qué es el Net Promoter Score?</h2>
        <p className="text-gray-700 mb-4">
          El NPS es una métrica utilizada para medir la lealtad y satisfacción del cliente. Se basa en una sola pregunta:
          &ldquo;¿Qué tan probable es que recomiendes este servicio a un amigo o familiar?&rdquo;
        </p>
        <p className="text-gray-700 mb-4">
          Los clientes responden en una escala del 0 al 10 y se clasifican como:
        </p>
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <div className="bg-red-100 p-4 rounded-lg">
            <h3 className="font-semibold text-red-700">Detractores (0-6)</h3>
            <p className="text-gray-700">
              Clientes insatisfechos que pueden dañar tu marca.
            </p>
          </div>
          <div className="bg-yellow-100 p-4 rounded-lg">
            <h3 className="font-semibold text-yellow-700">Pasivos (7-8)</h3>
            <p className="text-gray-700">
              Clientes satisfechos pero no entusiastas.
            </p>
          </div>
          <div className="bg-green-100 p-4 rounded-lg">
            <h3 className="font-semibold text-green-700">Promotores (9-10)</h3>
            <p className="text-gray-700">
              Clientes leales que seguirán comprando y recomendándote.
            </p>
          </div>
        </div>
      </section>

      <section className="text-center">
        <h2 className="text-2xl font-bold mb-6 text-blue-600">Comienza Ahora</h2>
        <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
          Mejorar tu servicio nunca fue tan fácil. Crea tu primer formulario de retroalimentación en segundos.
        </p>
        <Link
          href="/create"
          className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          Crear Formulario
        </Link>
      </section>
    </div>
  );
}
