/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
      container: {
        center: true,
        padding: '1rem',
        screens: {
          'sm': '640px',
          'md': '768px',
          'lg': '1024px',
          'xl': '1024px',
          '2xl': '1024px',
        }
      }
    },
	},
	plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [],
  },
}
