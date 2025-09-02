// app/page.js
import { createClient } from "@/lib/supabase/server";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CtaSection from "@/components/CtaSection";
import ResultadosHistorial from "@/components/ResultadosHistorial";
import HowToPlaySection from "@/components/HowToPlaySection";
import PremiosSection from "@/components/PremiosSection";
import Footer from "@/components/Footer";
import WhatsappFloatingButton from "@/components/WhatsappFloatingButton";
  
async function getPageData() {
  const supabase = createClient();
  
  // SOLUCIÓN: Creamos un objeto de fecha y hora local para Colombia.
  const now = new Date(
    new Date().toLocaleString("en-US", { timeZone: "America/Bogota" })
  );

  // 1. OPTIMIZACIÓN: Pedimos solo los últimos 11 sorteos para ser eficientes.
  const { data: sorteos, error: sorteosError } = await supabase
    .from("resultados_sorteos")
    .select("*")
    .order("fecha_sorteo", { ascending: false })
    .order("hora_sorteo", { ascending: false })
    .limit(11);

  if (sorteosError) {
    console.error("Error obteniendo sorteos:", sorteosError);
  }

  // 2. Obtenemos la configuración del sitio (premio mayor)
  const { data: configData } = await supabase
    .from("site_configurations")
    .select("key, value")
    .eq("website_id", "d779ec0b-f302-45ba-a165-677c95a7d607");

  const config = (configData || []).reduce((acc, item) => {
    acc[item.key] = item.value;
    return acc;
  }, {});

  // 3. Lógica para separar sorteos pasados y futuros (esta no cambia)
  const sorteosPasados = (sorteos || []).filter(
    (s) => new Date(`${s.fecha_sorteo}T${s.hora_sorteo || "00:00:00"}`) <= now
  );
  const sorteosFuturos = (sorteos || []).filter(
    (s) => new Date(`${s.fecha_sorteo}T${s.hora_sorteo || "00:00:00"}`) > now
  );

  const ultimoSorteo = sorteosPasados.length > 0 ? sorteosPasados[0] : null;
  const proximoSorteo =
    sorteosFuturos.length > 0
      ? sorteosFuturos[sorteosFuturos.length - 1]
      : null;

  // 4. LÓGICA CORREGIDA: Tomamos los siguientes 10 de la lista de pasados para el historial.
  const sorteosAnteriores = sorteosPasados.slice(1, 11);

  const { data: premios, error: premiosError } = await supabase
    .from("premios")
    .select("*")
    .order('orden', { ascending: true });
  if (premiosError) {
    console.error("Error obteniendo los premios:", premiosError);
  }

  return { ultimoSorteo, proximoSorteo, config, sorteosAnteriores, premios };
}

export default async function HomePage() {
  const { ultimoSorteo, proximoSorteo, config, sorteosAnteriores, premios } =
    await getPageData();

  return (
    // He vuelto a poner el fondo oscuro como acordamos
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Navbar proximoSorteo={proximoSorteo} whatsapp={config.whatsapp_number} />
      <HeroSection
        ultimoSorteo={ultimoSorteo}
        premioMayor={config.premio_mayor_actual}
        whatsapp={config.whatsapp_number}
      />
      <CtaSection />
      <ResultadosHistorial sorteosAnteriores={sorteosAnteriores} />
      <HowToPlaySection whatsapp={config.whatsapp_number} />
      <PremiosSection premios={premios} />
      <Footer siteConfig={config} />
       <WhatsappFloatingButton whatsappNumber={config.whatsapp_number} />
    </div>
  );
}
