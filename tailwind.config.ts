import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        '15': 'repeat(15, 200px)',
      },
      colors: {
        'sidenav-color' : '#1E2433',
        'sidenav-color-hover' : '#343A47'
      },
      fontSize: {
        'tinytiny': '0.6rem',
        'tiny': '0.7rem',
        'sm': '0.8rem',
        'base': '1rem',
        'md': '1.125rem',
        'xl': '1.25rem',
        '2xl': '1.563rem',
        '3xl': '1.953rem',
        '4xl': '2.441rem',
        '5xl': '3.052rem',
      },
      width: {
        'w-400' : '150rem'
      }
    },
    keyframes: {
      shimmer: {
        '100%': {
          transform: 'translateX(100%)',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
export default config;
