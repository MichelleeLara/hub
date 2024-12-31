/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'class',
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			screens: {
				// Agregando breakpoints personalizados
				'xs': '410px',  // Dispositivos pequeños
				'sm': '640px',  // Sobreescribir el predeterminado si lo necesitas
				'md': '768px',
				'lg': '1024px',
				'xl': '1280px',
				'2xl': '1536px',
				// Breakpoint adicional
				'3xl': '1920px',
			},
			colors: {
				'primary': "#148cfa",
				'secondary': "#F6F6F6", 
				'terteary': "#858585" 
			},
			animation: {
				spotlight: "spotlight 2s ease .75s 1 forwards",
			  },
			  keyframes: {
				spotlight: {
				  "0%": {
					opacity: 0,
					transform: "translate(-72%, -62%) scale(0.5)",
				  },
				  "100%": {
					opacity: 1,
					transform: "translate(-50%,-40%) scale(1)",
				  },
				},
			  },
		},
	},
	
	plugins: [],
}
