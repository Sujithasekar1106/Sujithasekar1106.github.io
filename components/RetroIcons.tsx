import type { SVGProps } from 'react';

function baseIconProps(props: SVGProps<SVGSVGElement>) {
  return {
    viewBox: '0 0 64 64',
    shapeRendering: 'crispEdges' as const,
    ...props
  };
}

export function StartGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...baseIconProps(props)}>
      <rect x="5" y="5" width="24" height="24" fill="#f1b44c" />
      <rect x="31" y="5" width="24" height="24" fill="#68b7d7" />
      <rect x="5" y="31" width="24" height="24" fill="#6b0f1a" />
      <rect x="31" y="31" width="24" height="24" fill="#1b1b1b" />
      <rect x="5" y="5" width="50" height="50" fill="none" stroke="#151312" strokeWidth="3" />
    </svg>
  );
}

export function SoundGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...baseIconProps(props)}>
      <path d="M12 28h10l11-11v30L22 36H12z" fill="#151312" />
      <path d="M37 22c5 5 5 15 0 20" fill="none" stroke="#151312" strokeWidth="4" strokeLinecap="square" />
      <path d="M44 16c9 9 9 23 0 32" fill="none" stroke="#151312" strokeWidth="4" strokeLinecap="square" />
      <path d="M48 11c12 12 12 30 0 42" fill="none" stroke="#151312" strokeWidth="4" strokeLinecap="square" />
    </svg>
  );
}

export function HeadsetGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...baseIconProps(props)}>
      <path d="M16 30c0-9 7-16 16-16s16 7 16 16" fill="none" stroke="#151312" strokeWidth="4" strokeLinecap="square" />
      <rect x="12" y="28" width="8" height="18" rx="2" fill="#151312" />
      <rect x="44" y="28" width="8" height="18" rx="2" fill="#151312" />
      <path d="M18 44c2 4 6 7 14 7s12-3 14-7" fill="none" stroke="#151312" strokeWidth="4" strokeLinecap="square" />
      <rect x="27" y="43" width="10" height="4" fill="#6b0f1a" />
    </svg>
  );
}

export function ComputerGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...baseIconProps(props)}>
      <rect x="10" y="8" width="44" height="32" fill="#d6dee6" stroke="#151312" strokeWidth="3" />
      <rect x="16" y="14" width="32" height="20" fill="#3c55ff" />
      <path d="M19 26l6-5 5 3 8-7 6 5v6H19z" fill="#92f36a" />
      <rect x="18" y="42" width="28" height="5" fill="#b9a68f" stroke="#151312" strokeWidth="3" />
      <rect x="7" y="47" width="50" height="8" fill="#c7b7a0" stroke="#151312" strokeWidth="3" />
    </svg>
  );
}

export function FolderGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...baseIconProps(props)}>
      <path d="M8 18h16l6 6h26v24H8z" fill="#e6c64a" stroke="#151312" strokeWidth="3" />
      <path d="M8 18h16l4 4h28v6H8z" fill="#f6d96d" stroke="#151312" strokeWidth="3" />
      <path d="M8 23h48" stroke="#b88a19" strokeWidth="2" />
    </svg>
  );
}

export function DocumentGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...baseIconProps(props)}>
      <path d="M14 8h26l10 10v38H14z" fill="#f3f0ea" stroke="#151312" strokeWidth="3" />
      <path d="M40 8v12h12" fill="none" stroke="#151312" strokeWidth="3" />
      <path d="M20 24h18M20 31h18M20 38h18M20 45h12" stroke="#6b0f1a" strokeWidth="3" />
      <path d="M20 24l-3 3-2-2M20 31l-3 3-2-2M20 38l-3 3-2-2" stroke="#1f8f43" strokeWidth="3" fill="none" />
    </svg>
  );
}

export function EnvelopeGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...baseIconProps(props)}>
      <rect x="10" y="16" width="44" height="32" fill="#f3ddbd" stroke="#151312" strokeWidth="3" />
      <path d="M10 18l22 18 22-18" fill="none" stroke="#151312" strokeWidth="3" />
      <path d="M10 48l15-14M54 48L39 34" fill="none" stroke="#151312" strokeWidth="3" />
      <circle cx="32" cy="31" r="4" fill="#6b0f1a" />
    </svg>
  );
}

export function ResumeGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...baseIconProps(props)}>
      <rect x="16" y="8" width="32" height="48" rx="2" fill="#d7e3ef" stroke="#151312" strokeWidth="3" />
      <path d="M22 20h20M22 29h20M22 38h20M22 47h14" stroke="#6b0f1a" strokeWidth="4" />
      <rect x="20" y="11" width="8" height="8" fill="#6b0f1a" />
    </svg>
  );
}

export function GitHubGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...baseIconProps(props)}>
      <path d="M32 10c-12 0-22 10-22 22 0 10 7 19 17 21v-7c-7 1-9-3-9-3-1-3-3-4-3-4-2-1 0-1 0-1 2 0 3 2 3 2 2 3 5 2 6 1 0-2 1-3 2-4-5-1-10-3-10-11 0-2 1-5 3-6 0-1-1-3 0-5 0 0 2 0 6 3 2-1 4-1 7-1s5 0 7 1c4-3 6-3 6-3 1 2 0 4 0 5 2 1 3 4 3 6 0 8-5 10-10 11 1 1 2 2 2 5v7c10-2 17-11 17-21 0-12-10-22-22-22z" fill="#151312" />
    </svg>
  );
}

export function LinkedInGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...baseIconProps(props)}>
      <rect x="12" y="18" width="10" height="32" fill="#151312" />
      <circle cx="17" cy="12" r="5" fill="#151312" />
      <path d="M29 18h10v5c2-4 5-6 10-6 7 0 13 4 13 15v18H52V35c0-5-2-8-7-8-4 0-7 3-7 8v15H29z" fill="#151312" />
    </svg>
  );
}

export function HomeGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...baseIconProps(props)}>
      <path d="M10 31L32 12l22 19v20H10z" fill="#6b0f1a" stroke="#151312" strokeWidth="3" />
      <rect x="24" y="36" width="16" height="15" fill="#f5efe3" stroke="#151312" strokeWidth="3" />
    </svg>
  );
}

export function SkillsGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...baseIconProps(props)}>
      <rect x="10" y="10" width="44" height="44" rx="2" fill="#f4e4bf" stroke="#151312" strokeWidth="3" />
      <path d="M18 20h28M18 30h28M18 40h18" stroke="#6b0f1a" strokeWidth="4" />
      <rect x="18" y="18" width="6" height="6" fill="#1f8f43" />
      <rect x="18" y="28" width="6" height="6" fill="#1f8f43" />
      <rect x="18" y="38" width="6" height="6" fill="#1f8f43" />
    </svg>
  );
}

export function ContactGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...baseIconProps(props)}>
      <rect x="11" y="12" width="42" height="40" rx="3" fill="#f5d8bb" stroke="#151312" strokeWidth="3" />
      <circle cx="32" cy="26" r="8" fill="#f1c19d" stroke="#151312" strokeWidth="3" />
      <path d="M18 48c2-10 9-14 14-14s12 4 14 14" fill="none" stroke="#151312" strokeWidth="3" />
    </svg>
  );
}

export function SparkleGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...baseIconProps(props)}>
      <path d="M32 8l4 16 16 4-16 4-4 16-4-16-16-4 16-4z" fill="#6b0f1a" stroke="#151312" strokeWidth="2" />
    </svg>
  );
}
