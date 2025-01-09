import React from "react";
import { motion } from "framer-motion";
import "../global.css"; // Asegúrate de crear este archivo CSS
 // Asegúrate de crear y configurar este archivo CSS

 export default function ShiningText() {
    const text = "Disponible para trabajar!";
    const letters = text.split("");
  
    // Variants para la animación de brillo
    const letterVariants = {
      initial: {
        opacity: 1,
      },
      animate: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
          repeat: Infinity,
          repeatDelay: 1,
        },
      },
    };
  
    const shineVariants = {
      initial: {
        x: "-100%",
      },
      animate: {
        x: "100%",
        transition: {
          duration: 1.5,
          ease: "easeInOut",
          repeat: Infinity,
          repeatDelay: 1,
        },
      },
    };
  
    return (
      <motion.div
        className="shining-text"
        initial="initial"
        animate="animate"
      >
        {letters.map((char, index) => (
          <motion.span
            key={index}
            variants={letterVariants}
            className="shining-letter"
          >
            {char}
            {char.trim() && (
              <motion.span
                className="shine"
                variants={shineVariants}
              />
            )}
          </motion.span>
        ))}
      </motion.div>
    );
  }