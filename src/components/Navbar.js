// components/Navbar.js
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import logo from "../../public/BalotaLogo.png";

// --- Hook useMediaQuery y Componente CountdownTimer (Sin cambios) ---
const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    window.addEventListener("resize", listener);
    return () => window.removeEventListener("resize", listener);
  }, [matches, query]);
  return matches;
};

const CountdownTimer = ({ targetDate, targetTime }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(`${targetDate}T${targetTime || "00:00:00"}`) - +new Date();
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
    return <span className="text-lg font-semibold text-blue-700">¡Sorteo en curso!</span>;
  }

  // Vista compacta para el contador en todas las pantallas
  return (
    <div className="flex space-x-3 md:space-x-">
      {timerComponents.map(([unit, value]) => {
        if (unit === 'días' && value === 0) return null; // No mostrar días si es 0
        return (
          <div key={unit} className="text-center">
            <span className="text-xl md:text-2xl font-bold text-blue-700" suppressHydrationWarning={true}>
              {String(value).padStart(2, "0")}
            </span>
            <span className="block text-[10px] md:text-xs uppercase text-slate-600">{unit}</span>
          </div>
        );
      })}
    </div>
  );
};

// --- Componente Principal del Navbar (CON LÓGICA Y LAYOUT ACTUALIZADOS) ---
const Navbar = ({ proximoSorteo, whatsapp }) => {
  const [hidden, setHidden] = useState(false);
  const [lastY, setLastY] = useState(0);
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Lógica de scroll sin cambios
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (isMobile) {
        if (currentY > lastY && currentY > 100) {
          setHidden(true);
        } else {
          setHidden(false);
        }
      } else {
        setHidden(false);
      }
      setLastY(currentY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastY, isMobile]);
  
  // --- NOVEDAD: Construcción del link de WhatsApp ---
  const whatsappLink = whatsapp 
    ? `https://wa.me/${whatsapp}?text=${encodeURIComponent("Quiero jugar")}` 
    : "#";

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg shadow-sm"
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {/* --- CLAVE: Contenedor principal con flex-wrap para reordenamiento --- */}
      <div className="container mx-auto flex flex-wrap items-center justify-between gap-y-2 px-4">
        
        {/* 1. Logo (Siempre a la izquierda) */}
        <div className="order-1">
          <Image
            src={logo}
            alt="La Balota de la Fortuna Logo"
            width={160} // Reducimos un poco el tamaño
            height={40}
            priority
          />
        </div>

        {/* 2. Botón de WhatsApp (Derecha en móvil y desktop) */}
        <div className="order-2 md:order-3">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-full bg-green-500 px-5 py-2 text-sm font-bold text-white shadow-md transition-transform duration-200 hover:scale-105 hover:bg-green-600"
          >
            Juega ¡Ya!
          </a>
        </div>

        {/* 3. Contador (Abajo y centrado en móvil, en medio en desktop) */}
        <div className="order-3 w-full md:order-2 md:w-auto">
          {proximoSorteo ? (
            <div className="flex flex-col items-center">
              <p className="hidden md:block text-xs text-center text-slate-700 -mb-1">
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