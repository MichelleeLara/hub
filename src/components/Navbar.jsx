import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconExplore, IconsMe, IconProjects, IconStack, IconServices, IconWhatsapp, IconLinkedin } from "../icons/Icons";
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
  const [activeTab, setActiveTab] = useState(tabs[0].id); // SSR estable
  const [isMounted, setIsMounted] = useState(false);
  
  // Referencia al contenedor principal del contenido.
  // Asegúrate de que en tu layout Astro el contenido principal esté dentro de un <main id="main-content"> o similar.
  const mainContentRef = useRef(null);

  useEffect(() => {
    setIsMounted(true);

    // Al montar, actualizamos la pestaña activa según localStorage o URL
    const savedTab = typeof window !== 'undefined' ? localStorage.getItem('activeTab') : null;
    const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/';
    const currentTab = tabs.find(tab => tab.path === currentPath);

    if (savedTab && tabs.some(tab => tab.id === savedTab)) {
      setActiveTab(savedTab);
    } else if (currentTab) {
      setActiveTab(currentTab.id);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && activeTab) {
      localStorage.setItem("activeTab", activeTab);
    }
  }, [activeTab]);

  const handleTabClick = async (e, tab) => {
    e.preventDefault(); // Evitamos la navegación completa
    setActiveTab(tab.id);

    // Actualizamos la URL sin recargar la página
    window.history.pushState(null, '', tab.path);

    // Obtenemos el nuevo contenido vía fetch
    const response = await fetch(tab.path, {
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    });
    const htmlText = await response.text();

    // Parseamos el HTML obtenido para extraer el contenido principal
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlText, 'text/html');

    // Suponiendo que tu contenido principal está dentro de <main id="main-content">
    const newMainContent = doc.querySelector('#main-content');
    const currentMainContent = document.querySelector('#main-content');

    if (newMainContent && currentMainContent) {
      // Reemplazamos el contenido actual por el nuevo
      currentMainContent.innerHTML = newMainContent.innerHTML;
    }
  };

  // Si aún no se ha montado, renderiza el estado SSR inicial (primera pestaña activa)
  // if (!isMounted) {
  //   return (
  //     <nav className="fixed bottom-0 left-0 right-0 border-t text-xs font-semibold text-[#616161] overflow-x-auto overflow-hidden flex gap-8 items-center no-scrollbar py-4 first:pl-5 last:pr-5 [&>li]:flex [&>li]:flex-col [&>li]:items-center [&>li]:gap-1 [&>li>svg]:text-[#8a8a8a] [&>li]:p-1.5 [&>li]:px-2.5 dark:bg-[#1c1c1c] dark:border-none">
  //       <ul className="no-scrollbar flex items-center justify-center text-center gap-8">
  //         {tabs.map((tab, index) => {
  //           const IconComponent = iconMap[tab.id.toLowerCase()];
  //           const isActive = (index === 0);
  //           return (
  //             <li
  //               key={tab.id}
  //               className={`relative rounded-full px-3 py-1.5 font-medium text-xs text-[#8a8a8a] gap-1 transition focus-visible:outline-2 ${
  //                 isActive ? "text-[#4a4a4a] dark:text-white" : ""
  //               }`}
  //               style={{ WebkitTapHighlightColor: "transparent" }}
  //             >
  //               <div className="flex flex-col items-center gap-1">
  //                 {isActive && (
  //                   <motion.span
  //                     layoutId="blend"
  //                     className="absolute inset-0 z-10 mix-blend-darken bg-[#eff3f4] rounded-lg border border-[#e1e1e3] dark:border-[#393939] dark:bg-[#2c2c2c] dark:mix-blend-lighten"
  //                   />
  //                 )}
  //                 <div className={`${isActive ? "text-white" : ""}`}>
  //                   <IconComponent />
  //                 </div>
  //                 {tab.label}
  //               </div>
  //             </li>
  //           );
  //         })}
  //       </ul>
  //     </nav>
  //   );
  // }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t text-xs font-semibold text-[#616161] overflow-x-auto overflow-hidden flex gap-8 items-center no-scrollbar py-4 first:pl-6 last:pr-6 [&>li]:flex [&>li]:flex-col [&>li]:items-center [&>li]:gap-1 [&>li>svg]:text-[#8a8a8a] [&>li]:p-1.5 [&>li]:px-2.5 dark:bg-[#1c1c1c] dark:border-none">
      <ul className="no-scrollbar flex items-center justify-center text-center gap-8">
        {tabs.map((tab) => {
          const IconComponent = iconMap[tab.id.toLowerCase()];
          const isActive = activeTab === tab.id;
          return (
            <li
              key={tab.id}
              onClick={(e) => handleTabClick(e, tab)}
              className={`relative rounded-full px-2 py-1.5 font-medium text-xs text-[#8a8a8a] gap-1 transition focus-visible:outline-2 ${
                isActive ? "text-[#000000] dark:text-white" : ""
              }dark:text-[#616161]`}
              style={{ WebkitTapHighlightColor: "transparent" }}
            >
              <a href={tab.path} className="flex flex-col items-center gap-1">
                <AnimatePresence mode="popLayout">
                  {isActive && (
                    <motion.span
                      key="active-bg"
                      layoutId="blend"
                      initial={{ opacity: 0 }}
                      animate={{ 
                        opacity: 1, 
                        // scale: 1,
                        transition: { 
                          duration: .2,
                          ease: "easeInOut"
                        }
                      }}
                      exit={{ 
                        opacity: 0, 
                        // scale: 1,
                        transition: { 
                          duration: .2,
                          ease: "easeInOut"
                        }
                      }}
                      className="absolute inset-0 z-10 mix-blend-darken bg-[#eff3f4] rounded-lg border  border-[#e1e1e3] dark:border-[#393939] dark:bg-[#2c2c2c] dark:mix-blend-lighten"
                    />
                  )}
                </AnimatePresence>
                <div className={`flex flex-col gap-1 items-center justify-center${isActive ? "text-[#000000] dark:text-white" : "text-[#616161] dark:text-[#616161]"}`}>
                  <IconComponent />
                  <p className="">
                    {tab.label}
                  </p>
                </div>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
