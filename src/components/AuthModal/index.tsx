'use client';

import { useAuth } from '@/hooks/useAuth';
import { useEffect, useMemo, useState } from 'react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const { login, register } = useAuth();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setName('');
      setEmail('');
      setPassword('');
      setError('');
      setSuccess('');
      setMode('login');
    }
  }, [isOpen]);

  const title = useMemo(() => (mode === 'login' ? 'Entrar' : 'Criar conta'), [mode]);

  if (!isOpen) return null;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (mode === 'login') {
      const result = login(email, password);
      if (!result.success) {
        setError(result.error || 'Erro ao entrar.');
        return;
      }
      setSuccess('Login realizado com sucesso!');
      onClose();
      return;
    }

    const result = register(name, email, password);
    if (!result.success) {
      setError(result.error || 'Erro ao cadastrar.');
      return;
    }
    setSuccess('Conta criada com sucesso!');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl animate-fade-in bg-white border border-border shadow-[0_1.5625rem_5rem] shadow-black/15"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 className="text-lg font-bold text-text-primary">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg transition-colors duration-150 text-lg text-text-muted bg-transparent hover:bg-bg-surface"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          {mode === 'register' && (
            <div>
              <label className="block text-xs font-semibold mb-1.5 text-text-primary">Nome</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg px-3 py-2.5 text-sm text-text-primary outline-none border border-border bg-white"
                placeholder="Seu nome"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold mb-1.5 text-text-primary">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg px-3 py-2.5 text-sm text-text-primary outline-none border border-border bg-white"
              placeholder="seu@email.com"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1.5 text-text-primary">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg px-3 py-2.5 text-sm text-text-primary outline-none border border-border bg-white"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-sm text-danger">{error}</p>}
          {success && <p className="text-sm text-success">{success}</p>}

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl text-sm font-bold text-white transition-all duration-200 hover:opacity-90 bg-accent"
          >
            {mode === 'login' ? 'Entrar' : 'Cadastrar'}
          </button>
        </form>

        <div className="px-6 pb-6 text-sm text-text-secondary">
          {mode === 'login' ? (
            <p>
              Não tem conta?{' '}
              <button type="button" onClick={() => setMode('register')} className="font-semibold text-accent">
                Criar conta
              </button>
            </p>
          ) : (
            <p>
              Já possui conta?{' '}
              <button type="button" onClick={() => setMode('login')} className="font-semibold text-accent">
                Fazer login
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
