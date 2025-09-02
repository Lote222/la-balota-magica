// src/components/WhatsappFloatingButton.jsx

import React from "react";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

const WhatsappFloatingButton = ({ whatsappNumber }) => {
  // Construimos la URL de WhatsApp con el número que recibimos
  // Puedes añadir un mensaje predeterminado si el cliente lo desea.
  const whatsappUrl = `https://wa.me/${whatsappNumber}`;

  return (
    <Link
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center rounded-full bg-green-500 p-4 shadow-lg transition-all duration-300 ease-in-out hover:w-auto hover:px-6 hover:py-4 group"
      aria-label="Juega YA por WhatsApp"
    >
      <div className="flex items-center gap-2">
        <FaWhatsapp className="h-6 w-6 text-white" />
        <span className="hidden whitespace-nowrap text-white text-sm font-semibold opacity-0 transition-opacity duration-300 group-hover:block group-hover:opacity-100">
          Juega YA
        </span>
      </div>
    </Link>
  );
};

export default WhatsappFloatingButton;