// components/Navbar.js
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import logo from "../../public/BalotaLogo.png";

// --- Hook para detectar el tamaño de la pantalla (sin cambios) ---
const useMediaQuery = (query) => {
  // ... (este código se mantiene igual que en la versión anterior)
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => {
      setMatches(media.matches);
    };
    window.addEventListener("resize", listener);
    return () => window.removeEventListener("resize", listener);
  }, [matches, query]);

  return matches;
};

// --- Componente del Contador (sin cambios) ---
const CountdownTimer = ({ targetDate, targetTime }) => {
  // ... (este código se mantiene igual que en la versión anterior)
  const isMobile = useMediaQuery("(max-width: 768px)");

  const calculateTimeLeft = () => {
    const targetDateTime = new Date(
      `${targetDate}T${targetTime || "00:00:00"}`
    );
    const difference = +targetDateTime - +new Date();
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
    const timer = setTimeout(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearTimeout(timer);
  });

  const timerComponents = Object.entries(timeLeft);

  if (!timerComponents.length) {
    return (
      <span className="text-lg font-semibold text-blue-700">
        ¡Sorteo en curso!
      </span>
    );
  }

  if (isMobile && timeLeft.días > 0) {
    return (
      <div className="text-center">
        <span className="text-xl font-bold text-blue-700">
          {timeLeft.días}d {timeLeft.horas}h
        </span>
        <span className="block text-xs uppercase text-slate-600">
          para el sorteo
        </span>
      </div>
    );
  }

  return (
    <div className="flex space-x-2 md:space-x-4">
      {timerComponents.map(([unit, value]) => (
        <div key={unit} className="text-center">
          <span
            className="text-xl md:text-2xl font-bold text-blue-700"
            suppressHydrationWarning={true}
          >
            {String(value).padStart(2, "0")}
          </span>
          <span className="block text-xs uppercase text-slate-600">{unit}</span>
        </div>
      ))}
    </div>
  );
};

// --- Componente Principal del Navbar (CON LA NUEVA LÓGICA DE SCROLL) ---
const Navbar = ({ proximoSorteo }) => {
  const [hidden, setHidden] = useState(false);
  const [lastY, setLastY] = useState(0);
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;

      // Solo aplicamos el efecto en móvil
      if (isMobile) {
        // Si hacemos scroll hacia abajo y hemos bajado más de 100px, se oculta
        if (currentY > lastY && currentY > 100) {
          setHidden(true);
        }
        // Si hacemos scroll hacia arriba, se muestra
        else {
          setHidden(false);
        }
      } else {
        // En escritorio, siempre está visible
        setHidden(false);
      }

      setLastY(currentY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Limpiamos el listener al desmontar el componente
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastY, isMobile]);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-md shadow-sm"
      // La animación ahora depende del estado 'hidden'
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4 py-2">
        <div className="flex items-center">
          <Image
            src={logo}
            alt="La Balota de la Fortuna Logo"
            width={200}
            height={50}
            priority
          />
        </div>
        <div className="mt-2 md:mt-0">
          {proximoSorteo ? (
            <div>
              <p className="hidden md:block text-xs text-center text-slate-700 mb-1">
                Próximo Sorteo en:
              </p>
              <CountdownTimer
                targetDate={proximoSorteo.fecha_sorteo}
                targetTime={proximoSorteo.hora_sorteo}
              />
            </div>
          ) : (
            <p className="font-semibold text-slate-700">¡Mucha suerte!</p>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
