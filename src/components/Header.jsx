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
      y: 0,
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
      <motion.header
        className="fixed top-0 left-0 w-full z-50 
                   bg-[#eff3f4] dark:bg-[#1c1c1c]
                   shadow-2xl py-3
                   will-change-transform" // Para activar GPU
        style={{ transformOrigin: "top center" }}
        variants={variants}
        initial="visible"
        animate={currentVariant}
      >
        <div className="mx-6 flex gap-3 items-center justify-between">
          {/* ... contenido ... */}
          <ThemeToggle />
        </div>
      </motion.header>
    </AnimatePresence>
  );
};

export default Header;
