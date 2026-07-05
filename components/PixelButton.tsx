'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';
import type { PropsWithChildren } from 'react';

type PixelButtonProps = PropsWithChildren<HTMLMotionProps<'button'>>;

export default function PixelButton({ children, className = '', ...props }: PixelButtonProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.button
      whileHover={reduceMotion ? undefined : { y: -3, scale: 1.01 }}
      whileTap={{ y: 1, scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 380, damping: 24 }}
      className={[
        'pixel-font inline-flex items-center justify-center gap-3 rounded-none border-[3px] border-black bg-burgundy px-6 py-4 text-center text-xs text-cream shadow-retro outline-none transition-colors duration-150 hover:bg-[#7e121f] focus-visible:ring-2 focus-visible:ring-[#1a1a1a] focus-visible:ring-offset-2 focus-visible:ring-offset-cream sm:text-sm',
        className
      ].join(' ')}
      {...props}
    >
      {children}
    </motion.button>
  );
}
