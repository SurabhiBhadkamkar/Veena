import React, { useState } from 'react';
import illustrationImg from '../assets/images/veena_learning_girl_1791379798586.jpg';

export const VeenaIllustration: React.FC = () => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="relative flex items-center justify-end select-none pointer-events-none">
      {/* Background radial glow */}
      <div className="absolute -inset-4 bg-emerald-500/15 rounded-full blur-2xl pointer-events-none" />

      {/* Main Container */}
      <div className="relative flex items-center gap-2 md:gap-4">
        {/* Botanical Leaves frame surrounding the circle */}
        <div className="relative w-40 h-40 md:w-52 md:h-52 flex items-center justify-center">
          {/* Radiating decorative botanical SVG leaves behind & around circular badge */}
          <svg
            viewBox="0 0 200 200"
            className="absolute inset-0 w-full h-full text-emerald-400/40 pointer-events-none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Left Top Leaf cluster */}
            <path
              d="M32 75 C 15 65, 10 40, 28 35 C 45 30, 48 55, 32 75 Z"
              fill="currentColor"
              className="text-emerald-500/60"
            />
            <path
              d="M45 55 C 32 45, 30 25, 48 20 C 62 18, 65 38, 45 55 Z"
              fill="currentColor"
              className="text-emerald-400/50"
            />
            <path
              d="M18 95 C 4 88, 5 70, 18 64 C 30 60, 32 80, 18 95 Z"
              fill="currentColor"
              className="text-emerald-500/40"
            />

            {/* Top Right Leaf cluster */}
            <path
              d="M165 65 C 182 55, 185 30, 168 25 C 150 20, 148 45, 165 65 Z"
              fill="currentColor"
              className="text-emerald-500/60"
            />
            <path
              d="M150 45 C 165 35, 162 15, 145 12 C 130 10, 128 30, 150 45 Z"
              fill="currentColor"
              className="text-emerald-400/50"
            />

            {/* Bottom Left Leaf cluster */}
            <path
              d="M35 135 C 18 145, 15 170, 32 175 C 50 180, 52 155, 35 135 Z"
              fill="currentColor"
              className="text-emerald-500/50"
            />
            <path
              d="M52 158 C 40 170, 42 188, 58 190 C 72 192, 70 175, 52 158 Z"
              fill="currentColor"
              className="text-emerald-400/40"
            />

            {/* Bottom Right Leaf cluster */}
            <path
              d="M155 145 C 172 155, 175 180, 158 185 C 140 190, 138 165, 155 145 Z"
              fill="currentColor"
              className="text-emerald-500/50"
            />

            {/* Outer decorative ring */}
            <circle
              cx="100"
              cy="100"
              r="76"
              stroke="#10b981"
              strokeWidth="2"
              strokeDasharray="4 6"
              className="opacity-40"
            />
          </svg>

          {/* Central Circular Avatar / Art frame */}
          <div className="relative w-32 h-32 md:w-44 md:h-44 rounded-full overflow-hidden border-2 border-emerald-400/50 shadow-[0_0_25px_rgba(16,185,129,0.35)] bg-[#071c17] flex items-center justify-center">
            {!imgError ? (
              <img
                src={illustrationImg}
                alt="Veena Learning Companion"
                className="w-full h-full object-cover scale-105"
                onError={() => setImgError(true)}
              />
            ) : (
              /* Fallback Vector Illustration */
              <svg
                viewBox="0 0 160 160"
                className="w-full h-full"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Glowing backdrop */}
                <circle cx="80" cy="80" r="78" fill="#07221b" />
                <circle cx="80" cy="80" r="65" fill="#0b2e25" />
                <circle cx="80" cy="80" r="50" fill="#103c30" />

                {/* Hair Bun & Silhouette */}
                <ellipse cx="80" cy="46" rx="20" ry="22" fill="#03110d" />
                <circle cx="80" cy="30" r="10" fill="#03110d" />

                {/* Face & Neck */}
                <ellipse cx="80" cy="52" rx="14" ry="16" fill="#e8c8b0" />
                <path d="M74 65 L86 65 L88 78 L72 78 Z" fill="#dab298" />

                {/* Hair fringe */}
                <path
                  d="M66 42 C72 35, 88 35, 94 42 C92 48, 88 48, 80 44 C72 48, 68 48, 66 42 Z"
                  fill="#03110d"
                />

                {/* Eyes & Smile */}
                <path d="M72 50 Q75 52 78 50" stroke="#03110d" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M82 50 Q85 52 88 50" stroke="#03110d" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M77 58 Q80 61 83 58" stroke="#cf6258" strokeWidth="1.5" strokeLinecap="round" />

                {/* Green Indian Kurta / Dress */}
                <path
                  d="M60 78 C65 72, 95 72, 100 78 L115 140 C110 145, 50 145, 45 140 Z"
                  fill="#15803d"
                />

                {/* Veena Instrument */}
                <circle cx="56" cy="115" r="22" fill="#047857" stroke="#34d399" strokeWidth="2.5" />
                <line x1="56" y1="115" x2="118" y2="60" stroke="#34d399" strokeWidth="4" strokeLinecap="round" />
                <line x1="55" y1="113" x2="117" y2="58" stroke="#d1fae5" strokeWidth="1" />
                <ellipse cx="106" cy="72" rx="8" ry="7" fill="#059669" stroke="#34d399" strokeWidth="1.5" />

                {/* Hands Playing */}
                <ellipse cx="68" cy="104" rx="6" ry="4" fill="#e8c8b0" />
                <ellipse cx="98" cy="76" rx="6" ry="4" fill="#e8c8b0" />
              </svg>
            )}
            {/* Subtle inner shadow overlay */}
            <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-emerald-400/30 pointer-events-none" />
          </div>
        </div>

        {/* Cursive Handwriting Text: Learn, Explore, Grow */}
        <div className="flex flex-col justify-center items-start pl-1 sm:pl-2 select-none -space-y-1">
          <span className="font-script text-2xl sm:text-3xl md:text-4xl text-slate-100 font-semibold tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
            Learn
          </span>
          <span className="font-script text-2xl sm:text-3xl md:text-4xl text-emerald-200 font-semibold tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] pl-1">
            Explore
          </span>
          <span className="font-script text-2xl sm:text-3xl md:text-4xl text-emerald-300 font-semibold tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] pl-2">
            Grow
          </span>
        </div>
      </div>
    </div>
  );
};
