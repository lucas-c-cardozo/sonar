'use client';

import { mockItems } from '@/data/mockData';
import { FilterState, IItem } from '@/types/item';
import { useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useItemStore() {
  const [items, setItems] = useState<IItem[]>(mockItems);

  const createItem = (item: Omit<IItem, 'id'>) => {
    setItems((prev) => [
      ...prev,
      { ...item, id: uuidv4() }
    ])
    toast.success('Item adicionado!');
  }

  const updateItem = (updated: IItem) => {
    setItems((prev) => prev.toSpliced(
      prev.findIndex(({ id }) => id === updated.id),
      1,
      updated
    ));
    toast.success('Item atualizado!');
  }

  const deleteItem = (id: string) => {
    setItems((prev) => prev.toSpliced(
      prev.findIndex((i) => id === i.id),
      1
    ));
    toast.success('Item removido!');
  }

  return { items, createItem, updateItem, deleteItem };
}

// ─── Derived hooks ────────────────────────────────────────────────────────────
export function useFilteredItems(items: IItem[], filters: FilterState): IItem[] {
  return useMemo(() => {
    return items.filter((item) => {
      if (filters.title && !item.title.toLowerCase().includes(filters.title.toLowerCase())) return false;
      if (filters.artists.length && !filters.artists.some((a) => item.artists.includes(a))) return false;
      if (filters.genres.length && !filters.genres.some((g) => item.genres.includes(g))) return false;
      if (filters.tags.length && !filters.tags.some((t) => item.tags.includes(t))) return false;
      if (filters.types.length && !filters.types.includes(item.type)) return false;
      if (filters.lists.length && !filters.lists.some((l) => item.lists.includes(l))) return false;
      if (filters.recommendedBy.length && !(item.recommendedBy ?? []).some((r) => filters.recommendedBy.includes(r))) return false;
      return true;
    });
  }, [items, filters]);
}

export function useItemsByList(items: IItem[], listName: string): IItem[] {
  return useMemo(
    () => items.filter((i) => i.lists.includes(listName)),
    [items, listName]
  );
}
