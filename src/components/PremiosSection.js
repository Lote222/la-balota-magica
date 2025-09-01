// components/PremiosSection.js
"use client";

import { motion } from 'framer-motion';

// --- Sub-componente para la visualización de aciertos ---
const AciertoVisual = ({ aciertos, balota = false }) => {
  const circulos = [];
  for (let i = 0; i < 5; i++) {
    circulos.push(
      <div 
        key={i} 
        className={`h-5 w-5 rounded-full ${i < aciertos ? 'bg-slate-300' : 'bg-slate-700'}`}
      ></div>
    );
  }
  if (balota) {
    circulos.push(<span key="plus" className="text-slate-500 mx-1">+</span>);
    circulos.push(
      <div key="balota" className="h-5 w-5 rounded-full bg-amber-400"></div>
    );
  }
  return <div className="flex items-center gap-1">{circulos}</div>;
};


// --- Componente principal de la sección de Premios ---
const PremiosSection = ({ premios }) => {
  // Función para interpretar el título y generar la visualización
  const parseTitulo = (titulo) => {
    const aciertos = parseInt(titulo.charAt(0));
    const balota = titulo.toLowerCase().includes('balota');
    return <AciertoVisual aciertos={aciertos} balota={balota} />;
  };

  return (
    <section id="seccion-premios" className="bg-gray-900 py-24 text-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div 
          className="mb-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold">Plan de Premios</h2>
          <p className="mt-4 text-lg text-slate-400">Descubre todas las formas de ganar con La Balota de la Fortuna.</p>
        </motion.div>

        <div className="overflow-hidden rounded-lg bg-slate-800 shadow-lg">
          {/* Cabecera de la tabla */}
          <div className="grid grid-cols-2 bg-slate-700 px-6 py-4 font-semibold">
            <div className="text-left text-sm uppercase tracking-wider text-slate-300">Aciertos</div>
            <div className="text-right text-sm uppercase tracking-wider text-slate-300">Premio</div>
          </div>

          {/* Filas de premios */}
          {premios && premios.map((premio, index) => (
            <motion.div 
              key={premio.id}
              className="grid grid-cols-2 items-center border-t border-slate-700 px-6 py-5"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex flex-col text-left">
                {parseTitulo(premio.titulo_acierto)}
                <span className="mt-1 text-xs text-slate-400">{premio.titulo_acierto}</span>
              </div>
              <div className="text-right font-bold text-lg text-amber-400">
                {premio.descripcion_premio}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PremiosSection;