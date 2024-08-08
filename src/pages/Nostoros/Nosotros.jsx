import React, { useState } from "react";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";

const NosotrosContainer = styled.div`
  padding: 20px;
  margin-top: 170px;
  text-align: center;

  h1 {
    font-size: 2rem;
    margin-bottom: 20px;
  }

  h2 {
    font-size: 1.5rem;
    margin-top: 20px;
  }

  p {
    font-size: 1.2rem;
    text-align: justify;
    margin-bottom: 1rem;
  }

  button {
    margin-top: 10px;
  }

  @media (max-width: 768px) {
    margin-top: 120px;
    h1 {
      font-size: 1.75rem;
    }
    p {
      font-size: 1rem;
    }
  }

  @media (max-width: 576px) {
    margin-top: 100px;
    h1 {
      font-size: 1.5rem;
    }
    p {
      font-size: 0.9rem;
    }
  }

  @media (max-width: 400px) {
    margin-top: 80px;
    h1 {
      font-size: 1.25rem;
    }
    p {
      font-size: 0.8rem;
    }
  }
`;

const AccordionItem = styled.div`
  margin-top: 20px;
  cursor: pointer;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
  background-color: #f9f9f9;
  transition: background-color 0.2s ease-in;
  &:hover {
    background-color: #e9e9e9;
  }
`;

const AccordionContent = styled.div`
  max-height: ${(props) =>
    props.isOpen ? "500px" : "0"}; 
  overflow: hidden;
  transition: max-height 0.5s ease-in-out;
`;

const Nosotros = () => {
  const [showMision, setShowMision] = useState(false);
  const [showVision, setShowVision] = useState(false);
  const [showObjeto, setShowObjeto] = useState(false);

  return (
    <NosotrosContainer>
      <h1>Sobre Nosotros</h1>
      <p>
        El Club Europeo, fundado el 9 de mayo de 2001 en Buenos Aires por trece
        organizaciones de origen europeo, es el primer club de su tipo en el
        mundo. Su objetivo es fortalecer los lazos entre las comunidades
        europeas y argentinas, estimular la comunicación y fomentar el
        desarrollo del talento en un entorno único en América Latina.
      </p>
      <p>
        Ubicado en el Círculo Italiano, el Club ofrece acceso a las
        instalaciones de otros clubes fundadores e institucionales, y ha
        establecido acuerdos con clubes y asociaciones tanto en Argentina como
        en el extranjero. Los miembros tienen la oportunidad de participar en
        una amplia gama de eventos, desde reuniones diplomáticas hasta
        exposiciones de arte y grupos de conversación en varios idiomas, creando
        así un vibrante espacio cultural y social.
      </p>
      <AccordionItem onClick={() => setShowMision(!showMision)}>
        <h2>Nuestra Misión</h2>
      </AccordionItem>
      <AccordionContent isOpen={showMision}>
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
          de amigos y contactos en un entorno cosmopolita.
        </p>
        <p>
          Contribuir tanto por las actividades del Club como por el crecimiento
          individual de sus integrantes a una sociedad mejor, que sabe valorar
          educación, cultura y buena convivencia.
        </p>
      </AccordionContent>
      <AccordionItem onClick={() => setShowVision(!showVision)}>
        <h2>Nuestra Visión</h2>
      </AccordionItem>
      <AccordionContent isOpen={showVision}>
        <p>
          Ser un club que una cultural y socialmente a Europa con Argentina,
          reflejando el progreso y la interacción entre ambas regiones. Buscamos
          ser un puente que facilite el intercambio de ideas, valores y
          tradiciones, promoviendo una colaboración enriquecedora entre nuestros
          socios y la comunidad en general. Nuestro objetivo es destacar la
          importancia de los valores europeos, como la diversidad, la inclusión
          y el respeto mutuo, al tiempo que contribuimos al desarrollo de una
          sociedad más integrada y cosmopolita.
        </p>
      </AccordionContent>
      <AccordionItem onClick={() => setShowObjeto(!showObjeto)}>
        <h2>Objetivo del Club Europeo</h2>
      </AccordionItem>
      <AccordionContent isOpen={showObjeto}>
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
      </AccordionContent>
    </NosotrosContainer>
  );
};

export default Nosotros;
