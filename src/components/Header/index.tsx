'use client';

import { useAuth } from '@/hooks/useAuth';
import { useState } from 'react';
import { AuthModal } from '@/components/AuthModal';

export function Header() {
  const { user, logout, isAuthenticated } = useAuth();
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <>
      <header className="w-full sticky top-0 z-40 bg-bg-surface-alt">
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

          {/* Right side: actions */}
          <div className="flex items-center gap-3 z-10">
            {isAuthenticated && user ? (
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex flex-col items-end">
                  <span className="text-sm font-semibold text-white">{user.name}</span>
                  <span className="text-xs text-white/70">{user.email}</span>
                </div>
                <button
                  type="button"
                  onClick={logout}
                  className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-white/10 border border-white/15 hover:bg-white/15 transition"
                >
                  Sair
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setIsAuthOpen(true)}
                className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-white/10 border border-white/15 hover:bg-white/15 transition"
              >
                Entrar / Cadastrar
              </button>
            )}

            {/* Decorative icons */}
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-white/40 animate-float animation-delay-0 hidden sm:block">
              <path d="M3 18v-6a9 9 0 0 1 18 0v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3v5zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3v5z" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </div>

          {/* Background decorative circles */}
          <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-white/5" />
          <div className="absolute -right-4 bottom-0 w-20 h-20 rounded-full bg-white/5" />
        </div>
      </header>

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  );
}
