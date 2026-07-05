'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { HeadsetGlyph } from './RetroIcons';

type MusicPlayerProps = {
  isOpen: boolean;
  onClose: () => void;
  isMuted: boolean;
};

type Track = {
  title: string;
  artist: string;
  duration: number; // in seconds
  bpm: number;
  melody: { note: string; dur: number }[];
};

const NOTE_FREQS: Record<string, number> = {
  'G4': 392.00,
  'A4': 440.00,
  'B4': 493.88,
  'C5': 523.25,
  'D5': 587.33,
  'E5': 659.25,
  'F5': 698.46,
  'G5': 783.99,
  'A5': 880.00,
};

const TRACKS: Track[] = [
  {
    title: 'Sunflower',
    artist: 'Post Malone, Swae Lee',
    duration: 158, // 2:38
    bpm: 105,
    melody: [
      // Chorus melody
      { note: 'F5', dur: 0.5 }, { note: 'F5', dur: 0.5 }, { note: 'F5', dur: 0.5 },
      { note: 'G5', dur: 0.5 }, { note: 'F5', dur: 1.5 }, { note: '', dur: 0.5 },
      
      { note: 'F5', dur: 0.5 }, { note: 'F5', dur: 0.5 }, { note: 'G5', dur: 0.5 },
      { note: 'A5', dur: 1.5 }, { note: 'A5', dur: 0.5 }, { note: 'G5', dur: 0.5 },
      { note: 'F5', dur: 0.5 }, { note: 'D5', dur: 1.5 }, { note: '', dur: 1.0 },
      
      { note: 'F5', dur: 0.5 }, { note: 'F5', dur: 0.5 }, { note: 'G5', dur: 0.5 },
      { note: 'A5', dur: 1.0 }, { note: 'G5', dur: 0.5 }, { note: 'F5', dur: 0.5 },
      { note: 'D5', dur: 1.5 }, { note: '', dur: 1.0 },
      
      { note: 'F5', dur: 0.5 }, { note: 'F5', dur: 0.5 }, { note: 'G5', dur: 0.5 },
      { note: 'A5', dur: 1.0 }, { note: 'A5', dur: 0.5 }, { note: 'F5', dur: 1.5 },
      { note: '', dur: 1.0 },
      
      { note: 'F5', dur: 0.5 }, { note: 'F5', dur: 0.5 }, { note: 'F5', dur: 0.5 },
      { note: 'G5', dur: 0.5 }, { note: 'F5', dur: 1.5 }, { note: '', dur: 0.5 },
      
      { note: 'F5', dur: 0.5 }, { note: 'F5', dur: 0.5 }, { note: 'F5', dur: 0.5 },
      { note: 'G5', dur: 0.5 }, { note: 'F5', dur: 2.0 }, { note: '', dur: 2.0 },
    ]
  },
  {
    title: 'Circles',
    artist: 'Post Malone',
    duration: 215, // 3:35
    bpm: 120,
    melody: [
      // "Run away, but we're running in circles" chorus hook
      { note: 'C5', dur: 0.5 }, { note: 'C5', dur: 0.5 }, { note: 'B4', dur: 0.5 }, { note: 'A4', dur: 0.5 },
      { note: 'B4', dur: 0.5 }, { note: 'C5', dur: 0.5 }, { note: 'B4', dur: 0.5 }, { note: 'A4', dur: 0.5 },
      { note: 'B4', dur: 1.0 }, { note: 'G4', dur: 1.0 }, { note: '', dur: 1.0 },
      
      { note: 'C5', dur: 0.5 }, { note: 'C5', dur: 0.5 }, { note: 'B4', dur: 0.5 }, { note: 'A4', dur: 0.5 },
      { note: 'B4', dur: 0.5 }, { note: 'C5', dur: 0.5 }, { note: 'B4', dur: 0.5 }, { note: 'A4', dur: 0.5 },
      { note: 'E5', dur: 1.0 }, { note: 'D5', dur: 1.0 }, { note: '', dur: 1.0 },
    ]
  }
];

export default function MusicPlayer({ isOpen, onClose, isMuted }: MusicPlayerProps) {
  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const masterVolume = 0.4;

  const activeTrack = TRACKS[trackIndex];
  const beatDuration = 60 / activeTrack.bpm;

  // Refs for Web Audio synthesizer loop
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const schedulerIntervalRef = useRef<number | null>(null);
  const nextNoteTimeRef = useRef<number>(0);
  const melodyIndexRef = useRef<number>(0);
  const timerIntervalRef = useRef<number | null>(null);

  // Synchronize audio context volume and mute state changes
  useEffect(() => {
    if (masterGainRef.current && audioCtxRef.current) {
      masterGainRef.current.gain.setValueAtTime(
        isMuted ? 0 : masterVolume * 0.12,
        audioCtxRef.current.currentTime
      );
    }
  }, [isMuted]);

  // Clean up timers and audio nodes on unmount
  useEffect(() => {
    return () => {
      cleanupAudio();
    };
  }, []);


  const cleanupAudio = () => {
    if (schedulerIntervalRef.current) {
      window.clearInterval(schedulerIntervalRef.current);
      schedulerIntervalRef.current = null;
    }
    if (timerIntervalRef.current) {
      window.clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    if (audioCtxRef.current) {
      audioCtxRef.current.close().catch(() => {});
      audioCtxRef.current = null;
      masterGainRef.current = null;
    }
  };

  const playTone = (ctx: AudioContext, freq: number, startTime: number, duration: number) => {
    if (!masterGainRef.current) return;

    // Main melody oscillator (triangle wave)
    const osc = ctx.createOscillator();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, startTime);

    // Sub-bass oscillator (sine wave, 1 octave lower)
    const subOsc = ctx.createOscillator();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(freq / 2, startTime);

    // Audio envelope gain node
    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0, startTime);
    // Short attack to avoid clicks
    gainNode.gain.linearRampToValueAtTime(0.7, startTime + 0.02);
    // Decay/sustain
    gainNode.gain.setValueAtTime(0.7, startTime + duration - 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc.connect(gainNode);
    subOsc.connect(gainNode);
    gainNode.connect(masterGainRef.current);

    osc.start(startTime);
    osc.stop(startTime + duration);
    subOsc.start(startTime);
    subOsc.stop(startTime + duration);
  };

  const startSynth = (_track: Track) => {
    // Showcase only: no actual audio playback.
    return;
  };

  const stopSynth = () => {
    if (schedulerIntervalRef.current) {
      window.clearInterval(schedulerIntervalRef.current);
      schedulerIntervalRef.current = null;
    }
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      // Pause
      setIsPlaying(false);
      stopSynth();
      if (timerIntervalRef.current) {
        window.clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
    } else {
      // Play
      setIsPlaying(true);
      startSynth(activeTrack);
      timerIntervalRef.current = window.setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= activeTrack.duration) {
            // Loop song
            melodyIndexRef.current = 0;
            if (audioCtxRef.current) {
              nextNoteTimeRef.current = audioCtxRef.current.currentTime + 0.1;
            }
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
  };

  const handleStop = () => {
    setIsPlaying(false);
    stopSynth();
    if (timerIntervalRef.current) {
      window.clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    setCurrentTime(0);
    melodyIndexRef.current = 0;
  };

  const handleNext = () => {
    const nextIdx = (trackIndex + 1) % TRACKS.length;
    switchTrack(nextIdx);
  };

  const handlePrev = () => {
    const prevIdx = (trackIndex - 1 + TRACKS.length) % TRACKS.length;
    switchTrack(prevIdx);
  };

  const switchTrack = (idx: number) => {
    // Stop current
    const wasPlaying = isPlaying;
    handleStop();
    setTrackIndex(idx);
    setCurrentTime(0);
    melodyIndexRef.current = 0;

    if (wasPlaying) {
      // Auto-start next song if previous was playing
      setTimeout(() => {
        setIsPlaying(true);
        const nextTrack = TRACKS[idx];
        startSynth(nextTrack);
        timerIntervalRef.current = window.setInterval(() => {
          setCurrentTime((prev) => {
            if (prev >= nextTrack.duration) {
              melodyIndexRef.current = 0;
              if (audioCtxRef.current) {
                nextNoteTimeRef.current = audioCtxRef.current.currentTime + 0.1;
              }
              return 0;
            }
            return prev + 1;
          });
        }, 1000);
      }, 80);
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
          className="fixed inset-0 z-50 bg-black/10"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.96 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="fixed bottom-[4.5rem] right-2 z-50 w-[19.5rem] border-[3px] border-black bg-[#f0e4cf] p-2.5 shadow-panel sm:right-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Scoped CSS styling for Win95 retro elements */}
            <style>{`
            .retro-btn {
              border: 2px solid;
              border-color: #ffffff #555555 #555555 #ffffff;
              background-color: #efe7db;
              box-shadow: 1px 1px 0 rgba(0,0,0,0.5);
              font-family: 'Press Start 2P', monospace;
            }
            .retro-btn:active {
              border-color: #555555 #ffffff #ffffff #555555;
              box-shadow: inset 1px 1px 1px rgba(0,0,0,0.6);
              transform: translate(0.5px, 0.5px);
            }
            .retro-slider {
              -webkit-appearance: none;
              width: 100%;
              height: 6px;
              background: #dfd5c2;
              border: 2px inset #000;
              outline: none;
            }
            .retro-slider::-webkit-slider-thumb {
              -webkit-appearance: none;
              appearance: none;
              width: 10px;
              height: 16px;
              background: #efe7db;
              border: 2px solid;
              border-color: #fff #555 #555 #fff;
              box-shadow: 1px 1px 0 rgba(0,0,0,0.4);
              cursor: pointer;
            }
            .retro-slider::-webkit-slider-thumb:active {
              border-color: #555 #fff #fff #555;
            }
            @keyframes led-glow {
              0%, 100% { opacity: 0.85; }
              50% { opacity: 1; }
            }
            @keyframes eq-bounce-1 {
              0%, 100% { transform: scaleY(0.2); opacity: 0.55; } 50% { transform: scaleY(1); opacity: 1; }
            }
            @keyframes eq-bounce-2 {
              0%, 100% { transform: scaleY(0.28); opacity: 0.55; } 50% { transform: scaleY(1.15); opacity: 1; }
            }
            @keyframes eq-bounce-3 {
              0%, 100% { transform: scaleY(0.35); opacity: 0.55; } 50% { transform: scaleY(0.95); opacity: 1; }
            }
            @keyframes eq-bounce-4 {
              0%, 100% { transform: scaleY(0.18); opacity: 0.55; } 50% { transform: scaleY(1.08); opacity: 1; }
            }
            @keyframes eq-bounce-5 {
              0%, 100% { transform: scaleY(0.3); opacity: 0.55; } 50% { transform: scaleY(0.9); opacity: 1; }
            }
            .eq-bar-1 { animation: eq-bounce-1 0.55s infinite ease-in-out; }
            .eq-bar-2 { animation: eq-bounce-2 0.7s infinite ease-in-out 0.1s; }
            .eq-bar-3 { animation: eq-bounce-3 0.45s infinite ease-in-out 0.2s; }
            .eq-bar-4 { animation: eq-bounce-4 0.8s infinite ease-in-out 0.05s; }
            .eq-bar-5 { animation: eq-bounce-5 0.62s infinite ease-in-out 0.15s; }
          `}</style>

          {/* Title Bar */}
          <div className="mb-2 flex items-center justify-between border-b-[2px] border-black bg-burgundy px-2 py-1 text-cream">
            <div className="flex items-center gap-1.5">
              <HeadsetGlyph className="h-3.5 w-3.5 fill-current" />
              <div className="pixel-font text-[9px] uppercase tracking-wider">CD Player</div>
            </div>
            <button
              onClick={onClose}
              className="flex h-5 w-5 items-center justify-center border border-black bg-[#efe7db] text-[11px] font-bold text-ink hover:bg-[#f8f0df] active:translate-y-px"
            >
              X
            </button>
          </div>

          {/* Main Display Grid */}
          <div className="grid grid-cols-[80px_1fr] items-start gap-2.5">
            {/* Left: Album Cover + Rotating Disc Visual */}
            <div className="flex flex-col items-center gap-1.5 pt-0.5">
              <div className="relative border-[2px] border-black bg-[#efe7db] p-1 shadow-[1px_1px_0_rgba(255,255,255,0.7)_inset]">
                <img
                  src="/sunflower_album_art.png"
                  alt="Sunflower album art"
                  style={{ imageRendering: 'pixelated' }}
                  className={`h-[80px] w-[80px] object-cover transition-transform duration-500 ${isPlaying ? 'scale-[1.03]' : ''}`}
                />
              </div>
            </div>

            {/* Right: Info & LED Panel */}
            <div className="flex min-h-[112px] flex-col gap-2">
              {/* LED Green Info Panel */}
              <div className="flex flex-1 flex-col justify-between border-[2px] border-black bg-[#131d13] p-2 text-[#22c55e] shadow-[inset_1px_1px_2px_rgba(0,0,0,0.8)] [animation:led-glow_4s_infinite]">
                <div className="overflow-hidden whitespace-nowrap">
                  <div className="pixel-font animate-pulse text-[8px] uppercase tracking-wide">
                    {isPlaying ? '• PLAYING •' : '• PAUSED •'}
                  </div>
                  <div className="pixel-font mt-1.5 truncate text-[9px] font-bold text-[#44ff44]">
                    {activeTrack.title}
                  </div>
                  <div className="truncate text-[13px] font-medium leading-none text-[#22c55e]/90">
                    {activeTrack.artist}
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between border-t border-[#22c55e]/20 pt-1.5">
                  {/* Digital Clock readout */}
                  <div className="font-mono text-[14px] font-semibold tracking-wider">
                    {formatTime(currentTime)} / {formatTime(activeTrack.duration)}
                  </div>

                  {/* Equalizer Visualizer */}
                  <div className="flex h-8 w-12 items-end gap-0.5 pb-0.5">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <div
                        key={num}
                        className="flex h-full w-1.5 items-end overflow-hidden"
                      >
                        <div
                          className={`h-full w-full rounded-[1px] bg-[#44ff44]/90 shadow-[0_0_4px_rgba(68,255,68,0.25)] ${
                            isPlaying ? `eq-bar-${num} origin-bottom` : 'h-[18%] opacity-65'
                          }`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Track Bar (Seeker) */}
          <div className="my-3.5 px-1">
            <input
              type="range"
              min={0}
              max={activeTrack.duration}
              value={currentTime}
              onChange={(e) => {
                const val = parseInt(e.target.value, 10);
                setCurrentTime(val);
                // Adjust melody play index based on time seeking
                const totalBeats = activeTrack.melody.length;
                const progressRatio = val / activeTrack.duration;
                melodyIndexRef.current = Math.floor(progressRatio * totalBeats) % totalBeats;
                if (audioCtxRef.current) {
                  nextNoteTimeRef.current = audioCtxRef.current.currentTime + 0.05;
                }
              }}
              className="retro-slider"
            />
          </div>

          {/* Bottom Panel Controls */}
          <div className="flex flex-col gap-2.5 border border-black/40 bg-[#dfd6c3] p-1.5">
            {/* Playback Buttons */}
            <div className="flex items-center justify-center gap-1.5">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  title="Previous Track"
                  onClick={handlePrev}
                  className="retro-btn h-7 w-7 text-[9px] flex items-center justify-center active:translate-y-px"
                >
                  ⏮
                </button>
                <button
                  type="button"
                  title="Play"
                  onClick={handlePlayPause}
                  className={`retro-btn h-7 px-3.5 text-[9px] flex items-center justify-center gap-1 active:translate-y-px ${isPlaying ? 'bg-[#dfd7cb] border-color-[#555_#fff_#fff_#555] shadow-[inset_1px_1px_1px_rgba(0,0,0,0.5)]' : ''}`}
                >
                  {isPlaying ? '❚❚' : '▶'}
                </button>
                <button
                  type="button"
                  title="Stop"
                  onClick={handleStop}
                  className="retro-btn h-7 w-7 text-[9px] flex items-center justify-center active:translate-y-px"
                >
                  ■
                </button>
                <button
                  type="button"
                  title="Next Track"
                  onClick={handleNext}
                  className="retro-btn h-7 w-7 text-[9px] flex items-center justify-center active:translate-y-px"
                >
                  ⏭
                </button>
              </div>

            </div>

          </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
