import { ITEM_TYPES } from '@/types/item';
import { z } from 'zod';

export const itemSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório.'),
  artists: z.array(z.string()).min(1, 'Adicione pelo menos um artista.'),
  type: z.enum(ITEM_TYPES as unknown as [string, ...string[]]),
  coverUrl: z.string().url('URL inválida.').optional().or(z.literal('')),
  recommendedBy: z.array(z.string()).optional().default([]),
  genres: z.array(z.string()).min(1, 'Adicione pelo menos um gênero.'),
  tags: z.array(z.string()).default([]),
  lists: z.array(z.string()).default([]),
});

export type ItemFormData = z.infer<typeof itemSchema>;
