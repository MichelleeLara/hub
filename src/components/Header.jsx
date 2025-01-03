import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./Themetoggle";

const Header = () => {
  const [isCompact, setIsCompact] = useState(false);
  let lastScroll = 0;

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll > lastScroll && currentScroll > 200) {
        setIsCompact(true);
      } else if (currentScroll < lastScroll && currentScroll < 200) {
        setIsCompact(false);
      }
      lastScroll = currentScroll <= 0 ? 0 : currentScroll;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const variants = {
    expanded: {
      width: "100%",
      height: 70,
      borderRadius: "0px",    // << Asegúrate de tenerlo
      left: 0,
      x: 0,
      top: 0,
    },
    compact: {
      width: "340px",
      height: 60,
      borderRadius: "9999px", // << Y en el otro estado lo redondeas
      left: "50%",
      x: "-50%",
      top: 10,
    },
  };

  return (
    <AnimatePresence>
      <motion.section
        layout
        /* Quita clases como "rounded-" si las tenías. */
        className="fixed z-50 py-3 bg-[#eff3f4] dark:bg-[#1c1c1c]"
        variants={variants}
        initial="expanded"
        animate={isCompact ? "compact" : "expanded"}
        transition={{ duration: 0.4, ease: "easeInOut" }}
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

        {/* BOTÓN */}
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
      </motion.section>
    </AnimatePresence>
  );
};

export default Header;
