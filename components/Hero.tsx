'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import PixelButton from './PixelButton';

type HeroProps = {
  onExplore: () => void;
  ready: boolean;
};

const heroText = "SUJITHA C B'S PORTFOLIO";

export default function Hero({ onExplore, ready }: HeroProps) {
  const reduceMotion = useReducedMotion();
  const [typed, setTyped] = useState('');

  useEffect(() => {
    if (!ready) {
      setTyped('');
      return;
    }

    let index = 0;
    setTyped('');

    const timer = window.setInterval(() => {
      index += 1;
      setTyped(heroText.slice(0, index));
      if (index >= heroText.length) {
        window.clearInterval(timer);
      }
    }, reduceMotion ? 1 : 70);

    return () => window.clearInterval(timer);
  }, [ready, reduceMotion]);

  return (
    <motion.section
      id="home"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 24 }}
      transition={{ duration: reduceMotion ? 0.01 : 0.7, ease: [0.2, 0.8, 0.2, 1] }}
      className="relative flex min-h-[calc(100vh-8.5rem)] items-center px-3 pt-8 sm:px-4 sm:pt-12"
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(10.5rem,13rem)] lg:gap-12 xl:grid-cols-[minmax(0,1.18fr)_minmax(11rem,14rem)]">
        <div className="mx-auto w-full max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 12 }}
            transition={{ duration: reduceMotion ? 0.01 : 0.45, delay: 0.1 }}
            className="pixel-font mb-4 text-center text-[10px] tracking-[0.18em] text-ink/90 sm:text-[11px] lg:text-center"
          >
            WELCOME TO
          </motion.div>

          <motion.div
            className="relative mx-auto w-full max-w-5xl"
            initial={{ opacity: 0, scale: 0.985 }}
            animate={{ opacity: ready ? 1 : 0, scale: ready ? 1 : 0.985 }}
            transition={{ duration: reduceMotion ? 0.01 : 0.55, delay: 0.18 }}
          >
            <div className="window-shadow noise-mask crt-hover scanline rounded-none border-[3px] border-black bg-[#f2e8d6]/90 px-4 py-4 sm:px-6 sm:py-5">
              <div className="hero-font text-[clamp(0.95rem,2.75vw,2rem)] leading-none tracking-[0.04em] text-burgundy sm:tracking-[0.05em]">
                <span className="inline-flex items-end gap-2">
                  <span>{typed || heroText}</span>
                  <motion.span
                    animate={reduceMotion ? undefined : { opacity: [0, 1, 0] }}
                    transition={reduceMotion ? undefined : { duration: 1, repeat: Infinity, ease: 'easeInOut' }}
                    className="mb-1 inline-block h-[1em] w-[0.45ch] bg-burgundy align-baseline"
                  />
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 10, scale: ready ? 1 : 0.96 }}
            transition={{ duration: reduceMotion ? 0.01 : 0.45, delay: 0.42 }}
            className="mt-6 flex justify-center"
          >
            <PixelButton onClick={onExplore} className="min-w-[8.25rem] px-2.5 py-1.5 text-[9px] sm:min-w-[9rem] sm:text-[10px]">
              EXPLORE MY WORK
            </PixelButton>
          </motion.div>
        </div>

        <motion.div
          className="flex justify-center lg:justify-end"
          initial={{ opacity: 0, x: 18, scale: 0.98 }}
          animate={{ opacity: ready ? 1 : 0, x: ready ? 0 : 18, scale: ready ? 1 : 0.98 }}
          transition={{ duration: reduceMotion ? 0.01 : 0.55, delay: 0.24, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <div className="film-strip-frame w-full max-w-[10.55rem] sm:max-w-[11.2rem] lg:max-w-[11.75rem]">
            <div className="film-strip-inner">
              <img
                src="/vintage-photostrip.png"
                alt="Vintage black-and-white photo strip of Sujitha"
                className="block h-auto w-full"
                loading="eager"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
