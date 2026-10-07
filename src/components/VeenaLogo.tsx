import React from 'react';

interface VeenaLogoProps {
  size?: number;
  className?: string;
}

export const VeenaLogo: React.FC<VeenaLogoProps> = ({ size = 42, className = '' }) => {
  return (
    <div
      className={`relative rounded-full flex items-center justify-center bg-[#0d2e24] border-2 border-emerald-400/60 shadow-[0_0_12px_rgba(16,185,129,0.3)] ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-[72%] h-[72%]"
      >
        {/* Veena Instrument Stylized Silhouette */}
        {/* Main Resonator Gourd (Kudam) at bottom left */}
        <circle
          cx="38"
          cy="70"
          r="19"
          className="fill-emerald-400/30 stroke-emerald-300"
          strokeWidth="3.5"
        />
        <circle
          cx="38"
          cy="70"
          r="11"
          className="fill-emerald-400/50 stroke-emerald-200"
          strokeWidth="2"
        />

        {/* Long Neck (Dandi) angled upwards diagonally to top right */}
        <line
          x1="38"
          y1="70"
          x2="78"
          y2="22"
          className="stroke-emerald-300"
          strokeWidth="5"
          strokeLinecap="round"
        />

        {/* Secondary Gourd / Resonator (Sorakkai) near top */}
        <ellipse
          cx="68"
          cy="34"
          rx="7"
          ry="6"
          transform="rotate(-40 68 34)"
          className="fill-emerald-400/40 stroke-emerald-300"
          strokeWidth="2.5"
        />

        {/* Dragon / Yali Head & Pegbox at the top */}
        <path
          d="M78 22 C 84 16, 88 22, 83 28 C 80 30, 77 26, 78 22 Z"
          className="fill-emerald-300 stroke-emerald-200"
          strokeWidth="1.5"
        />

        {/* Strings parallel lines */}
        <line
          x1="36"
          y1="68"
          x2="76"
          y2="20"
          className="stroke-emerald-100"
          strokeWidth="1.2"
        />
        <line
          x1="40"
          y1="72"
          x2="80"
          y2="24"
          className="stroke-emerald-100"
          strokeWidth="1.2"
        />

        {/* Frets along the neck */}
        <line x1="48" y1="56" x2="52" y2="60" className="stroke-emerald-200" strokeWidth="2" strokeLinecap="round" />
        <line x1="56" y1="46" x2="60" y2="50" className="stroke-emerald-200" strokeWidth="2" strokeLinecap="round" />
        <line x1="64" y1="36" x2="68" y2="40" className="stroke-emerald-200" strokeWidth="2" strokeLinecap="round" />

        {/* Tuning pegs */}
        <circle cx="79" cy="18" r="2.5" className="fill-emerald-200" />
        <circle cx="85" cy="24" r="2.5" className="fill-emerald-200" />
      </svg>
    </div>
  );
};
