import React, { useEffect, useState } from "react";
import { AnimatePresence, color, motion } from "framer-motion";
import ThemeToggle from "./Themetoggle";
// import throttle from "lodash/throttle"; // O implementa tu propia.

const Header = () => {
  const [hidden, setHidden] = useState(false);
  const [currentVariant, setCurrentVariant] = useState('expanded')

  let lastScroll = 0;

  useEffect(() => {
    // Ejemplo con requestAnimationFrame (sin lodash)
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScroll = window.scrollY;

          if (currentScroll > lastScroll) {
            setHidden(false);
            setCurrentVariant("hidden");
          } else if ( currentScroll < lastScroll && currentScroll > 130){
            setHidden(true);
            setCurrentVariant("visible");
          } else if (currentScroll < 130){
            setHidden(false);
            setCurrentVariant('expanded')
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

 // Puedes ajustar los valores de color a tu gusto
const variants = {
  expanded: {
    width: "100%",
    y: 0,
    borderRadius: 0,
    backgroundColor: "rgba(0,0,0,0)", // transparente
    transition: {
      // Aquí definimos transiciones separadas
      backgroundColor: {
        duration: .3,   // Duración para el color
        ease: "easeInOut",
        stiffness:100,
      },
      // Si deseas que las demás props (por ejemplo y, width, etc.) usen otra transición,
      // las declaras, o usas "default"
      default: {
        type: "spring",
        duration: 0.4,
        stiffness: 450,
        damping: 32
      }
    }
  },
  visible: {
    y: 10,
    width: "50%",
    borderRadius: 60,
    backgroundColor: "#1c1c1c",
    transition: {
      // Aquí definimos transiciones separadas
      backgroundColor: {
        duration: .3,   // Duración para el color
        ease: "easeInOut",
        stiffness:100
      },
      // Si deseas que las demás props (por ejemplo y, width, etc.) usen otra transición,
      // las declaras, o usas "default"
      default: {
        type: "spring",
        duration: 0.4,
        stiffness: 450,
        damping: 32
      }
    }
  },
  hidden: {
    y: "-80%", // se oculta por completo
    width: "50%",
    borderRadius: 60,
    backgroundColor: "#1c1c1c",
    transition: {
      // Aquí definimos transiciones separadas
      backgroundColor: {
        duration: .3,   // Duración para el color
        ease: "easeInOut",
        stiffness:100
      },
      // Si deseas que las demás props (por ejemplo y, width, etc.) usen otra transición,
      // las declaras, o usas "default"
      default: {
        type: "spring",
        duration: 0.4,
        stiffness: 450,
        damping: 32
      }
    }
  },
};

  console.log(currentVariant)

  return (
    <AnimatePresence>
      <div className="fixed top-0 left-0 w-full z-50  will-change-auto flex items-center justify-center">
        <motion.header
          className={`min-w-[310px] w-2/4   dark:shadow-none  py-3 ${currentVariant !== 'expanded' ? 'shadow-2xl border border-[#d2d2d2] dark:border-[#5c5c5c] ' : ''}`} // Para activar GPU
          // style={{ transformOrigin: "top center" }}
          variants={variants}
          initial="expanded"
          animate={currentVariant}
        >
          <div className="mx-6 flex gap-3 items-center justify-between">
            <div className="flex gap-1.5 items-center text-nowrap ">
              <img src="/author.png" className="w-12 object-top" alt="Author" />
              <AnimatePresence>
                <div className="flex flex-col gap-0">
                  <p className="font-semibold text-sm dark:text-secondary">
                    {(currentVariant !== 'expanded') ? <span>Mich R.</span> : <span>Mich </span>}
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
            <div className="flex items-center justify-center gap-2 text-secondary">
              <AnimatePresence>
                {/* Si está en modo hidden, NO mostramos el botón */}
                {(currentVariant !== 'expanded' && !hidden) && (
                  <motion.div
                    key="island-btn"
                    className="flex justify-center items-center text-xs rounded-xl py-1 px-2 gap-2"
                    /*  
                      * Aquí es donde agregamos x: 50 → x: 0 para que “nazca” desde la derecha 
                    */
                    initial={{ opacity: 0, scale: 0.8, y: -50 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8}}
                    transition={{ duration: 0.8, stiffness: 800, type: "spring", damping: 40 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={18} height={18} color={"currentColor"} fill={"none"}>
                      <path d="M4 7C4.58984 7.60684 6.15973 10 7 10C7.84027 10 9.41016 7.60684 10 7M7 9L7 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M4 13L4 14.5442C4 17.7892 4 19.4117 4.88607 20.5107C5.06508 20.7327 5.26731 20.9349 5.48933 21.1139C6.58831 22 8.21082 22 11.4558 22C12.1614 22 12.5141 22 12.8372 21.886C12.9044 21.8623 12.9702 21.835 13.0345 21.8043C13.3436 21.6564 13.593 21.407 14.0919 20.9081L18.8284 16.1716C19.4065 15.5935 19.6955 15.3045 19.8478 14.9369C20 14.5694 20 14.1606 20 13.3431V10C20 6.22876 20 4.34315 18.8284 3.17157C17.6569 2 15.7712 2 12 2M13 21.5V21C13 18.1716 13 16.7574 13.8787 15.8787C14.7574 15 16.1716 15 19 15H19.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p>CV</p>
                  </motion.div>
                )}
              </AnimatePresence>
              <ThemeToggle />
            </div>
          </div>
        </motion.header>
      </div>
    </AnimatePresence>
  );
};

export default Header;
