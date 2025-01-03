import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./Themetoggle";
import '../global.css'

const Header = () => {
  const [isCompact, setIsCompact] = useState(false);
  let lastScroll = 0;

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll > lastScroll && currentScroll > 50) {
        setIsCompact(true);
      } else if (currentScroll < lastScroll && currentScroll < 50) {
        setIsCompact(false);
      }
      lastScroll = Math.max(currentScroll, 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Variants sin layout
  const variants = {
    expanded: {
      width: "100%",
      height: 70,
      borderRadius: 0,
      left: 0,
      x: 0,
      top: 0,
      transition: {
        duration: 0.4,
        ease: "easeInOut",
      },
    },
    compact: {
      width: "340px",
      height: 60,
      borderRadius: 90,
      left: "50%",
      x: "-50%",
      top: 10,
      transition: {
        duration: 0.4,
        ease: "easeInOut",
      },
    },
  };

  return (
    <AnimatePresence>
      <div className="w-full z-50 fixed top-0 left-0 right-0 h-[70px]">
      {/* Ya no usamos layout para que no intervenga con la interpolación de borderRadius */}
      <motion.section
        className="fixed z-50 py-3 bg-[#eff3f4] dark:bg-[#1c1c1c] shadow-2xl"
        style={{ position: "fixed" }}
        variants={variants}
        initial="expanded"
        animate={isCompact ? "compact" : "expanded"}
        // (Podríamos poner transition aquí también, 
        //  pero ya lo pusimos en cada variante.)
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
          <ThemeToggle />
        </div>

        {/* El botón con su animación de entrada/salida */}
        <AnimatePresence>
          {isCompact && (
            <motion.div
              key="island-btn"
              className="flex justify-center mt-2"
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
      </motion.section>
      </div>
    </AnimatePresence>
  );
};

export default Header;
