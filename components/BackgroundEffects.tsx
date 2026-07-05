'use client';

import { motion, useReducedMotion } from 'framer-motion';

export default function BackgroundEffects() {
  const reduceMotion = useReducedMotion();

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(107,15,26,0.06),transparent_35%),radial-gradient(circle_at_0%_100%,rgba(255,255,255,0.35),transparent_28%)]" />
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/5 to-transparent opacity-20" />
      <div className="absolute inset-0 animate-pulseSoft bg-[radial-gradient(circle_at_70%_40%,rgba(255,255,255,0.16),transparent_18%),radial-gradient(circle_at_25%_75%,rgba(107,15,26,0.06),transparent_18%)]" />
    </div>
  );
}
