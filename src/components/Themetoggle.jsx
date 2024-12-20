import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("dark");

  // Sincronizar tema desde localStorage al montar el componente
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme); // Actualiza el estado con el tema guardado
    updateThemeClass(savedTheme); // Asegura que la clase correcta esté aplicada
  }, []);

  // Función para actualizar la clase del tema en el DOM
  const updateThemeClass = (theme) => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // Cambiar entre temas
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme); // Actualiza el estado
    localStorage.setItem("theme", newTheme); // Guarda el tema en localStorage
    updateThemeClass(newTheme); // Actualiza la clase en el DOM
  };

  return (
    <motion.div
      // Contenedor principal con animación del fondo
      className=" flex items-center justify-center transition-colors duration-500"
      
    >
      <motion.button
        onClick={toggleTheme}
        className="relative flex items-center w-20 h-9 rounded-full bg-gray-300 dark:bg-gray-700 transition-colors duration-500"
        whileTap={{ scale: 0.9 }}
      >
        {/* Ícono del toggle */}
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
              className="text-blue-400"
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
              className="text-yellow-400"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M12 7a5 5 0 1 1 -4.995 5.217l-.005 -.217l.005 -.217a5 5 0 0 1 4.995 -4.783z" />
            </motion.svg>
          )}
        </motion.div>
      </motion.button>
    </motion.div>
  );
}
