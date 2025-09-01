// app/terminos/page.js
import LegalPageLayout from '@/components/LegalPageLayout';

const TerminosPage = () => {
  return (
    <LegalPageLayout title="Términos y Condiciones">
      <p className="text-sm text-gray-500">Última actualización: 1 de septiembre de 2025</p>
      
      <h2>1. Aceptación de los Términos</h2>
      <p>
        Al participar en los sorteos de &quot;La Balota de la Fortuna&quot;, usted acepta y se compromete a cumplir los presentes términos y condiciones, así como la normativa vigente en Colombia para juegos de suerte y azar, supervisada por Coljuegos. La participación está estrictamente prohibida para menores de 18 años.
      </p>

      <h2>2. Mecánica del Sorteo</h2>
      <p>
        &quot;La Balota de la Fortuna&quot; es un juego de lotería en el que el participante elige una combinación de números con la expectativa de acertar el resultado de un sorteo futuro. Las reglas específicas de selección de números y los planes de premios se detallan en la sección &quot;Premios&quot; de nuestro sitio principal.
      </p>
      
      <h2>3. Regulación y Legalidad</h2>
      <p>
        Este sorteo opera bajo la licencia y supervisión de Coljuegos, de acuerdo con la Ley 643 de 2001 y la Ley 1393 de 2010, que fijan el régimen propio del monopolio rentístico de juegos de suerte y azar y regulan el uso de sus recursos para la financiación del sistema de salud en Colombia.
      </p>

      <h2>4. Cobro de Premios</h2>
      <p>
        Los ganadores serán notificados a través de los canales oficiales. Los premios deben ser reclamados dentro de los plazos establecidos por la ley, presentando la documentación requerida. Los premios mayores pueden estar sujetos a retenciones fiscales según la normativa tributaria vigente.
      </p>

      <h2>5. Modificaciones y Cancelación</h2>
      <p>
        &quot;La Balota de la Fortuna&quot; se reserva el derecho de modificar los términos y condiciones o cancelar cualquier sorteo por motivos de fuerza mayor o según lo disponga la entidad reguladora. Cualquier cambio será comunicado públicamente a través de este sitio web.
      </p>
    </LegalPageLayout>
  );
};

export default TerminosPage;