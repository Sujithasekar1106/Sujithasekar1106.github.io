'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ComponentType, SVGProps } from 'react';

type DesktopIconProps = {
  label: string;
  onClick: () => void;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  delay?: number;
  compact?: boolean;
};

export default function DesktopIcon({ label, onClick, icon: Icon, delay = 0, compact = false }: DesktopIconProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        delay,
        duration: reduceMotion ? 0.01 : 0.45,
        ease: [0.2, 0.8, 0.2, 1]
      }}
      whileHover={reduceMotion ? undefined : { y: -4, rotate: [-0.5, 0.5, 0], scale: 1.03 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={[
        'group flex flex-col items-center justify-center gap-1 rounded-sm p-1 text-center outline-none transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-burgundy/80',
        compact ? 'min-w-[3.75rem] sm:min-w-[4.25rem]' : 'min-w-[4.25rem] sm:min-w-[4.75rem]'
      ].join(' ')}
    >
      <span className="rounded-md border-2 border-black/15 bg-cream/40 p-0.5 shadow-[0_2px_0_rgba(255,255,255,0.55)_inset] transition-transform duration-150 group-hover:shadow-[0_2px_0_rgba(255,255,255,0.72)_inset,0_10px_18px_rgba(0,0,0,0.08)]">
        <Icon className={compact ? 'h-6 w-6 sm:h-7 sm:w-7' : 'h-7 w-7 sm:h-8 sm:w-8'} />
      </span>
      <span className="pixel-font max-w-[4.75rem] text-[7px] leading-4 text-ink sm:max-w-[5.25rem] sm:text-[8px]">
        {label}
      </span>
    </motion.button>
  );
}
