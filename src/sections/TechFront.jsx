import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Figma, ReactIcon, NextJS, TailwindIcon, TypeScriptIcon } from '../icons/Icons';
import Technologies from '../components/Technologies';

const FrontendTechnologies = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const technologies = [
    { Title: "React", Description: "Librería", Icon: ReactIcon, colors: ["#087ea4"] },
    { Title: "NextJs", Description: "Framework", Icon: NextJS, colors: ["#8d8d8d"] },
    { Title: "TypeScript", Description: "Lenguaje", Icon: TypeScriptIcon, colors: ["#3178c6"] },
    { Title: "TailwindCSS", Description: "Librería", Icon: TailwindIcon, colors: ["#38bdf8"] },
    { Title: "Figma", Description: "Diseño", Icon: Figma, colors: ["#f24e1e"] }
  ];

  const moveSlide = (newDirection) => {
    setDirection(newDirection);
    const newIndex = (currentIndex + newDirection + technologies.length) % technologies.length;
    setCurrentIndex(newIndex);
  };

  const handleDragEnd = (event, info) => {
    const offsetX = info.offset.x;
    const threshold = 100;

    if (offsetX > threshold) {
      moveSlide(-1);
    } else if (offsetX < -threshold) {
      moveSlide(1);
    }
  };

  return (
    <article className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <motion.h3
          className="text-lg text-gray-800 font-semibold dark:text-secondary"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          Frontend
        </motion.h3>
        <motion.p
          className="text-sm text-gray-800 dark:text-tertiary"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          Tecnologías que domino para los proyectos
        </motion.p>
      </div>

      <div
        className="relative h-[350px] flex items-center justify-center"
        style={{ perspective: 1000 }}
      >
        <AnimatePresence initial={false} custom={direction}>
          {technologies.map((tech, index) => {
            const distance = (index - currentIndex + technologies.length) % technologies.length;
            const isActive = index === currentIndex;

            return (
              <motion.div
                key={tech.Title}
                className="absolute flex justify-center  shadow-lg rounded-lg"
                style={{
                  rotateY: isActive ? 0 : distance * 5,
                }}
                drag={isActive ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={isActive ? handleDragEnd : undefined}
                initial={{ opacity: 0, x: direction > 0 ? 200 : -200, scale: 0.9 }}
                animate={{
                  x: isActive ? 0 : distance * 15 * (direction || 1),
                  y: 0,
                  rotateZ: isActive ? 0 : distance * 5 * (direction || 1),
                  scale: isActive ? 1 : 0.9 - Math.min(distance * 0.05, 0.3),
                  opacity: isActive ? 1 : 0.6 - Math.min(distance * 0.1, 0.4),
                  zIndex: technologies.length - distance
                }}
                exit={{ opacity: 0, x: direction < 0 ? 200 : -200, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <Technologies {...tech}>
                  <tech.Icon />
                </Technologies>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <div className="flex justify-center gap-4 mt-4">
        {technologies.map((_, index) => (
          <motion.div
            key={index}
            className="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full cursor-pointer"
            animate={{ scale: currentIndex === index ? 1.5 : 1 }}
            onClick={() => moveSlide(index - currentIndex)}
          />
        ))}
      </div>
    </article>
  );
};

export default FrontendTechnologies;
