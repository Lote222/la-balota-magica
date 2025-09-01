// components/HeroSection.js
"use client";

import React from "react";
import { motion } from "framer-motion";
import { Bungee } from "next/font/google";

const bungee = Bungee({
  weight: "400",
  subsets: ["latin"],
});

const FloatingBalota = ({ size, top, left, delay }) => {
  return (
    <motion.div
      className="absolute rounded-full bg-blue-500/10 blur-xl"
      style={{
        width: size,
        height: size,
        top: top,
        left: left,
      }}
      animate={{
        y: ["0%", "5%", "0%"],
      }}
      transition={{
        duration: 8 + delay,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay,
      }}
    />
  );
};

// Componente para la balota azul normal (SIN CAMBIOS)
const BolaSorteo = ({ numero, index }) => {
  return (
    <motion.div
      className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-700 text-white shadow-lg md:h-20 md:w-20"
      initial={{ opacity: 0, y: 50, scale: 0.5 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: [0, -15, 0],
      }}
      transition={{
        default: {
          duration: 0.5,
          type: "spring",
          stiffness: 120,
          delay: 0.8 + index * 0.2,
        },
        y: {
          delay: 3 + index * 0.4,
          duration: 0.7,
          repeat: Infinity,
          repeatType: "reverse",
          repeatDelay: 5,
          ease: "easeOut",
        },
      }}
    >
      <span className="text-2xl font-bold md:text-3xl">{numero}</span>
    </motion.div>
  );
};

// --- AÑADIDO: Componente solo para la balota dorada especial ---
const BolaDorada = ({ numero, index }) => {
  return (
    <motion.div
      className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-slate-900 shadow-xl md:h-20 md:w-20 ring-2 ring-amber-400/50"
      initial={{ opacity: 0, y: 50, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1, y: [0, -25, 0] }} // Un salto un poco más alto
      transition={{
        default: {
          duration: 0.5,
          type: "spring",
          stiffness: 120,
          delay: 0.8 + index * 0.2,
        },
        y: {
          delay: 3 + index * 0.4,
          duration: 0.7,
          repeat: Infinity,
          repeatType: "reverse",
          repeatDelay: 5,
          ease: "easeOut",
        },
      }}
    >
      <span className="text-2xl font-bold md:text-3xl">{numero}</span>
    </motion.div>
  );
};

const HeroSection = ({ ultimoSorteo, premioMayor, whatsapp }) => {
  const formatPrize = (value) => {
    const number = parseInt(value, 10);
    if (isNaN(number)) return "$0";
    const formattedNumber = new Intl.NumberFormat("es-CO").format(number);
    return `$${formattedNumber} Millones`;
  };

  const fechaFormateada = ultimoSorteo
    ? new Date(ultimoSorteo.fecha_sorteo).toLocaleDateString("es-ES", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    // 👇 --- AJUSTE #1: Padding responsivo para el Navbar --- 👇
    <section className="relative flex h-screen min-h-[700px] items-center justify-center overflow-hidden bg-neutral-950 pt-36 md:pt-20 text-slate-800">
      <div className="absolute inset-0 z-0">
        <FloatingBalota size="400px" top="-20%" left="5%" delay={0} />
        <FloatingBalota size="300px" top="10%" left="60%" delay={2} />
        <FloatingBalota size="250px" top="60%" left="80%" delay={4} />
        <FloatingBalota size="200px" top="70%" left="10%" delay={1} />
        <FloatingBalota size="150px" top="40%" left="30%" delay={3} />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2
              className="text-4xl font-semibold uppercase tracking-wider text-blue-100 md:text-5xl"
              style={{ fontFamily: '"Arial Black", "Impact", sans-serif' }}
            >
              Premio Mayor
            </h2>
            <p
              className={`mt-2 text-7xl font-extrabold tracking-tight md:text-8xl ${bungee.className} animate-shimmering-gold`}
            >
              {formatPrize(premioMayor)}
            </p>
            {ultimoSorteo && (
              <p className="mt-4 text-lg text-gray-100">
                Resultados del sorteo del {fechaFormateada}
              </p>
            )}
          </motion.div>

          {/* 👇 --- AJUSTE #2: Lógica para la balota dorada --- 👇 */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            {ultimoSorteo?.numeros_ganadores?.map((numero, index, array) => {
              const esLaUltima = index === array.length - 1;

              if (esLaUltima) {
                return <BolaDorada key={index} numero={numero} index={index} />;
              }

              return <BolaSorteo key={index} numero={numero} index={index} />;
            })}
          </div>

          {ultimoSorteo?.serie && (
            <motion.div
              className="mt-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 1 }}
            >
              <span className="rounded-full bg-blue-100 px-6 py-3 text-2xl font-medium text-blue-800">
                sorteo:{" "}
                <span className="font-bold text-blue-900">
                  {ultimoSorteo.serie}
                </span>
              </span>
            </motion.div>
          )}
          <motion.div
            className="mt-18"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <a
              href={`https://wa.me/${whatsapp?.replace(
                /\D/g,
                ""
              )}?text=Hola,%20estoy%20interesado%20en%20los%2_premios.`}
              className="inline-block rounded-full bg-amber-400 px-10 py-4 text-lg font-bold text-slate-900 transition hover:bg-amber-300 transform hover:scale-105"
              target="_blank"
              rel="noopener noreferrer"
            >
              Participar en el sorteo
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
