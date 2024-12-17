// 'use cleint'
// "use client";
"use client";
import React, { useMemo } from "react";
import { motion } from "framer-motion";
import parse from "html-react-parser";

type AnimateFragmentsProps = {
  value: string;
  className?: string;
  filter?: boolean;
  duration?: number;
  delayBetweenFragments?: number;
};

// Variants para el contenedor (staggering) y cada fragmento (entrada animada)
const containerVariants = (delayBetweenFragments: number) => ({
  initial: {},
  animate: {
    transition: {
      staggerChildren: delayBetweenFragments,
    },
  },
});

const fragmentVariants = (filter: boolean, duration: number) => ({
  initial: {
    opacity: 0,
    filter: filter ? "blur(10px)" : "none",
  },
  animate: {
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration,
    },
  },
});

export const AnimateFragments = ({
  value,
  className,
  filter = true,
  duration = 0.5,
  delayBetweenFragments = 0.2,
}: AnimateFragmentsProps) => {
  
  // Función recursiva para procesar nodos: pueden ser strings o React elements
  const processNode = (node: React.ReactNode, keyPrefix: string = "node"): React.ReactNode => {
    // Si es texto plano, dividir en palabras
    if (typeof node === "string") {
      const words = node.split(/\s+/).filter((w) => w.trim() !== "");
      return words.map((word, i) => (
        <React.Fragment key={`${keyPrefix}-word-${i}`}>{word}&nbsp;</React.Fragment>
      ));
    }

    // Si es un elemento React, procesar sus children recursivamente
    if (React.isValidElement(node)) {
      if (node.props && node.props.children) {
        const childrenArray = React.Children.toArray(node.props.children);
        const processedChildren = childrenArray.map((child, idx) =>
          processNode(child, `${keyPrefix}-child-${idx}`)
        );

        // Devolver el mismo elemento con sus children procesados
        return React.cloneElement(node, { key: keyPrefix, children: processedChildren });
      }
      return React.cloneElement(node, { key: keyPrefix });
    }

    // Si no es string ni elemento React (null, undefined, etc.)
    return null;
  };

  // Parsear el HTML a nodos React y procesarlos
  const fragments = useMemo(() => {
    if (!value || typeof value !== "string" || !value.trim()) {
      return [];
    }

    const parsed = parse(value);
    const parsedArray = Array.isArray(parsed) ? parsed : [parsed];

    const processed = parsedArray
      .map((node, idx) => processNode(node, `root-${idx}`))
      .flat()
      .filter(Boolean);

    return processed;
  }, [value]);

  return (
    <motion.div
      className={`flex flex-wrap items-center gap-1 ${className || ""}`}
      variants={containerVariants(delayBetweenFragments)}
      initial="initial"
      animate="animate"
    >
      {fragments.map((fragment, idx) => (
        <motion.span
          key={`fragment-${idx}`}
          variants={fragmentVariants(filter, duration)}
          className="inline-block"
        >
          {fragment}
        </motion.span>
      ))}
    </motion.div>
  );
};



// "use client";
// import { useEffect } from "react";
// import { motion, stagger, useAnimate } from "framer-motion";

// export const TextGenerateEffect = ({
//   text,
//   className,
//   filter = true,
//   duration = 0.5,
// }: {
//   text: string; // Texto a animar
//   className?: string;
//   filter?: boolean;
//   duration?: number;
// }) => {
//   const [scope, animate] = useAnimate();

//   useEffect(() => {
//     animate(
//       "span",
//       {
//         opacity: 1,
//         filter: filter ? "blur(0px)" : "none",
//       },
//       {
//         duration: duration,
//         delay: stagger(0.2),
//       }
//     );
//   }, [scope, animate, filter, duration]);

//   return (
//     <motion.div ref={scope} className={`inline-block ${className}`}>
//       {text.split(" ").map((word, idx) => (
//         <motion.span
//           key={idx}
//           className="opacity-0 inline-block mx-1"
//           style={{
//             filter: filter ? "blur(10px)" : "none",
//           }}
//         >
//           {word}
//         </motion.span>
//       ))}
//     </motion.div>
//   );
// };
