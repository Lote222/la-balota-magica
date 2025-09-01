// components/Navbar.js
"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Componente para el contador
const CountdownTimer = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        días: Math.floor(difference / (1000 * 60 * 60 * 24)),
        horas: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutos: Math.floor((difference / 1000 / 60) % 60),
        segundos: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  });

  return (
    <div className="flex space-x-4">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className="text-center">
          <span className="text-2xl font-bold text-amber-400">{String(value).padStart(2, '0')}</span>
          <span className="block text-xs uppercase text-slate-400">{unit}</span>
        </div>
      ))}
    </div>
  );
};

// Componente principal del Navbar
const Navbar = ({ proximoSorteo }) => {
  return (
    <motion.nav 
      className="fixed top-0 left-0 right-0 z-50 bg-slate-900/50 backdrop-blur-md"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <div className="text-2xl font-bold text-white">
          La Balota <span className="text-amber-400">Mágica</span>
        </div>
        <div>
          {proximoSorteo ? (
            <div>
              <p className="text-sm text-center text-slate-300 mb-1">Próximo Sorteo en:</p>
              <CountdownTimer targetDate={proximoSorteo.fecha_sorteo} />
            </div>
          ) : (
            <p className="text-slate-300">¡Sorteo hoy!</p>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;