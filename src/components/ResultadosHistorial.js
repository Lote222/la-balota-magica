// components/ResultadosHistorial.js
"use client";

import { motion } from 'framer-motion';

// --- NUEVO: Componente para la balota dorada especial en el historial ---
const BolaDoradaHistorial = ({ numero, index }) => {
  return (
    <motion.div
      // Estilos dorados para destacar, manteniendo el tamaño del historial
      className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-slate-900 font-semibold text-lg ring-1 ring-amber-400/50"
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.8 }} // Animación al entrar en vista
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      {numero}
    </motion.div>
  );
};


const ResultadoFila = ({ sorteo, index }) => {
  const fechaFormateada = new Date(sorteo.fecha_sorteo).toLocaleDateString('es-ES', {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 items-center gap-4 border-b border-slate-700 py-6"
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="text-slate-300 text-center">
        {/* Mostramos el número del sorteo si existe */}
        {sorteo.numero_sorteo && (
          <p className="font-bold text-xl text-amber-400">Sorteo #{sorteo.numero_sorteo}</p>
        )}
        <p className="font-semibold text-lg">{fechaFormateada}</p>
        <p className="text-sm text-slate-400">{sorteo.nombre_loteria}</p>
      </div>
      
      {/* --- INICIO: Lógica para renderizar las balotas con la última dorada --- */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {sorteo.numeros_ganadores.map((numero, idx, array) => {
          const esLaUltima = idx === array.length - 1;

          if (esLaUltima) {
            return <BolaDoradaHistorial key={idx} numero={numero} index={idx} />;
          }
          return (
            <div key={idx} className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-700 text-white font-semibold text-lg">
              {numero}
            </div>
          );
        })}
        {sorteo.serie && (
          <div className="ml-4 rounded-md bg-amber-400 px-4 py-2 text-sm font-bold text-slate-900">
            sorteo: {sorteo.serie}
          </div>
        )}
      </div>
      {/* --- FIN: Lógica para renderizar las balotas con la última dorada --- */}

    </motion.div>
  );
};

const ResultadosHistorial = ({ sorteosAnteriores }) => {
  return (
    <section className="bg-gray-900 py-24 text-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div 
          className="mb-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold">Historial de Sorteos</h2>
          <p className="mt-4 text-lg text-slate-400">Consulta los resultados de los sorteos anteriores.</p>
        </motion.div>

        <div>
          {sorteosAnteriores && sorteosAnteriores.length > 0 ? (
            sorteosAnteriores.map((sorteo, index) => (
              <ResultadoFila key={sorteo.id} sorteo={sorteo} index={index} />
            ))
          ) : (
            <p className="text-center text-slate-400">No hay sorteos anteriores para mostrar.</p>
          )}
        </div>

        {/* --- Bloque de texto legal (SIN CAMBIOS) --- */}
        <motion.div 
          className="mt-16 border-t border-slate-700 pt-8 text-center text-xs text-slate-500"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <p className="mb-2">
            Este sorteo se realiza bajo los lineamientos establecidos en el articulo 142 y 143 de la ley de rifas, juegos y espectáculos. Ley 643 de 2001 – Por la cual se fija el régimen propio del monopolio rentístico de juegos de suerte y azar.
          </p>
          <p>
            Ley 1393 de 2010 – Artículo 5: Regula el uso de los recursos provenientes de los juegos de azar, destinados a financiar el sistema de salud. Normativa adicional del Código de Comercio sobre sorteos y promociones.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ResultadosHistorial;