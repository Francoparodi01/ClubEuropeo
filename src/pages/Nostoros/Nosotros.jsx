import React from "react";
import styled from "styled-components";

const NosotrosContainer = styled.div`
  margin-top: 200px;
  display: grid;
  grid-template-columns: 1fr min(100%, 800px) 1fr; /* Mantén un máximo de 800px para el texto */
  padding: 20px;
`;

const Content = styled.div`
  grid-column: 2; 
`;

const Nosotros = () => {
  return (
    <NosotrosContainer>
      <Content>
        <h2>Sobre Nosotros</h2>
        <p>
          El Club Europeo, fundado el 9 de mayo de 2001 en Buenos Aires por
          trece organizaciones de origen europeo, es el primer club de su tipo
          en el mundo. Su objetivo es fortalecer los lazos entre las comunidades
          europeas y argentinas, estimular la comunicación y fomentar el
          desarrollo del talento en un entorno único en América Latina.
        </p>
        <p>
          Ubicado en el Círculo Italiano, el Club ofrece acceso a las
          instalaciones de otros clubes fundadores e institucionales, y ha
          establecido acuerdos con clubes y asociaciones tanto en Argentina como
          en el extranjero. Los miembros tienen la oportunidad de participar en
          una amplia gama de eventos, desde reuniones diplomáticas hasta
          exposiciones de arte y grupos de conversación en varios idiomas,
          creando así un vibrante espacio cultural y social.
        </p>

        <h3>Nuestra Misión</h3>
        <p>
          Crear un espacio alrededor de la Idea Europea, donde todos:
          Argentinos, Europeos y personas de cualquier nacionalidad se
          encuentran para un intercambio de ideas y para desplegar sus talentos.
        </p>
        <p>
          Ofrecer y desarrollar en interacción, actividades culturales, sociales
          y profesionales que atiendan las necesidades actuales como futuras de
          los socios, y de la comunidad en general.
        </p>
        <p>
          Constituir el Club Social más diversificado de la Argentina, que
          brinda a sus socios las mejores posibilidades para desarrollar redes
          de contactos en un entorno cosmopolita.
        </p>
        <p>
          Contribuir tanto por las actividades del Club como por el crecimiento
          individual de sus integrantes a una sociedad mejor, que sabe valorar
          educación, cultura y buena convivencia.
        </p>

        <h3>Objeto del Club Europeo</h3>
        <p>
          El Objetivo del Club Europeo es fomentar y consolidar las relaciones
          de Clubes y Asociaciones representativas de las comunidades Europeas
          con intereses en el país entre sí y con respecto a sus asociados,
          favoreciendo la conjunción de las entidades para generar una corriente
          cultural que permita desarrollar una política de fomento de las
          relaciones con Europa en lo social, cultural, empresario, profesional
          y deportivo con vistas a prevalecer tanto para las generaciones
          presentes como las futuras.
        </p>
        <p>
          El Club representará los intereses de la comunidad de sus socios
          orientando sus prioridades entre otras al apoyo de los socios jóvenes
          en el plano de la infraestructura e información esencialmente europea,
          fomentando las relaciones y los contactos entre los socios y actuando
          como nexo con Fundaciones europeas, Cámaras y otras Asociaciones,
          facilitando los estudios, la obtención de becas y las relaciones
          comerciales con Europa.
        </p>
        <p>
          Es además prioridad del Club Europeo su vínculo con Europa ya sea en
          forma bilateral con los distintos países europeos o directamente con
          los organismos de la Unión Europea.
        </p>

        <h2>Máximas autoridades</h2>
          
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "20px",
          }}
        >
          <div
            style={{
              width: "45%",
              height: "200px",
              backgroundColor: "#e0e0e0",
            }}
          />
          <div
            style={{
              width: "45%",
              height: "200px",
              backgroundColor: "#e0e0e0",
            }}
          />
        </div>
      </Content>
    </NosotrosContainer>
  );
};

export default Nosotros;
