'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { GitHubGlyph, HomeGlyph, LinkedInGlyph, ResumeGlyph, SkillsGlyph, FolderGlyph, ContactGlyph } from './RetroIcons';

type StartMenuProps = {
  open: boolean;
  onClose: () => void;
  onNavigate: (id: string) => void;
  onExternal?: (url: string) => void;
};

const items = [
  { label: 'Home', id: 'home', icon: HomeGlyph },
  { label: 'Projects', id: 'projects', icon: FolderGlyph },
  { label: 'Skills', id: 'skills', icon: SkillsGlyph },
  { label: 'Resume', id: 'resume', icon: ResumeGlyph },
  { label: 'Contact', id: 'contact', icon: ContactGlyph },
  { label: 'GitHub', url: 'https://github.com/', icon: GitHubGlyph },
  { label: 'LinkedIn', url: 'https://www.linkedin.com/', icon: LinkedInGlyph }
] as const;

export default function StartMenu({ open, onClose, onNavigate, onExternal }: StartMenuProps) {
  const reduceMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.button
            type="button"
            aria-label="Close start menu"
            className="fixed inset-0 z-40 cursor-default bg-transparent"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: reduceMotion ? 0.01 : 0.18, ease: 'easeOut' }}
            className="fixed bottom-[4.5rem] left-3 z-50 w-[min(92vw,18rem)] overflow-hidden border-[3px] border-black bg-[#efe3cb] shadow-[0_18px_40px_rgba(0,0,0,0.18)] sm:bottom-[4.75rem] sm:left-5"
          >
            <div className="flex items-stretch border-b-[3px] border-black bg-burgundy text-cream">
              <div className="flex w-14 items-end justify-center bg-[#f0d57f] py-4">
                <div className="rotate-[-8deg]">
                  <span className="pixel-font text-[12px]">95</span>
                </div>
              </div>
              <div className="flex-1 px-3 py-3">
                <div className="pixel-font text-[11px]">SUJI OS MENU</div>
                <div className="mt-1 text-[14px] leading-5 text-cream/80">Jump to sections or open social links.</div>
              </div>
            </div>
            <div className="p-2">
              {items.map((item) => {
                const Icon = item.icon;
                const isLink = 'url' in item;
                return (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => {
                      onClose();
                      if (isLink && onExternal) {
                        onExternal(item.url);
                        return;
                      }
                      if ('id' in item) {
                        onNavigate(item.id);
                      }
                    }}
                    className="flex w-full items-center gap-3 border border-transparent px-3 py-2 text-left transition-colors hover:border-black hover:bg-[#f6edd9] focus-visible:border-black focus-visible:bg-[#f6edd9] focus-visible:outline-none"
                  >
                    <span className="rounded-sm border border-black/15 bg-cream p-1">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="pixel-font text-[11px] text-ink">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}
