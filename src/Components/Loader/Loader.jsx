import React from 'react';
import './Loader.css'; 

const Loader = () => {
  return (
    <div className="loader">
      <div className="svg-wrapper">
        <svg
          width="200"
          height="200"
          viewBox="0 0 120 120"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Loader</title>
          <rect width="120" height="120" fill="#003399" rx="20" />
          <g fill="#FFCC00">
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (i * 30 - 90) * (Math.PI / 180);
              const x = 60 + 45 * Math.cos(angle);
              const y = 60 + 45 * Math.sin(angle);
              return (
                <polygon
                  key={i}
                  points="60,50 62,55 67,55 63,58 65,63 60,60 55,63 57,58 53,55 58,55"
                  transform={`translate(${x - 60}, ${y - 60})`}
                >
                  <animate
                    attributeName="opacity"
                    values="1;0;1"
                    repeatCount="indefinite"
                    dur="4s"
                    begin={`${i * 0.5}s`}
                  />
                </polygon>
              );
            })}
          </g>
        </svg>
        <div className="loading-text">Cargando...</div>
      </div>
    </div>
  );
};

export default Loader;
