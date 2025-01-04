import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ThemeToggle from "./Themetoggle";
// import throttle from "lodash/throttle"; // O implementa tu propia.

const Header = () => {
  const [hidden, setHidden] = useState(false);
  const [isStart, setIsStart] = useState(false);

  let lastScroll = 0;

  useEffect(() => {
    // Ejemplo con requestAnimationFrame (sin lodash)
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScroll = window.scrollY;

          // 1) si scrolleamos a < 50, se expande
          setIsStart(currentScroll < 50);

          // 2) si scrolleamos hacia abajo
          if (currentScroll > lastScroll && currentScroll > 20) {
            setHidden(true);
          } 
          // 3) si scrolleamos hacia arriba
          else if (currentScroll < lastScroll) {
            setHidden(false);
          }

          lastScroll = Math.max(currentScroll, 0);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const variants = {
    expanded: {
      width: "100%",
      transition: {
        type: "spring",
        duration: 0.4,
        stiffness: 300,
        damping: 30,
      },
      // en lugar de width: 100% => transform: scaleX( ? )?
      // o y: 0
      y: 0,
      borderRadius: 0,
      // etc
    },
    visible: {
      y: '10%',
      borderRadius: 60,
      transition: {
        type: "spring",
        duration: 0.4,
        stiffness: 300,
        damping: 30,
      },
    },
    hidden: {
      y: "-80%", // se oculta por completo
      transition: {
        type: "spring",
        duration: 0.4,
        stiffness: 300,
        damping: 30,
      },
    },
  };

  const currentVariant = hidden
    ? "hidden"
    : isStart
    ? "expanded"
    : "visible";

  return (
    <AnimatePresence>
    <div className="w-full fixed z-50 top-0 left-0  flex items-center justify-center">
      <motion.header
        className="
                   bg-[#eff3f4] dark:bg-[#1c1c1c] py-3
                   will-change-transform" // Para activar GPU
        style={{ transformOrigin: "top center" }}
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
              {/* Si está en modo hidden, NO mostramos el botón */}
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
