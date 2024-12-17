/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'class',
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				'primary': "#148cfa",
				'secondary': "#F6F6F6", 
				'terteary': "#858585" 
			}
		},
	},
	
	plugins: [],
}
