'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { PropsWithChildren } from 'react';

type WindowFrameProps = PropsWithChildren<{
  title: string;
  subtitle?: string;
  className?: string;
  onClose?: () => void;
}>;

export default function WindowFrame({ title, subtitle, className = '', onClose, children }: WindowFrameProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: reduceMotion ? 0.01 : 0.55, ease: [0.2, 0.8, 0.2, 1] }}
      className={[
        'relative flex flex-col overflow-hidden border-[3px] border-black bg-[#f8f0df] shadow-panel',
        className
      ].join(' ')}
    >
      <div className="flex items-center justify-between gap-3 border-b-[3px] border-black bg-burgundy px-3 py-2 text-cream">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 border border-black bg-[#f7d46c] shadow-[1px_1px_0_rgba(0,0,0,0.4)]" />
          <div className="pixel-font text-[10px] sm:text-[11px]">{title}</div>
        </div>
        {onClose ? (
          <button
            type="button"
            aria-label={`Close ${title}`}
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center border border-black bg-[#f5efe3] text-[14px] font-bold leading-none text-ink transition-transform hover:-translate-y-px hover:bg-[#f8f0df] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f7d46c] focus-visible:ring-offset-2 focus-visible:ring-offset-burgundy"
          >
            X
          </button>
        ) : null}
      </div>
      {subtitle ? (
        <div className="border-b border-black/25 bg-[#f0e5d2] px-4 py-2 text-[14px] text-ink/75">
          {subtitle}
        </div>
      ) : null}
      <div className="relative flex-1 overflow-auto p-4 sm:p-6">{children}</div>
    </motion.section>
  );
}
