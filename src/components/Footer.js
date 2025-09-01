// components/Footer.js
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import logoColjuegos from '../../public/logoCol.png'; // Importamos el logo

const Footer = ({ siteConfig }) => {
  return (
    <motion.footer 
      className="bg-gray-900 text-slate-400 py-12 border-t border-slate-700"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
    >
      <div className="container mx-auto px-4 text-center">
        
        {/* Sección del logo de Coljuegos y texto legal */}
        <div className="flex flex-col items-center mb-8">
          <Image 
            src={logoColjuegos}
            alt="Coljuegos Logo"
            width={180} // Ajusta el tamaño según sea necesario
            height={40}
            className="mb-4"
          />
          <p className="max-w-3xl mx-auto text-xs text-slate-500">
            Este sorteo se realiza bajo los lineamientos establecidos en el articulo 142 y 143 de la ley de rifas, juegos y espectáculos. Ley 643 de 2001 – Por la cual se fija el régimen propio del monopolio rentístico de juegos de suerte y azar. Ley 1393 de 2010 – Artículo 5: Regula el uso de los recursos provenientes de los juegos de azar, destinados a financiar el sistema de salud. Normativa adicional del Código de Comercio sobre sorteos y promociones.
          </p>
        </div>

        {/* Separador */}
        <div className="w-24 h-px bg-slate-700 mx-auto mb-8"></div>

        {/* Enlaces y Correo de Soporte */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-8">
          <Link href="/terminos" className="hover:text-amber-400 transition-colors">
            Términos y Condiciones
          </Link>
          <Link href="/politicas" className="hover:text-amber-400 transition-colors">
            Políticas de Privacidad
          </Link>
          {/* Mostramos el email de soporte si existe */}
          {siteConfig?.email_contact && (
            <a href={`mailto:${siteConfig.email_contact}`} className="hover:text-amber-400 transition-colors">
              Soporte: {siteConfig.email_contact}
            </a>
          )}
        </div>

        {/* Copyright */}
        <p className="text-sm">
          &copy; {new Date().getFullYear()} La Balota de la Fortuna. Todos los derechos reservados.
        </p>

      </div>
    </motion.footer>
  );
};

export default Footer;