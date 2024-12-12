import { useEffect, useState } from "react";

export default function ThemeToggle() {
  // Estado inicial vacío porque no podemos acceder a localStorage en el servidor
  const [theme, setTheme] = useState("dark");

  // Sincronizar tema desde localStorage al montar el componente (solo en el cliente)
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme); // Actualiza el estado con el tema guardado
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  // Cambiar entre temas
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme); // Actualiza el estado
    localStorage.setItem("theme", newTheme); // Guarda el tema en localStorage
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 border rounded transition-colors duration-300 dark:bg-gray-800 dark:text-white bg-gray-200 text-black"
    >
      Toggle Dark Mode
    </button>
  );
}
