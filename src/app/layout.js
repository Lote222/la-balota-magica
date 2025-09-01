// app/layout.js
import { Inter } from 'next/font/google';
import './globals.css';

// Configuración de la fuente de Google Fonts
const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'La Balota Mágica',
  description: 'Consulta los resultados del sorteo y mantente al día.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}