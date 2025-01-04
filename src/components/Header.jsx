import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ThemeToggle from "./Themetoggle";

const Header = () => {
  const [hidden, setHidden] = useState(false);
  const [isStart, setIsStart] = useState()

  // Usamos esta variable para saber la posición previa del scroll
  let lastScroll = 0;

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      // 1) ¿Está en la parte de arriba (scroll < 50)? => expandido
      if (currentScroll < 50) {
        setIsStart(true);
      } else {
        setIsStart(false);
      }

      // 2) ¿Scroll hacia abajo y > 20px? => ocultar
      if (currentScroll > lastScroll && currentScroll > 20) {
        setHidden(true);
      } 
      // 3) ¿Scroll hacia arriba? => mostrar
      else if (currentScroll < lastScroll) {
        setHidden(false);
      }

      lastScroll = currentScroll <= 0 ? 0 : currentScroll;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Variantes para animar la posición Y del header
  const variants = {
    visible: {
      y: 0,
      borderRadius: 60,
      transition: {
        type: "spring",
        duration: 0.4,
        stiffness: 300,
        damping: 30,
        // mass, bounce, etc. para mayor fine-tuning
      },
    },
    hidden: {
      y: -60,
      borderRadius: 60,
      transition: {
        type: "spring",
        duration: 0.4,
        stiffness: 300,
        damping: 30,
      },
    },
    expanded: {
      width: "100%",
      borderRadius: 0,
      left: 0,
      x: 0,
      top: 0,
      transition: {
        type: "spring",
        duration: 0.4,
        stiffness: 300,
        damping: 30,
      },
    },
  };

  
  // Lógica para determinar qué variante usar:
  // 1) Si está hidden => "hidden"
  // 2) Si no está hidden pero isStart => "expanded"
  // 3) Sino => "visible"
  const currentVariant = hidden
    ? "hidden"
    : isStart
    ? "expanded"
    : "visible";

  return (
    // Header fijo en la parte superior, ancho completo
    <AnimatePresence>
      <div className=" w-full fixed z-50 left-0 flex items-center justify-center">
        <motion.header
          className="w-4/5 bg-[#eff3f4] dark:bg-[#1c1c1c] rounded-full py-3"
          variants={variants}
          initial="visible"
          animate={currentVariant}
        >
          <div className="mx-6 flex gap-3 items-center justify-between">
            <div className="flex gap-3 items-center">
              <img
                src="/author.png"
                className="w-12 object-top"
                alt="Author"
              />
              <div className="flex flex-col gap-0">
                <p className="font-semibold text-sm dark:text-secondary">
                  Mich Rodriguez
                </p>
                <p className="text-xs font-medium text-terteary">
                  Frontend React
                </p>
              </div>
            </div>
            <AnimatePresence>
              {!hidden && (
                <motion.div
                  key="island-btn"
                  className="flex justify-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                >
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-full">
                    Botón Isla
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
            <ThemeToggle />
          </div>
        </motion.header>
      </div>
    </AnimatePresence>
  );
};

export default Header;
