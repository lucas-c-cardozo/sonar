import { IItem } from '@/types/item';
import { mockItems, mockGenres } from '@/data/mockData';
import { useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';

export function useRecommendation(selectedGenre: string, items: IItem[]): IItem | null {
  return useMemo(() => {
    if (!selectedGenre) return null;

    // Try to find a real item with this genre that is NOT already in generated recommendations
    const candidates = items.filter(
      (i) => i.genres.includes(selectedGenre) && !i.isGeneratedRecommendation
    );

    if (candidates.length > 0) {
      const picked = candidates[Math.floor(Math.random() * candidates.length)];
      return {
        ...picked,
        id: uuidv4(),
        isGeneratedRecommendation: true,
        recommendedBy: ['Sonar'],
        lists: [],
      };
    }

    // Fallback: pick any item
    const fallback = mockItems[Math.floor(Math.random() * mockItems.length)];
    return {
      ...fallback,
      id: uuidv4(),
      isGeneratedRecommendation: true,
      recommendedBy: ['Sonar'],
      lists: [],
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedGenre]);
}

export { mockGenres };
