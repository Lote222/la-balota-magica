// components/CtaSection.js
"use client";

import { motion } from "framer-motion";

const CtaSection = () => {
  const titleText = "Cada balota tiene una historia.";
  const words = titleText.split(" ");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const wordVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <div className="relative bg-white">
      <section
        // 👇 --- CAMBIOS AQUÍ --- 👇
        className="relative py-24 md:py-32 bg-no-repeat bg-cover bg-center md:bg-contain md:bg-right-top"
        style={{ backgroundImage: "url('/bannerbalotas.jpg')" }}
      >
        {/* Capa semi-oscura solo para móvil, para mejorar contraste */}
        <div className="absolute inset-0 bg-black/10 md:hidden"></div>

        <div className="container mx-auto px-4">
          <div
            className="
            relative z-10 
            bg-white/60 backdrop-blur-md 
            rounded-2xl p-8 
            max-w-xl mx-auto text-center
            shadow-xl
          "
          >
            <motion.h2
              className="text-4xl font-bold text-slate-800 md:text-5xl"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
            >
              {words.map((word, index) => (
                <motion.span
                  key={index}
                  variants={wordVariants}
                  className="inline-block mr-3"
                >
                  {word}
                </motion.span>
              ))}
            </motion.h2>

            <motion.p
              className="mt-4 text-lg text-slate-700 mx-auto max-w-lg"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              La próxima podría ser la tuya. No dejes pasar tu oportunidad de
              cambiarlo todo.
            </motion.p>

            <motion.div
              className="mt-8"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              <a
                href="#seccion-premios"
                className="inline-block rounded-full bg-amber-400 px-10 py-4 text-lg font-bold text-slate-900 transition hover:bg-amber-300 transform hover:scale-105"
              >
                Mira los premios
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CtaSection;
