// app/page.js
import { createClient } from '@/lib/supabase/server';
import Navbar from '@/components/Navbar'; // Crearemos este componente
import HeroSection from '@/components/HeroSection'; // Crearemos este componente

// Función para obtener todos los datos de la página de una vez
async function getPageData() {
  const supabase = createClient();
  const today = new Date().toISOString().split('T')[0];

  // Hacemos todas las consultas en paralelo para máxima eficiencia
  const [sorteosResult, configResult, premiosResult] = await Promise.all([
    supabase.from('resultados_sorteos').select('*').order('fecha_sorteo', { ascending: false }),
    supabase.from('site_configurations').select('key, value').eq('website_id', 'd779ec0b-f302-45ba-a165-6f7c95d7d60f'), // REEMPLAZAR CON EL ID DE TU SITIO
    supabase.from('premios').select('*').order('orden', { ascending: true })
  ]);

  // Procesamos los datos
  const sorteos = sorteosResult.data || [];
  const config = (configResult.data || []).reduce((acc, item) => {
    acc[item.key] = item.value;
    return acc;
  }, {});
  const premios = premiosResult.data || [];
  
  // Lógica para encontrar el último sorteo pasado y el próximo sorteo futuro
  const ultimoSorteo = sorteos.find(s => s.fecha_sorteo <= today);
  const proximoSorteo = sorteos.find(s => s.fecha_sorteo > today);

  return {
    ultimoSorteo,
    proximoSorteo,
    config,
    premios
  };
}

export default async function HomePage() {
  const { ultimoSorteo, proximoSorteo, config } = await getPageData();

  return (
    <div className="bg-slate-900">
      <Navbar proximoSorteo={proximoSorteo} />
      <HeroSection ultimoSorteo={ultimoSorteo} premioMayor={config.premio_mayor_actual} />
      
      {/* Aquí irán las otras secciones que construiremos después */}
      {/* <ResultadosHistorial /> */}
      {/* <SeccionPremios /> */}
      {/* ... etc ... */}
    </div>
  );
}