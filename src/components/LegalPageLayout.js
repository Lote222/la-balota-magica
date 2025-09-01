// components/LegalPageLayout.js
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import logo from '../../public/BalotaLogo.png'; // Asegúrate que esta ruta a tu logo sea correcta

const LegalPageLayout = ({ title, children }) => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-300 font-sans">
      <header className="bg-gray-800/50 backdrop-blur-md shadow-lg sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/">
            <Image 
              src={logo}
              alt="La Balota de la Fortuna Logo"
              width={180}
              height={45}
              priority
            />
          </Link>
          <Link href="/" className="text-sm text-gray-400 hover:text-amber-400 transition-colors">
            &larr; Volver al inicio
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 md:py-16">
        <motion.div 
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 border-b border-gray-700 pb-4">
            {title}
          </h1>
          {/* Estilos para el contenido que viene de las páginas */}
          <div className="prose prose-invert prose-lg max-w-none prose-h2:text-2xl prose-h2:text-amber-400 prose-a:text-blue-400 hover:prose-a:text-blue-300">
            {children}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default LegalPageLayout;