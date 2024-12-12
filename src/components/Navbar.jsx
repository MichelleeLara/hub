import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  IconExplore, IconsMe, IconProjects, IconStack, 
  IconServices, IconWhatsapp, IconLinkedin 
} from "../icons/Icons";
import '../style.css';

const tabs = [
  { id: "inicio", label: "Inicio", path: "/" },
  { id: "yo", label: "Yo", path: "/yo" },
  { id: "proyectos", label: "Proyectos", path: "/proyectos" },
  { id: "stack", label: "Stack", path: "/stack" },
  { id: "servicios", label: "Servicios", path: "/servicios" },
  { id: "linkedin", label: "Linkedin", path: "/linkedin" },
  { id: "whatsapp", label: "Whatsapp", path: "/whatsapp" },
];

const iconMap = {
  inicio: IconExplore,
  yo: IconsMe,
  proyectos: IconProjects,
  stack: IconStack,
  servicios: IconServices,
  whatsapp: IconWhatsapp,
  linkedin: IconLinkedin,
};

export default function AnimatedTabs() {
  // Iniciar siempre con la primera pestaña para evitar mismatches SSR/CSR
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Ya en el cliente, actualizamos según localStorage o URL
    const savedTab = localStorage.getItem('activeTab');
    const currentPath = window.location.pathname;
    const currentTab = tabs.find(tab => tab.path === currentPath);

    if (savedTab && tabs.some(t => t.id === savedTab)) {
      setActiveTab(savedTab);
    } else if (currentTab) {
      setActiveTab(currentTab.id);
    }
  }, []);

  useEffect(() => {
    if (isClient && activeTab) {
      localStorage.setItem("activeTab", activeTab);
    }
  }, [activeTab, isClient]);

  // Función para cambiar de pestaña sin recarga completa
  const handleTabClick = (tab) => {
    setActiveTab(tab.id);
    // Actualizamos la URL sin recargar la página
    window.history.pushState(null, '', tab.path);
  };

  if (!isClient) {
    // Evitar render en SSR hasta estar en cliente para no causar mismatch
    return null;
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t text-xs font-semibold text-[#616161] overflow-x-auto overflow-hidden flex gap-8 items-center no-scrollbar py-4 first:pl-5 last:pr-5 [&>li]:flex [&>li]:flex-col [&>li]:items-center [&>li]:gap-1 [&>li>svg]:text-[#8a8a8a] [&>li]:p-1.5 [&>li]:px-2.5 dark:bg-[#1c1c1c] dark:border-none">
      <ul className="no-scrollbar flex items-center justify-center text-center gap-8">
        {tabs.map((tab) => {
          const IconComponent = iconMap[tab.id.toLowerCase()];
          const isActive = activeTab === tab.id;

          return (
            <li
              key={tab.id}
              onClick={() => handleTabClick(tab)}
              className={`relative rounded-full px-3 py-1.5 font-medium text-xs text-[#8a8a8a] gap-1 transition focus-visible:outline-2 ${
                isActive ? "text-[#4a4a4a] dark:text-white" : ""
              }`}
              style={{
                WebkitTapHighlightColor: "transparent",
              }}
            >
              {/* Removemos la navegación vía href para evitar saltos de página.
                  Si quieres mantener el SEO, puedes dejar el 'a' sin cambiar href, 
                  pero asegurarte de prevenir el comportamiento por defecto en onClick. */}
              <button className="flex flex-col items-center gap-1">
                {isActive && (
                  <motion.span
                    layoutId="blend"
                    className="absolute inset-0 z-10 mix-blend-darken bg-[#eff3f4] rounded-lg border border-[#e1e1e3] dark:border-[#393939] dark:bg-[#2c2c2c] dark:mix-blend-lighten"
                    transition={{
                      type: "spring",
                      bounce: 0.3,
                      duration: 0.6,
                    }}
                  />
                )}
                <div className={`${isActive ? "text-white" : ""}`}>
                  <IconComponent />
                </div>
                {tab.label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
