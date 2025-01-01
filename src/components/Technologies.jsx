import React from "react";
import PropTypes from "prop-types";
import "../global.css"; // Asegúrate de incluir los estilos globales

const Technologies = ({ Title, Description, colors = [], children, isFront }) => {
  // Determinar si `colors` es un arreglo o un string
  const shadowColor = Array.isArray(colors) && colors.length > 0 ? colors[0] : colors;

  return (
    <div className={`tech-card rounded-xl flex gap-1 items-center py-4 px-4 justify-center bg-[#1a1a1a] overflow-hidden relative min-w-[180px] ${isFront ? '' : 'border-[#626262] border-t'}`}>
      <div className="flex flex-col gap-1 items-center justify-center relative">
        {/* Ícono Principal */}
        <div className="icon-container">
          <div className="icon-wrapper">{children}</div>
        </div>

        {/* Sombra Blur */}
        <div
          className="blur-shadow"
          style={{
            "--shadow-color": shadowColor,
            "--shadow-transform": "translate(-50%, -50%)", // Mantener la consistencia del transform
          }}
        >
          {children}
        </div>

        {/* Contenido de Texto */}
        <div className="relative z-30 text-center flex flex-col gap-0.5">
          <h4 className="font-semibold text-secondary text-sm">{Title}</h4>
          <p className="text-xs text-terteary font-medium">{Description}</p>
        </div>
      </div>
    </div>
  );
};

// Validación de Props con PropTypes
Technologies.propTypes = {
  Title: PropTypes.string.isRequired,
  Description: PropTypes.string.isRequired,
  colors: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        color: PropTypes.string.isRequired,
        position: PropTypes.string,
      })
    ),
    PropTypes.string,
  ]),
  children: PropTypes.node.isRequired,
};

export default Technologies;
