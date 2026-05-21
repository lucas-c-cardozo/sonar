import { mockItems } from '@/data/mockData';
import { IItem } from '@/types/item';
import { useCallback } from 'react';

export function useRecommendation(
  selectedGenre: string,
  items: IItem[],
  setRecommendation: React.Dispatch<React.SetStateAction<IItem | null>>,
  setGenerating: React.Dispatch<React.SetStateAction<boolean>>
): () => void {
  return useCallback(() => {
    if (!selectedGenre) return;
    setGenerating(true);
    setRecommendation(null);

    setTimeout(() => {
      const candidates = mockItems.filter(
        (i) => i.genres.includes(selectedGenre)
      );

      const picked = candidates[Math.floor(Math.random() * candidates.length)];

      setRecommendation(
        picked
        ? {
          ...picked,
          id: `rec-${Date.now()}`,
          isGeneratedRecommendation: true,
          recommendedBy: ['Sonar'],
          lists: [],
        }
        : null
      );
      setGenerating(false);
    }, 600);
  }, [selectedGenre, setGenerating, setRecommendation, items]);
}
