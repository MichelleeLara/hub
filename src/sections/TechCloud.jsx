import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NextJS, AwsIcon, GoogleIcon, CloudFareIcons } from '../icons/Icons';
import Technologies from '../components/Technologies';

const FrontendTechnologies = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Efecto de limpieza para restaurar el scroll
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const technologies = [
    { Title: "Google Cloud", Description: "Nube", Icon: GoogleIcon, colors: [""] },
    { Title: "AWS", Description: "Nube", Icon: AwsIcon, colors: ["#8d8d8d"] },
    { Title: "Cloudfare", Description: "Nube de seguridad", Icon: CloudFareIcons, colors: [""] },
  ];

  const moveSlide = (newDirection) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => 
      (prevIndex + newDirection + technologies.length) % technologies.length
    );
  };

  const [isScrollLocked, setIsScrollLocked] = useState(false);

  const handleDrag = (event, info) => {
    const offsetX = info.offset.x;
    const offsetY = info.offset.y;
    const angle = Math.atan2(Math.abs(offsetY), Math.abs(offsetX)) * (180 / Math.PI);
    
    // Si el movimiento es casi vertical (89-90 grados), permitimos scroll natural
    if (angle > 89) {
      if (isScrollLocked) {
        document.body.style.overflow = 'auto';
        setIsScrollLocked(false);
      }
    } else {
      // Para cualquier otro ángulo, bloqueamos el scroll
      if (!isScrollLocked) {
        document.body.style.overflow = 'hidden';
        setIsScrollLocked(true);
      }
    }
  };

  const handleDragEnd = (event, info) => {
    const offsetX = info.offset.x;
    const offsetY = info.offset.y;
    const angle = Math.atan2(Math.abs(offsetY), Math.abs(offsetX)) * (180 / Math.PI);
    const thresholdX = 20;

    // Restauramos el scroll al finalizar
    document.body.style.overflow = 'auto';
    setIsScrollLocked(false);

    // Si el movimiento es casi vertical, no hacemos nada
    if (angle > 90) return;
    console.log(angle)
    // Para movimientos diagonales o horizontales
    if (Math.abs(offsetX) > thresholdX) {
      if (offsetX > 0) {
        moveSlide(-1); // Mover hacia la derecha
      } else {
        moveSlide(1); // Mover hacia la izquierda
      }
    }
  };

  return (
    <article className="flex flex-col gap-28 my-10">
      <div className="flex flex-col gap-2">
        <motion.h3
          className="text-lg text-gray-800 font-semibold dark:text-secondary"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          Nube
        </motion.h3>
      </div>

      <div className="flex flex-col gap-24">
        <div className="relative h-fit flex items-center justify-center">
          <AnimatePresence initial={false} custom={direction}>
            {technologies.map((tech, index) => {
              const isActive = index === currentIndex;
              const distance = (index - currentIndex + technologies.length) % technologies.length;
              const isFront = distance === 0;
              
              return (
                <motion.div
                  key={tech.Title}
                  className="absolute w-full"
                  style={{
                    zIndex: technologies.length - distance,
                  }}
                  drag={isActive ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  onDrag={isActive ? handleDrag : undefined}
                  onDragEnd={isActive ? handleDragEnd : undefined}
                  initial={direction > 0 
                    ? { x: 0, opacity: 0, scale: 0.8 }
                    : { x: 0, opacity: 0, scale: 0.8 }
                  }
                  animate={{
                    x: 0,
                    y: distance * -8, // Desplazamiento vertical para efecto stack
                    opacity: 1 - (distance * 0.2),
                    scale: 1 - (distance * 0.05),
                    rotateX: distance * -5, // Rotación en X para efecto 3D
                    translateZ: -distance * 50, // Profundidad para efecto 3D
                  }}
                  exit={direction > 0
                    ? { x: 300, opacity: 0, scale: 0.8 }
                    : { x: -300, opacity: 0, scale: 0.8 }
                  }
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30
                  }}
                >
                  <Technologies {...tech} isFront={isFront}>
                    <tech.Icon />
                  </Technologies>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-4">
          {technologies.map((_, index) => (
            <motion.div
              key={index}
              className="w-1.5 h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full cursor-pointer"
              animate={{
                scale: currentIndex === index ? 1.9 : 1,
                backgroundColor: currentIndex === index ? '#3178c6' : '#d1d5db'
              }}
              onClick={() => {
                const newDirection = index > currentIndex ? 1 : -1;
                moveSlide(newDirection);
              }}
            />
          ))}
        </div>
      </div>
    </article>
  );
};

export default FrontendTechnologies;