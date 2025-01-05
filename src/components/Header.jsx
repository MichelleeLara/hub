import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ThemeToggle from "./Themetoggle";
// import throttle from "lodash/throttle"; // O implementa tu propia.

const Header = () => {
  const [hidden, setHidden] = useState(false);
  const [visible, setVisible] = useState(false);
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
            setVisible(true);
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
      // en lugar de width: 100% => transform: scaleX( ? )?
      // o y: 0
      width: "100%",
      y: 0,
      borderRadius: 0,
      // etc
      transition: {
        type: "spring",
        duration: 0.4,
        stiffness: 450,
        damping: 28
      }
    },
    visible: {
      // width: "75%",
      y: 10,
      borderRadius: 60,
      transition: {
        type: "spring",
        duration: 0.4,
        stiffness: 450,
        damping: 28
      }
    },
    hidden: {
      y: "-70%", // se oculta por completo
      transition: {
        type: "spring",
        duration: 0.4,
        stiffness: 450,
        damping: 28
      }
    },
  };

  const currentVariant = hidden
    ? "hidden"
    : isStart
    ? "expanded"
    : "visible";

  return (
    <AnimatePresence>
      <div className="fixed top-0 left-0 w-full z-50  will-change-auto flex items-center justify-center">
        <motion.header
          className=" w-3/4 bg-[#eff3f4] dark:bg-[#1c1c1c]
                    py-3" // Para activar GPU
          style={{ transformOrigin: "top center" }}
          variants={variants}
          initial="visible"
          animate={currentVariant}
        >
          <div className="mx-6 flex gap-3 items-center justify-between">
            <div className="flex gap-3 items-center min-w-[168px]  ">
              <img src="/author.png" className="w-12 object-top" alt="Author" />
              <AnimatePresence>
                <div className="flex flex-col gap-0">
                  <p className="font-semibold text-sm dark:text-secondary">
                    {(currentVariant !== 'expanded') ? <span>Mich R.</span> : <span>Mich </span>}
                    {/* Mich{" "} */}
                    {(currentVariant === 'expanded') && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                      >
                        Rodriguez
                      </motion.span>
                    )}
                  </p>
                  <p className="text-xs font-medium text-terteary">
                    Frontend{" "}
                    {(currentVariant === 'expanded') && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                      >
                        React
                      </motion.span>
                    )}
                  </p>
                </div>
              </AnimatePresence>
            </div>


            <ThemeToggle />
          </div>
        </motion.header>
      </div>
    </AnimatePresence>
  );
};

export default Header;
