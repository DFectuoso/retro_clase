import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with modern design */}
      <section className="bg-gradient-to-r from-[#0F2642] to-[#1A3A5F] text-white py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
              RetroFeedback
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-[#F2ECDF] leading-relaxed">
              Obtén retroalimentación valiosa de tus clases, cursos o eventos con nuestro sistema de Net Promoter Score (NPS)
            </p>
            <Link
              href="/create"
              className="inline-block px-8 py-4 bg-[#E3562A] text-white font-medium rounded-lg hover:bg-[#CD4A23] transition-all duration-300 shadow-lg transform hover:scale-105"
            >
              Crear Formulario de Feedback
            </Link>
          </div>
        </div>
      </section>

      {/* Features section with card design */}
      <section className="py-20 bg-[#F2ECDF] dark:bg-gray-900 relative">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-[#0F2642] dark:text-white mb-16">Potencia tu crecimiento con feedback de calidad</h2>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border-t-4 border-[#CC3B36] transform transition-all duration-300 hover:-translate-y-2">
              <div className="bg-[#CC3B36]/10 dark:bg-[#CC3B36]/20 p-4 inline-block rounded-full mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#CC3B36]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-[#0F2642] dark:text-white">Crea Formularios</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Crea formularios personalizados con tu nombre y descripción para obtener retroalimentación específica para cada clase o evento.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border-t-4 border-[#E3562A] transform transition-all duration-300 hover:-translate-y-2">
              <div className="bg-[#E3562A]/10 dark:bg-[#E3562A]/20 p-4 inline-block rounded-full mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#E3562A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-[#0F2642] dark:text-white">Comparte Enlaces</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Comparte un enlace único con tus participantes para recopilar sus comentarios de manera anónima y sencilla.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border-t-4 border-[#F2B544] transform transition-all duration-300 hover:-translate-y-2">
              <div className="bg-[#F2B544]/10 dark:bg-[#F2B544]/20 p-4 inline-block rounded-full mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#F2B544]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-[#0F2642] dark:text-white">Analiza Resultados</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Revisa estadísticas detalladas, puntuaciones NPS y comentarios para mejorar continuamente tus servicios.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* NPS Explanation section */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-6">
          <div className="bg-[#0F2642] text-white rounded-2xl shadow-xl overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2 p-12">
                <h2 className="text-3xl font-bold mb-6">¿Qué es el Net Promoter Score?</h2>
                <p className="mb-4 text-[#F2ECDF]/90">
                  El NPS es una métrica utilizada para medir la lealtad y satisfacción del cliente. Se basa en una sola pregunta:
                  &ldquo;¿Qué tan probable es que recomiendes este servicio a un amigo o familiar?&rdquo;
                </p>
                <p className="mb-6 text-[#F2ECDF]/90">
                  Los clientes responden en una escala del 0 al 10 y se clasifican como:
                </p>
              </div>
              <div className="md:w-1/2 bg-[#0F2642] p-12">
                <div className="space-y-4">
                  <div className="bg-[#CC3B36]/20 p-4 rounded-lg border-l-4 border-[#CC3B36]">
                    <h3 className="font-semibold text-[#F2ECDF]">Detractores (0-6)</h3>
                    <p className="text-[#F2ECDF]/80">
                      Clientes insatisfechos que pueden dañar tu marca.
                    </p>
                  </div>
                  <div className="bg-[#F2B544]/20 p-4 rounded-lg border-l-4 border-[#F2B544]">
                    <h3 className="font-semibold text-[#F2ECDF]">Pasivos (7-8)</h3>
                    <p className="text-[#F2ECDF]/80">
                      Clientes satisfechos pero no entusiastas.
                    </p>
                  </div>
                  <div className="bg-[#7CC470]/20 p-4 rounded-lg border-l-4 border-[#7CC470]">
                    <h3 className="font-semibold text-[#F2ECDF]">Promotores (9-10)</h3>
                    <p className="text-[#F2ECDF]/80">
                      Clientes leales que seguirán comprando y recomendándote.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#E3562A] to-[#CC3B36] text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Comienza Ahora</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto text-white/90">
            Mejorar tu servicio nunca fue tan fácil. Crea tu primer formulario de retroalimentación en segundos.
          </p>
          <Link
            href="/create"
            className="inline-block px-8 py-4 bg-white text-[#CC3B36] font-medium rounded-lg hover:bg-[#F2ECDF] transition-all duration-300 shadow-lg transform hover:scale-105"
          >
            Crear Formulario
          </Link>
        </div>
      </section>
    </div>
  );
}
