import React, { useEffect, useRef } from "react";
import { motion, useSpring, useTransform, useInView } from "framer-motion";
import { IconProjects } from "../icons/Icons";

const TracingBeam = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.4 }); // Detecta si el elemento está 40% en el viewport
  const scrollYProgress = useSpring(0, { stiffness: 100, damping: 20 }); // Suaviza la animación

  // Actualizamos el progreso del scroll solo si el elemento está en el viewport
  const updateProgress = () => {
    if (isInView && containerRef.current) {
      const { top, bottom, height } = containerRef.current.getBoundingClientRect();

      // Calculamos el progreso RELATIVO desde el momento que entra
      const visibleHeight = window.innerHeight * 0.4; // La altura visible (40%)
      const progress = Math.max(0, Math.min(1, (visibleHeight - top) / (height - visibleHeight)));

      scrollYProgress.set(progress);
    }
  };

  useEffect(() => {
    if (isInView) {
      window.addEventListener("scroll", updateProgress);
      window.addEventListener("resize", updateProgress);
      updateProgress(); // Llamada inicial
    }

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, [isInView]);

  // Convertimos el progreso en altura
  const height = useTransform(scrollYProgress, (value) => `${value * 100}%`);
  // Interpolación de colores para el ícono (de gris a azul)
  const iconColor = useTransform(scrollYProgress, [0, 1], ["#999999", "#148cfa"]);
  return (
    <div ref={containerRef} className="relative  flex flex-col items-center">
      {/* Icono Sticky */}
      <motion.div
        className="p-3 rounded-full bg-[#eff3f4] dark:bg-[#2c2c2c] sticky top-[72px] z-10"
        style={{
          color: iconColor, // Aplica el color interpolado al ícono
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} color={"currentColor"} fill={"none"}>
          <rect width="24" height="24" fill="transparent" />
          <path d="M2 14C2 11.1911 2 9.78661 2.67412 8.77772C2.96596 8.34096 3.34096 7.96596 3.77772 7.67412C4.78661 7 6.19108 7 9 7H15C17.8089 7 19.2134 7 20.2223 7.67412C20.659 7.96596 21.034 8.34096 21.3259 8.77772C22 9.78661 22 11.1911 22 14C22 16.8089 22 18.2134 21.3259 19.2223C21.034 19.659 20.659 20.034 20.2223 20.3259C19.2134 21 17.8089 21 15 21H9C6.19108 21 4.78661 21 3.77772 20.3259C3.34096 20.034 2.96596 19.659 2.67412 19.2223C2 18.2134 2 16.8089 2 14Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M16 7C16 5.11438 16 4.17157 15.4142 3.58579C14.8284 3 13.8856 3 12 3C10.1144 3 9.17157 3 8.58579 3.58579C8 4.17157 8 5.11438 8 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 11L6.65197 11.202C10.0851 12.266 13.9149 12.266 17.348 11.202L18 11M12 12V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>
      {/* Línea con efecto de degradado y brillo */}
      <div className="relative w-1 h-full overflow-hidden">
        {/* Línea principal */}
        <motion.div
          className="absolute top-0 left-0 w-full bg-gradient-to-t from-[#148cfa] to-transparent rounded-full"
          style={{
            height: height,
          }}
        />
        {/* Brillo en la punta */}
        {/* <motion.div
          className="absolute z-50 top-0 left-0 w-4 h-4 bg-[#35ff1a] rounded-full blur-lg"
          style={{
            translateY: height, // Se mueve junto con la línea
          }}
        /> */}
      </div>
    </div>
  );
};

export default TracingBeam;



// import React, { useState } from "react";
// import { motion, useAnimationFrame } from "framer-motion";

// const AnimatedLine = () => {
//   const [scrollYProgress, setScrollYProgress] = useState(0);

//   // Calculamos el progreso del scroll
//   useAnimationFrame(() => {
//     const scrollHeight = document.body.scrollHeight - window.innerHeight;
//     const currentScroll = window.scrollY;
//     const progress = currentScroll / scrollHeight;

//     setScrollYProgress(progress);
//   });

//   return (
//     <div className="flex flex-col items-center">
//       {/* Sticky Icon */}
//       <div className="p-2.5 rounded-full bg-[#eff3f4] text-[#616161] dark:bg-[#2c2c2c] sticky top-20 z-10">
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           viewBox="0 0 24 24"
//           width="20"
//           height="20"
//           color="currentColor"
//           fill="none"
//         >
//           <rect width="24" height="24" fill="transparent" />
//           <path
//             d="M2 14C2 11.1911 2 9.78661 2.67412 8.77772C2.96596 8.34096 3.34096 7.96596 3.77772 7.67412C4.78661 7 6.19108 7 9 7H15C17.8089 7 19.2134 7 20.2223 7.67412C20.659 7.96596 21.034 8.34096 21.3259 8.77772C22 9.78661 22 11.1911 22 14C22 16.8089 22 18.2134 21.3259 19.2223C21.034 19.659 20.659 20.034 20.2223 20.3259C19.2134 21 17.8089 21 15 21H9C6.19108 21 4.78661 21 3.77772 20.3259C3.34096 20.034 2.96596 19.659 2.67412 19.2223C2 18.2134 2 16.8089 2 14Z"
//             stroke="currentColor"
//             strokeWidth="1.5"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           />
//         </svg>
//       </div>
//       {/* Animated Line */}
//       <div className="relative w-1 h-full">
//         {/* Línea principal */}
//         <motion.div
//           className="absolute top-0 left-0 w-full bg-gradient-to-b from-[#FF7E7E] to-transparent dark:from-[#FF3C3C]"
//           style={{
//             height: `${scrollYProgress * 100}%`,
//             transformOrigin: "top",
//           }}
//         />
//         {/* Brillo en la punta */}
//         <motion.div
//           className="absolute w-4 h-4 rounded-full bg-[#FF7E7E] blur-md"
//           style={{
//             translateY: `${scrollYProgress * 100}%`,
//             left: "-6px", // Centra el brillo
//           }}
//         />
//       </div>
//     </div>
//   );
// };

// export default AnimatedLine;
