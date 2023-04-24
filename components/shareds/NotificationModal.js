import { styled, keyframes, css } from "@mui/system";
import SnackbarUnstyled from "@mui/base/SnackbarUnstyled";
import React, { useState } from "react";

const blue = {
  50: "#F0F7FF",
  400: "#3399FF",
  600: "#0072E5",
  900: "#003A75",
};

const grey = {
  200: "#E0E3E7",
};

const snackbarInRight = keyframes`
  from {
    transform: translateX(100%);
  }

  to {
    transform: translateX(0);
  }
`;

const StyledSnackbar = styled(SnackbarUnstyled)(
  ({ theme }) => css`
    position: fixed;
    z-index: 5500;
    display: flex;
    right: 16px;
    bottom: 16px;
    left: auto;
    justify-content: start;
    max-width: 560px;
    min-width: 300px;
    background-color: ${theme.palette.mode === "dark" ? blue[900] : blue[50]};
    border-radius: 8px;
    border: 1px solid ${theme.palette.mode === "dark" ? blue[600] : blue[400]};
    box-shadow: ${theme.palette.mode === "dark"
      ? `0 5px 13px -3px rgba(0,0,0,0.4)`
      : `0 5px 13px -3px ${grey[200]}`};
    padding: 0.75rem;
    color: ${theme.palette.mode === "dark" ? "#fff" : blue[900]};
    font-family: <b>IBM </b>Plex Sans, sans-serif;
    font-weight: 600;
    animation: ${snackbarInRight} 500ms;
    transition: transform 0.2s ease-out;
  `
);

export function NotificationModal({ isOpen, handleClose }) {
  return (
    <React.Fragment>
      <StyledSnackbar
        open={isOpen}
        autoHideDuration={5000}
        onClose={handleClose}
      >
        Información enviada!
      </StyledSnackbar>
    </React.Fragment>
  );
}

export function NotificationModal2({ handleClose }) {
  return (
    <React.Fragment>
      <>
        <div
          className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
        >
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                <h3 className="text-3xl text-slate-500">
                  Términos y condiciones
                </h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={handleClose}
                >
                  <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                    ×
                  </span>
                </button>
              </div>
              
              <div style={{height: 600}}  className="mx-4 overscroll-contain overflow-auto h-auto shadow-xl p-8 space-y-4 text-slate-700 dark:text-slate-400 text-sm sm:text-base leading-6 sm:leading-7"> 
                <div className="relative flex-auto overscroll-contain">
                  <p className="text-justify my-4 text-slate-500 text-lg leading-relaxed space-y-4">
                    <p>
                    Agradecemos su visita al considerarnos como sus posibles asesores médico - jurídicos  en No biopolímeros en Colombia .
                    </p>
                    <p>  
                    Por favor, lea los <b>TÉRMINOS Y CONDICIONES </b>de uso  antes de navegar por el <b>SITIO.</b> El acceso y uso del <b>SITIO </b>indica que usted aceptó y cumplirá los <b>TÉRMINOS Y CONDICIONES </b>sobre la forma en que puede acceder y usarlo.
                    </p>
                    <p>  
                    La política de privacidad del <b>SITIO </b>hace parte integral de estos <b>TÉRMINOS Y CONDICIONES.</b> Por lo tanto, siempre que se haga referencia a este texto, se hará también alusión a la <b>POLÍTICA DE PRIVACIDAD </b>.
                    </p>

                    <p><b class="font-bold">1. </b>No biopolímeros abogados y médicos: Este <b>SITIO </b>es operado por No biopolímeros abogados y médicos , dedicados a la prestación de servicios legales en Colombia en asuntos relacionados con derecho médico, y responsabilidad civil contractual , extracontractual y del estado . Este <b>SITIO </b>contiene información general sobre la firma No biopolímeros abogados y médicos. En el <b>SITIO </b>la firma No biopolímeros abogados y médicos presta su servicio exclusivamente  de manera personal y directa con sus profesionales encargados la asesoría Médica – Legal y únicamente en lo relacionado con la responsabilidad civil extracontractual,  análisis de la praxis médica y defensa legal de los profesionales médicos. Los materiales, contenidos, opiniones e información en el <b>SITIO </b>tienen un propósito únicamente informativo. La dirección de contacto de No biopolímeros abogados y médicos es mundolegalabogados@gmail.com . </p>

                    <p><b class="font-bold">2. </b>Requisito de edad: En  caso de ser menor de edad, se recomienda a padres y tutores de los menores de edad supervisar el acceso de sus hijos al <b>SITIO.</b></p>

                    <p><b class="font-bold">3. </b>Acuerdos de uso del SITIO: Al ingresar usted  acepta  cumplir los <b>TÉRMINOS Y CONDICIONES.</b> Si  está  desacuerdo con los <b>TÉRMINOS Y CONDICIONES,</b> absténgase de ingresar al <b>SITIO </b>y de hacer uso de los contenidos. su derecho de acceder e ingresar al <b>SITIO </b>podrá ser cancelado en cualquier momento por No biopolímeros abogados y médicos  sin notificación previa o justificación alguna en aras de proteger los derechos corporativos y confidencialidad que emana de su función esto es prestar asesoría médico legal referente a la praxis médica .</p>

                    <p><b class="font-bold">4. </b>Transmisión electrónica de información: Si usted decide contactar a No biopolímeros abogados y médicos a través de este <b>SITIO,</b> por favor, tenga en cuenta que la transmisión electrónica de información a través de redes globales, social media, no es totalmente segura y, por lo tanto, no existe garantía sobre la reserva, confidencialidad o seguridad de su información. Si usted es cliente o no de No biopolímeros abogados y médicos , le agradecemos abstenerse de transmitir información que esté sujeta a reserva, confidencialidad o secreto de cualquier tipo, dado que  No biopolímeros abogados y médicos no puede garantizar la reserva, confidencialidad o secreto de su información. Igualmente, no garantizamos que la información sea tratada bajo secreto profesional entre abogado y cliente. Finalmente No biopolímeros abogados y médicos,  tampoco puede asegurar la integridad o devolución de la información que usted envíe a través del <b>SITIO.</b> Por favor, absténgase de compartir su información personal, secreta, confidencial o reservada a través de medios electrónicos o físicos, a menos que No biopolímeros abogados y médicos haya dado su autorización expresamente por escrito. Asimismo, evite enviar a No biopolímeros abogados y médicos, información no solicitada, cadenas de correo, o cualquier otro tipo de comunicación que pueda ser considerada spam. Incurrir en lo anterior violaría los <b>TÉRMINOS Y CONDICIONES.</b></p>

                    <p><b class="font-bold">5. </b>No biopolímeros abogados y médicos, no presta servicios legales a través del <b>SITIO.</b> La información y materiales no han sido elaborados con la intención de ser interpretados como una opinión legal, recomendación o asesoría jurídica de ningún tipo. El acceso y uso del <b>SITIO,</b> así como la información que contiene y su utilización, no implican la creación de una relación abogado-cliente o cualquier otro tipo de vínculo sin que se haya establecido la respectiva formalidad a aceptación expresa o tácita de los profesionales, su información será revisada por los profesionales pero en ningún momento esto significa que se llevarà a cabo proceso extrajudicial o judicial alguno, advirtiendo que por tratarse de información sensible que requiere confidencialidad entre profesional y cliente previo consentimiento de su titular que se entiende con la remisión al canal autorizado por  No biopolímeros abogados y médicos dicha información será tratada única y exclusivamente para revisar la praxis médica desarrollada en un procedimiento mèdico estético o terapéutico para llevar a cabo eventual proceso judicial  en caso de asentirse en su trámite por el  abogado previamente informado por escrito al usuario del servicio . </p>

                    <p><b class="font-bold">6. </b>No biopolímeros abogados y médicos, En caso de requerir asesoría jurídica o médica, No biopolímeros abogados y médicos recomienda consultar de manera directa y personal con los profesionales abogados y médicos encargados para atender su caso en ningún momento se realizará cobros anticipados por asesorías, ni por brindar un diagnóstico. Por favor, tenga en cuenta que la información de este <b>SITIO </b>no es exhaustiva.</p>

                    <p><b class="font-bold">7. </b>Estos <b>TÉRMINOS Y CONDICIONES </b>pueden sufrir modificaciones. No biopolímeros abogados y médicos se reserva el derecho de modificar, cambiar o terminar estos <b>TÉRMINOS Y CONDICIONES </b>en cualquier momento, bajo su total discreción y sin necesidad de notificarle de manera previa. </p>

                    <p><b class="font-bold">8. </b>No biopolímeros abogados y médicos advierte que es deber del usuario visitar el <b>SITIO </b>regularmente para tener conocimiento de los cambios que se lleguen a implementar. Sin embargo, las restricciones consentidas por el usuario sobre la información contenida en este <b>SITIO,</b> las limitaciones de responsabilidad, indemnidades y demás concesiones, persistirán a la terminación de estos <b>TÉRMINOS Y CONDICIONES.</b> No biopolímeros abogados y médicos también se reserva el derecho de terminar el <b>SITIO </b>o alguna sección de éste, en cualquier momento, bajo su total discreción y sin necesidad de notificarle personalmente al usuario.</p>

                    <p><b class="font-bold">9. </b>No biopolímeros abogados y médicos es una firma de abogados y médicos que desarrolla su práctica legal enteramente en Colombia, toda la información y contenido de este <b>SITIO,</b> tiene un alcance limitado exclusivamente a Colombia sin perjuicios de las acciones que pudiere impetrarse en Las Cortes Internacionales en salvaguarda de los derechos humanos y demás reconocidos internacionalmente.</p>

                    <p><b class="font-bold">10. </b>No biopolímeros abogados y médicos podrá, en cualquier momento y sin previo aviso, modificar, adicionar, eliminar, enmendar los contenidos de este <b>SITIO,</b> incluyendo cualquier documento, dato, Por favor, tenga en cuenta que la normatividad Colombiana cambia de manera constante y varía por distintos factores y circunstancias, lo cual incluye, jurisprudencia, circulares, directivas, por los distintos órganos de poder público por ende  crea inseguridad jurídica, y por tratarse la obligación del abogado y médico de medio y no de resultado los profesionales no se comprometen en ningún momento a resultados de sus procesos, lo anterior siempre y cuando se haya suscrito el respectivo contrato de prestación de servicios medico legales. </p>

                    <p><b class="font-bold">11. </b>Algunos contenidos de este <b>SITIO </b>están protegidos por las leyes de derechos de autor y de marca registrada. No biopolímeros abogados y médicos, No se permite la creación de páginas web, sitios de internet, documentos electrónicos, programas de computador o aplicaciones informáticas de cualquier tipo, que contengan hipervínculos o marcas que redirijan al navegante a cualquier contenido de este <b>SITIO.</b></p>

                    <p><b class="font-bold">12. </b>Usted  acepta que el uso de este <b>SITIO,</b> de sus contenidos y de la información que contiene, será con propósitos legítimos y legales, en cumplimiento de los <b>TÉRMINOS Y CONDICIONES </b>y de todas las leyes aplicables como portal de comunicación mas no de asesoría y que el ingreso de información documental a este sitio será previamente autorizada por el profesional en comunicación verbal o escrita . El uso de este <b>SITIO </b>—particular pero no exclusivamente— de sus contenidos y de la información se encuentra limitado por los siguientes términos, bajo los cuales usted acepta que no usará este <b>SITIO,</b> sus contenidos o la información que contiene para:</p>

                    <ul class="list-disc ml-20">
                      <li> Transmitir a terceros o publicar, de cualquier manera, información falsa, dañina, hostil, abusiva, irritante, problemática, amenazante, tortuosa, difamatoria, vulgar, obscena, pornográfica, infundada, odiosa o perjudicial, sobre la cual no cuenta con las debidas autorizaciones legales o contractuales</li>

                      <li> Ocasionar daño a menores de edad, promover o efectuar daños físicos o materiales a cualquier persona o grupo de personas naturales y jurídicas o a animales</li>

                      <li> Utilizar la identidad o la información de personas (jurídicas o naturales), mencionadas en este <b>SITIO,</b> para cualquier propósito o finalidad, teniendo en cuanta que puede encontrarse en este sitio información sensible conforme la resolución 866 /2021</li>

                      <li> Transmitir o emitir material que contenga virus informático o cualquier otro tipo de código, programa de computador o alguna aplicación destinada a interrumpir, destruir, restringir o perjudicar la funcionalidad de computadores, programas, sistemas de información, redes de telecomunicación o infraestructura y servicios de terceros.</li>

                      <li> Incumplir —de manera intencionada o sin intención— cualquier ley nacional, local, estatal o internacional, incluyendo las normas de privacidad y protección de datos.</li>

                      <li> Recoger, guardar y administrar datos personales sobre personas naturales y jurídicas sin la debida autorización, en cumplimiento con las leyes.</li>

                      <li> Planear, estructurar, armar, ejecutar o realizar prácticas o actividades de carácter criminal.</li>

                      <li> Infringir los derechos de propiedad intelectual de No biopolímeros abogados y médicos o de terceros; entre otras conductas lesivas de terceros o de las leyes aplicables.</li>
                    </ul>


                    <p><b class="font-bold">13. </b>No biopolímeros abogados y médicos, analizará los documentos enviados por el usuario y con el propósito únicamente en lo relacionado con  el análisis para eventual proceso individual o colectivo judicial previa revisión de praxis médica e imputación de personas naturales o juridicas.</p>

                    <p><b class="font-bold">14. </b>Consecuencias por el uso del SITIO: Cualquier violación de estos <b>TÉRMINOS Y CONDICIONES,</b> queja o información que No biopolímeros abogados y médicos reciba de terceros sobre el incumplimiento o abuso de los <b>TÉRMINOS Y CONDICIONES,</b> podrá ser investigada por No biopolímeros abogados y médicos quien tomará acciones legales y extra legales con el fin de obtener la cesación de las conductas y garantizar las indemnizaciones a que haya lugar bajo la ley aplicable. La violación de los <b>TÉRMINOS Y CONDICIONES </b>puede resultar en responsabilidad civil o penal de parte de usted. Si no está seguro de que sus acciones constituyan una violación o abuso de estos <b>TÉRMINOS Y CONDICIONES,</b> por favor, no dude en comunicarse con nosotros previamente, con gusto resolveremos sus preguntas. Usted es el único responsable del acceso y uso que haga del <b>SITIO,</b> de la información y los contenidos que contiene.</p>

                    <p><b class="font-bold">15. </b>No interferir con el SITIO: Está prohibido cualquier acto que incluya el uso de hardware y software, que puedan dañar, interferir, afectar la integridad o la interceptación de los sistemas que soportan este <b>SITIO,</b> su funcionamiento o los contenidos. Igualmente, se prohíben los actos que impongan cargas irrazonables o desproporcionadas sobre los sistemas de red o cualquier otra infraestructura de red que utilice el <b>SITIO.</b></p>

                    <p><b class="font-bold">16. </b>Vínculos a sitios de terceros: Se solicita tener en cuenta que varios sitios web enlazados o vinculados a este sitio no son operados, controlados o administrados por No biopolímeros abogados y médicos, por lo tanto, no somos responsables por la disponibilidad, contenidos, políticas, prácticas, seguridad, bienes y servicios de tales sitios web, incluyendo sus políticas de privacidad y <b>TÉRMINOS Y CONDICIONES.</b> Cualquier vínculo de este <b>SITIO </b>a otros portales web de terceros no constituye patrocinio, amparo, protección, defensa, garantía, tutela, respaldo  por parte de No biopolímeros abogados y médicos sobre el contenido, políticas, información, servicios o prácticas de estos sitios web. El acceso y uso que el usuario haga de sitios web de terceros enlazados o vinculados a este <b>SITIO </b>es bajo su propio riesgo.</p>

                    <p><b class="font-bold">17. </b>Información y contenidos de terceros: El <b>SITIO </b>puede reproducir o contener información de terceros que no trabajan en No biopolímeros abogados y médicos ni están vinculados de alguna manera. No biopolímeros abogados y médicos no está en condición de verificar la veracidad de la información suministrada por terceros y no asegura la certeza y veracidad de esta información y contenidos. No biopolímeros abogados y médicos garantiza que toda la información y los contenidos proporcionados por terceros que ha sido incluida en el <b>SITIO,</b> ha sido previamente licenciada y validada por los terceros quienes son los titulares de los derechos morales y patrimoniales de estos datos. Respecto a esta información, No biopolímeros abogados y médicos no incurre en violación de ningún derecho de terceros. </p>

                    <p><b class="font-bold">18. </b>Comentarios del usuario: El usuario puede enviar comentarios a No biopolímeros abogados y médicos o cualquier otro contenido como ideas, sugerencias e inquietudes sobre el <b>SITIO </b>o sobre la información que contiene, siempre y cuando dicha comunicación no sea ilegal, falsa, dañina, hostil, abusiva, irritante, problemática, amenazante, tortuosa, difamatoria, vulgar, obscena, pornográfica, infundada, injuriosa, odiosa, perjudicial, o cualquier otro tipo de material que no cuente con las debidas autorizaciones legales o contractuales perjudiciales, y que viole los derechos de propiedad intelectual. Igualmente, se solicita no mandar correos masivos, campañas políticas, publicidad, spam o cualquier tipo de comunicación que contenga virus informático. </p>

                    <p><b class="font-bold">19. </b> Información sobre experiencias y comentarios de usuarios:  parte de la información incluida en el <b>SITIO </b>es provista por los usuarios o por el público en general y tiene el objetivo de servir de insumo para la discusión. No biopolímeros abogados y médicos sugiere que la información incorporada en el <b>SITIO </b>sea discutida con abogados profesionales antes de tomar decisiones con base en esa información o de estructurar un concepto.</p>

                    <p><b class="font-bold">20. </b>Colaboración del usuario a No biopolímeros abogados y médicos: en caso de que el usuario se percate de que los contenidos o la información de este <b>SITIO </b>es inapropiada, ineficiente, contraria a la ley o a los <b>TÉRMINOS Y CONDICIONES </b>del <b>SITIO,</b> de baja calidad o, de cualquier manera, perjudicial para el usuario o terceros, No biopolímeros abogados y médicos agradece el envío de comentarios a la dirección de contacto que aparece en el numeral uno de estos <b>TÉRMINOS Y CONDICIONES.</b> En todo caso, No biopolímeros abogados y médicos se reserva el derecho de remover o mantener la información del <b>SITIO.</b></p>

                    <p><b class="font-bold">21. </b> Mejores esfuerzos: No biopolímeros abogados y médicos ha hecho su mejor esfuerzo para garantizar que todos los contenidos y la información incluida en el <b>SITIO </b>sea correcta. Sin embargo, no es posible asegurar la total veracidad de los contenidos, por lo tanto, No biopolímeros abogados y médicos no asume ninguna responsabilidad sobre la veracidad, exactitud, autenticidad, correspondencia con la realidad, fidelidad, exhaustividad, completitud, integridad o precisión de la información y los contenidos incluidos en el <b>SITIO.</b></p>

                    <p><b class="font-bold">22. </b>Ley aplicable: Estos <b>TÉRMINOS Y CONDICIONES </b>serán interpretados y ejecutados, exclusivamente, de acuerdo a las leyes de la República de Colombia, sin perjuicio de las provisiones sobre conflicto de leyes de cualquier país.</p>

                    <p><b class="font-bold">23. </b>Modificaciones: Ninguna sección de estos <b>TÉRMINOS Y CONDICIONES </b>podrá ser modificada, suprimida o agregada por el usuario del <b>SITIO,</b> unilateralmente.</p>

                    <p><b class="font-bold">24. </b>Aplicabilidad: Si cualquier sección o parte de estos <b>TÉRMINOS Y CONDICIONES </b>resulta inaplicable o inválida —en su totalidad o en parte—bajo cualquier ley o sentencia como tal por decisión judicial, la interpretación de esa parte o sección se hará de conformidad con la ley aplicable. La falta de aplicabilidad o invalidez no hará que estos <b>TÉRMINOS Y CONDICIONES,</b> en general, y las disposiciones remanentes o parte de ellas, sean inaplicables, inválidas o ineficaces en su totalidad. En caso de que suceda lo anterior, las disposiciones serán cambiadas e interpretadas con el fin de lograr, de la mejor manera posible, los objetivos de las disposiciones no aplicables o inválidas, dentro de los límites de la ley aplicable o las decisiones de las Honorables Cortes .</p>

                    <p><b class="font-bold">25. </b>Integridad: Estos <b>TÉRMINOS Y CONDICIONES </b>constituyen los únicos términos entre No biopolímeros abogados y médicos y el usuario. La aceptación de estos <b>TÉRMINOS Y CONDICIONES </b>anula cualquier acuerdo, pacto, declaración, entendimiento y garantía anterior o actual sobre el <b>SITIO,</b> el contenido y la información que contiene. </p>

                    <p><b class="font-bold">26. </b>No renuncia: La inaplicabilidad por parte de No biopolímeros abogados y médicos de alguna condición, término o derecho incluido en estos <b>TÉRMINOS Y CONDICIONES </b>no se interpretará como desistimiento o renuncia del derechos de No biopolímeros abogados y médicos, en lo sucesivo, de hacer cumplir o ejecutar alguna de las disposiciones aquí contenidas.</p>

                    <p><b class="font-bold">27. </b>No Biopolímeros médicos y abogados, Conforme la ley 1581 de 2012 Articulo 4 Se compromete  tratar los datos conforme la finalidad especifica y legal en Colombia esto es el análisis de la praxis médica y revisión de la imputación de las personas naturales y jurídicas en los tratamientos médicos estéticos y terapéuticos y brindar acompañamiento médico legal en defensa de sus derechos fundamentales y que las leyes brindan a los pacientes, previo consentimiento informado de los usuarios del servicio médico,  No biopolímeros médicos y abogados se compromete a otorgar seguridad a los documentos enviados previo acuerdo verbal o escrito evitando su adulteración y  perdida, desechándolos una vez se de fin a la asesoría y propósito al brindar el uso acordado en los términos y condiciones.</p>
                  </p>
                </div>
              </div>
              {/*footer*/}
              <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={handleClose}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
    </React.Fragment>
  );
}


