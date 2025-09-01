// components/HowToPlaySection.js
"use client";

import { motion } from "framer-motion";

const stepVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const numberBallVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: (i) => ({
    scale: 1,
    opacity: 1,
    transition: {
      delay: i * 0.1,
      type: "spring",
      stiffness: 260,
      damping: 20,
    },
  }),
};

const HowToPlaySection = ({ whatsapp }) => {
  return (
    <section
      id="como-jugar"
      className="bg-gradient-to-br from-gray-100 to-gray-50 py-20 md:py-32 text-slate-800"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.h2
          className="text-center text-4xl md:text-5xl font-extrabold mb-16 text-slate-900"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="bg-gradient-to-r from-blue-600 to-blue-800 text-transparent bg-clip-text">
            JUGAR ES SÚPER FÁCIL
          </span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
          {/* Tarjeta 1: Balotas principales */}
          <motion.div
            className="bg-white rounded-3xl shadow-lg p-8 flex flex-col items-center justify-center text-center border-b-4 border-blue-500"
            variants={stepVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          >
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              {[45, 34, 4, 57, 24].map((num, i) => (
                <motion.div
                  key={i}
                  className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-500 text-white font-bold text-2xl shadow-md ring-4 ring-yellow-400"
                  variants={numberBallVariants}
                  custom={i}
                >
                  {num}
                </motion.div>
              ))}
            </div>
            <h3 className="text-2xl font-bold mb-3 text-slate-800">
              ELIGE TUS NÚMEROS PRINCIPALES
            </h3>
            <p className="text-lg text-slate-600">
              Selecciona 5 números entre el 1 y el 43. Recuerda, ¡no se pueden
              repetir!
            </p>
          </motion.div>

          {/* Tarjeta 2: Superbalota */}
          <motion.div
            className="bg-white rounded-3xl shadow-lg p-8 flex flex-col items-center justify-center text-center border-b-4 border-amber-500"
            variants={stepVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          >
            <div className="flex justify-center mb-6">
              <motion.div
                className="flex items-center justify-center h-24 w-24 rounded-full bg-amber-500 text-slate-900 font-extrabold text-4xl shadow-md ring-4 ring-amber-300"
                variants={numberBallVariants}
                custom={0} // Usamos 0 para el delay de la animación
              >
                19
              </motion.div>
            </div>
            <h3 className="text-2xl font-bold mb-3 text-slate-800">
              SELECCIONA LA SÚPER BALOTA
            </h3>
            <p className="text-lg text-slate-600">
              Elige &quot;número adicional del 1 al 16&quot;. ¡Este puede ser tu
              número de la suerte!
            </p>
          </motion.div>
        </div>

        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <p className="text-xl text-slate-700 font-semibold mb-6">
            ¡Eso es todo! Así de sencillo es participar.
          </p>
          <a
            href={`https://wa.me/${whatsapp?.replace(
              /\D/g,
              ""
            )}?text=Hola,%20estoy%20interesado%20en%20los%2_premios.`}
            className="inline-block rounded-full bg-blue-600 px-12 py-5 text-xl font-bold text-white transition hover:bg-blue-700 transform hover:scale-105 shadow-lg"
            target="_blank"
            rel="noopener noreferrer"
          >
            ¡Juega Ahora y Gana!
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HowToPlaySection;
