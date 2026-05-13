'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState } from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <>
      <ToastContainer
        position="bottom-right"
        theme="dark"
        toastStyle={{ background: '#1a1a2e', color: '#f0f0f0', border: '1px solid #2d2d4a' }}
      />
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </>
  );
}
