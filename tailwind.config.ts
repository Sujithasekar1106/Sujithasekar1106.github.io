import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#F5EFE3',
        burgundy: '#6B0F1A',
        ink: '#151312',
        warmGray: '#B9AFA0',
        brass: '#C89D64'
      },
      boxShadow: {
        retro: '0 2px 0 rgba(255,255,255,0.65) inset, 0 3px 0 rgba(0,0,0,0.75), 0 18px 28px rgba(65,34,19,0.08)',
        panel: '0 1px 0 rgba(255,255,255,0.5) inset, 0 0 0 2px rgba(0,0,0,0.35), 0 14px 24px rgba(0,0,0,0.08)'
      },
      keyframes: {
        floaty: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' }
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.45', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.08)' }
        },
        scanline: {
          '0%': { transform: 'translateY(-20%)' },
          '100%': { transform: 'translateY(120%)' }
        }
      },
      animation: {
        floaty: 'floaty 8s ease-in-out infinite',
        pulseSoft: 'pulseSoft 4s ease-in-out infinite',
        scanline: 'scanline 9s linear infinite'
      }
    }
  },
  plugins: []
};

export default config;
