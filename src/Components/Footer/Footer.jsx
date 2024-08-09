import React from 'react';
import styled from 'styled-components';
import { FaMapMarkerAlt , FaLinkedin } from 'react-icons/fa';
import { SiGmail, SiGooglemaps } from "react-icons/si";
import { Link } from 'react-router-dom';

const FooterContainer = styled.footer`
  background-color: #00339b;
  color: #ffffff;
  padding: 20px 0;
  text-align: center;

  .navbar-footer {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: 10px;

    li {
      margin: 5px 15px;

      .copyright-text {
        font-size: 1rem;
        color: #ffffff;
        margin: 0;
      }
    }

    a {
      color: #ffffff;
      margin: 5px 15px;
      font-size: 1rem;
      text-decoration: none;
      transition: color 0.3s ease;

      &:hover {
        color: #ffcc00;
      }
    }
  }

  hr {
    border-color: rgba(255, 255, 255, 0.3);
    margin: 10px 0;
  }

  .social-icons {
    display: flex;
    justify-content: center;
    list-style: none;
    padding: 0;

    li {
      margin: 0 10px;

      a {
        color: #ffffff;
        font-size: 1.5rem;
        transition: color 0.3s ease;

        &:hover {
          color: #ffcc00;
        }
      }
    }
  }

  @media (max-width: 768px) {
    .navbar-footer {
      flex-direction: column;
      align-items: center;
    }

    .social-icons {
      li {
        margin: 5px;
        margin-left: 10px;
      }
    }
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <div className="container">
        <div className="navbar-footer">
          <li>
            <p className="copyright-text">© 2024 Club Europeo. Todos los derechos reservados.</p>
          </li>
          <Link to="/about" id='foot-item'>Nosotros</Link>
          <Link to="/news" id='foot-item'>Noticias</Link>
          <Link to="/contact" id='foot-item'>Contacto</Link>
        </div>
        <hr />
      </div>
      <div className="container-footer">
        <ul className="social-icons">
          <li><a className="github" target="_blank" rel="noopener noreferrer" href="https://maps.app.goo.gl/PckEVEYeaev1JYe3A"><FaMapMarkerAlt /></a></li>
          <li><a className="gmail" target="_blank" rel="noopener noreferrer" href="https://mail.google.com/mail/u/1/#inbox?compose=GTvVlcSDXXrmlzJTTmGmpSTzBRmDxJLngdmsDQTLNWLWzwHmPCZsLmxJqPqSTvNHxBqfSVbwFqNnM"><SiGmail /></a></li>
          <li><a className="linkedin" target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/franco-parodi-a638ab206/"><FaLinkedin /></a></li>
        </ul>
      </div>
    </FooterContainer>
  );
};

export default Footer;
