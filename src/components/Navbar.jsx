import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("dark");
  const [isToggling, setIsToggling] = useState(false);

  // Sincronizar tema desde localStorage al montar el componente
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  // Cambiar entre temas con animación controlada
  const toggleTheme = () => {
    setIsToggling(true); // Activar animación
    const newTheme = theme === "dark" ? "light" : "dark";

    // Suavizar transición con un pequeño retraso
    setTimeout(() => {
      setTheme(newTheme);
      localStorage.setItem("theme", newTheme);
      document.documentElement.classList.toggle("dark", newTheme === "dark");
      setIsToggling(false); // Desactivar animación
    }, 500); // Tiempo para la animación
  };

  return (
    <motion.div
      // Contenedor animado para suavizar el fondo
      className="min-h-screen transition-colors duration-500 bg-gray-100 dark:bg-gray-900"
      initial={{ opacity: 1 }}
      animate={{
        backgroundColor: theme === "dark" ? "#1a202c" : "#f7fafc",
      }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {/* Botón para alternar temas */}
      <button
        onClick={toggleTheme}
        className="relative flex items-center w-20 h-9 rounded-full bg-[#dadada83] dark:bg-[#2c2c2c] transition-colors duration-500"
      >
        <motion.div
          className="absolute flex items-center justify-center w-10 h-10"
          initial={{
            left: theme === "dark" ? "4px" : "calc(100% - 44px)",
          }}
          animate={{
            left: theme === "dark" ? "4px" : "calc(100% - 44px)",
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
          }}
        >
          <AnimatePresence mode="wait">
            {theme === "dark" ? (
              <motion.svg
                key="moon"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="text-[#7e48ea]"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z" />
              </motion.svg>
            ) : (
              <motion.svg
                key="sun"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="text-yellow-500"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M12 7a5 5 0 1 1 -4.995 5.217l-.005 -.217l.005 -.217a5 5 0 0 1 4.995 -4.783z" />
              </motion.svg>
            )}
          </AnimatePresence>
        </motion.div>
      </button>
    </motion.div>
  );
}
