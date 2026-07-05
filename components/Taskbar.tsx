'use client';

import { motion } from 'framer-motion';
import { HeadsetGlyph, SoundGlyph, StartGlyph } from './RetroIcons';

type TaskbarProps = {
  currentTime: string;
  onStartClick?: () => void;
  onMusicClick?: () => void;
  onVolumeClick?: () => void;
  isMusicActive?: boolean;
  isMusicMuted?: boolean;
};

export default function Taskbar({
  currentTime,
  onStartClick,
  onMusicClick,
  onVolumeClick,
  isMusicActive,
  isMusicMuted
}: TaskbarProps) {
  const controlShell =
    'relative flex h-9 w-9 items-center justify-center border-[2px] border-black bg-[#efe7db] text-ink shadow-[0_1px_0_rgba(255,255,255,0.65)_inset,0_1px_0_rgba(0,0,0,0.35)] transition-transform duration-150 hover:-translate-y-[1px] active:translate-y-[1px]';
  const activeControlShell =
    'relative flex h-9 w-9 items-center justify-center border-[2px] border-black bg-[#dfd7cb] text-ink shadow-[inset_2px_2px_4px_rgba(0,0,0,0.35)] translate-y-[1px]';

  return (
    <motion.footer
      initial={{ y: 18, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="fixed inset-x-0 bottom-0 z-30 border-t-[3px] border-black bg-[#d8cdc0]/95 px-2 py-2 backdrop-blur-[1px] sm:px-3"
    >
      <div className="mx-auto flex w-full items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <button
            type="button"
            onClick={onStartClick}
            aria-disabled={!onStartClick}
            className="flex items-center gap-2 border-[3px] border-black bg-[#e9e0d2] px-2.5 py-1.5 text-ink shadow-[0_2px_0_rgba(255,255,255,0.7)_inset,0_2px_0_rgba(0,0,0,0.65)] transition-transform duration-150 hover:-translate-y-[1px] active:translate-y-[1px]"
          >
            <StartGlyph className="h-5 w-5" />
            <span className="pixel-font hidden text-[11px] sm:inline">Start</span>
          </button>

        </div>

        <div className="flex min-w-0 items-center justify-end gap-2 overflow-hidden">
          <div className="flex items-center gap-2 border-l border-black/30 pl-2 sm:pl-3">
            <button
              type="button"
              onClick={onVolumeClick}
              aria-label={isMusicMuted ? 'Unmute music' : 'Mute music'}
              className={isMusicMuted ? activeControlShell : controlShell}
            >
              <span className="relative flex h-4 w-4 items-center justify-center sm:h-[18px] sm:w-[18px]">
                <SoundGlyph className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
                {isMusicMuted ? <span className="absolute h-5 w-[3px] rotate-45 bg-burgundy" /> : null}
              </span>
            </button>
            <button
              type="button"
              onClick={onMusicClick}
              aria-label="Now Playing"
              className={isMusicActive ? activeControlShell : controlShell}
            >
              <HeadsetGlyph className="h-4 w-4" />
            </button>
            <div className="pixel-font flex h-9 min-w-[5.5rem] items-center justify-center border-[2px] border-black bg-[#efe7db] px-2.5 text-center text-[10px] text-ink sm:min-w-[6rem]">
              {currentTime}
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
