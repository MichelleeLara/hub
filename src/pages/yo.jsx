// src/pages/yo.jsx
import React from 'react';
import ThemeToggle from '../components/Themetoggle.jsx';

export default function Yo() {
  return (
    <main className="bg-white min-h-screen text-black dark:bg-[#161616] dark:text-gray-300 transition-colors duration-300">
      <ThemeToggle client:load />
      <p>Esta es la página "Yo".</p>
    </main>
  );
}
