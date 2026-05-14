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
        (i) =>
          i.genres.includes(selectedGenre)
          && !items.some(item => item.id === i.id)
      );
      const pool = candidates.length > 0 ? candidates : items;
      const picked = pool[Math.floor(Math.random() * pool.length)];

      if (picked) {
        setRecommendation({
          ...picked,
          id: `rec-${Date.now()}`,
          isGeneratedRecommendation: true,
          recommendedBy: ['Sonar'],
          lists: [],
        });
      }
      setGenerating(false);
    }, 600);
  }, [selectedGenre, setGenerating, setRecommendation, items]);
}
