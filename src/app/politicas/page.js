// app/politicas-de-privacidad/page.js
import LegalPageLayout from '@/components/LegalPageLayout';

const PoliticasPage = () => {
  return (
    <LegalPageLayout title="Política de Tratamiento de Datos">
      <p className="text-sm text-gray-500">Conforme a la Ley 1581 de 2012 de Colombia.</p>

      <h2>1. Responsable del Tratamiento</h2>
      <p>
        &quot;La Balota de la Fortuna&quot; (en adelante, &quot;la Empresa&quot;), con domicilio en [Ciudad, Departamento], es responsable del tratamiento de los datos personales de sus usuarios y clientes.
      </p>

      <h2>2. Finalidad de la Recolección de Datos</h2>
      <p>
        Los datos personales que recolectamos (nombre, documento de identidad, correo electrónico, etc.) tienen como finalidad:
      </p>
      <ul>
        <li>Validar la identidad y la mayoría de edad del participante.</li>
        <li>Notificar a los ganadores de los premios.</li>
        <li>Realizar el proceso de pago de premios.</li>
        <li>Enviar comunicaciones sobre próximos sorteos, promociones y noticias relevantes, siempre con su consentimiento previo.</li>
        <li>Cumplir con los requerimientos de información de Coljuegos y otras entidades regulatorias.</li>
      </ul>

      <h2>3. Derechos del Titular de los Datos</h2>
      <p>
        Como titular de sus datos personales, usted tiene derecho a:
      </p>
      <ul>
        <li>**Conocer, actualizar y rectificar** sus datos personales.</li>
        <li>Solicitar prueba de la autorización otorgada para su tratamiento.</li>
        <li>Ser informado sobre el uso que se le ha dado a sus datos.</li>
        <li>Presentar quejas ante la Superintendencia de Industria y Comercio por infracciones a la ley.</li>
        <li>Revocar la autorización y/o solicitar la supresión de sus datos.</li>
      </ul>
      
      <h2>4. Seguridad de la Información</h2>
      <p>
        La Empresa ha implementado medidas técnicas, humanas y administrativas para proteger sus datos personales, evitando su adulteración, pérdida, consulta o acceso no autorizado.
      </p>
    </LegalPageLayout>
  );
};

export default PoliticasPage;