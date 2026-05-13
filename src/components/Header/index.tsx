import React from 'react';

export function Header() {
  return (
    <header
      className="w-full sticky top-0 z-40"
      style={{
        background: 'linear-gradient(135deg, #5b21b6 0%, #7c3aed 100%)',
        boxShadow: '0 4px 20px rgba(91, 33, 182, 0.3)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between relative overflow-hidden">
        {/* Left side: logo */}
        <div className="flex items-center gap-3 z-10">
          {/* Play icon */}
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/15 backdrop-blur-sm">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>

          <div>
            <h1 className="text-2xl font-extrabold text-white tracking-wider leading-none">
              SONAR
            </h1>
            <p className="text-xs text-white/70 mt-0.5 tracking-wide">
              suas músicas, suas histórias
            </p>
          </div>
        </div>

        {/* Right side: decorative music icons */}
        <div className="flex items-center gap-3 z-10">
          {/* Headphone icon */}
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-white/40 animate-float" style={{ animationDelay: '0s' }}>
            <path d="M3 18v-6a9 9 0 0 1 18 0v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3v5zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3v5z" stroke="currentColor" strokeWidth="1.5" />
          </svg>

          {/* Music notes */}
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-white/50 animate-float" style={{ animationDelay: '0.5s' }}>
            <path d="M9 18V5l12-2v13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="6" cy="18" r="3" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="18" cy="16" r="3" stroke="currentColor" strokeWidth="1.5" />
          </svg>

          {/* Speaker icon */}
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-white/40 animate-float" style={{ animationDelay: '1s' }}>
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.1" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07M19.07 4.93a10 10 0 0 1 0 14.14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>

        {/* Background decorative circles */}
        <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-white/5" />
        <div className="absolute -right-4 bottom-0 w-20 h-20 rounded-full bg-white/5" />
      </div>
    </header>
  );
}
