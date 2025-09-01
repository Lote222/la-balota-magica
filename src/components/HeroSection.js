// components/HeroSection.js
"use client";

import React from 'react';
import { motion } from 'framer-motion';

// Componente para una sola balota de lotería
const BolaSorteo = ({ numero, delay }) => {
  return (
    <motion.div
      className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-lg md:h-20 md:w-20"
      initial={{ opacity: 0, y: 50, scale: 0.5 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: delay, duration: 0.5, type: 'spring', stiffness: 120 }}
    >
      <span className="text-2xl font-bold text-slate-800 md:text-3xl">{numero}</span>
    </motion.div>
  );
};

// Componente principal de la sección Hero
const HeroSection = ({ ultimoSorteo, premioMayor }) => {
  if (!ultimoSorteo) {
    return (
      <div className="flex h-screen items-center justify-center text-white">
        <p>Cargando resultados...</p>
      </div>
    );
  }

  const fechaFormateada = new Date(ultimoSorteo.fecha_sorteo).toLocaleDateString('es-ES', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <section className="relative flex h-screen min-h-[700px] items-center justify-center overflow-hidden pt-20 text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-slate-900"></div>
      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
            <h1 className="text-5xl font-extrabold tracking-tight md:text-7xl">
              Premio Mayor: <span className="text-amber-400">{premioMayor || '$0'}</span>
            </h1>
            <p className="mt-4 text-lg text-slate-300">Resultados del sorteo del {fechaFormateada}</p>
          </motion.div>

          <div className="mt-12 flex flex-wrap justify-center gap-4">
            {ultimoSorteo.resultados.map((numero, index) => (
              <BolaSorteo key={index} numero={numero} delay={0.8 + index * 0.2} />
            ))}
          </div>

          {ultimoSorteo.serie && (
            <motion.div className="mt-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 1 }}>
              <span className="rounded-full bg-slate-700 px-6 py-3 text-2xl font-medium">
                Serie: <span className="font-bold text-amber-400">{ultimoSorteo.serie}</span>
              </span>
            </motion.div>
          )}

        </div>
      </div>
    </section>
  );
};

export default HeroSection;