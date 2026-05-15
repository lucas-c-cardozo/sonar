'use client';

import { mockItems } from '@/data/mockData';
import { FilterState, IItem } from '@/types/item';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

// ─── Global in-memory store ───────────────────────────────────────────────────
let _items: IItem[] = mockItems.filter(i => i.lists.length);
const _listeners = new Set<() => void>();

function subscribe(fn: () => void) {
  _listeners.add(fn);
  return () => _listeners.delete(fn);
}

function notify() {
  _listeners.forEach((fn) => fn());
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useItemStore() {
  const [, rerender] = useState(0);

  useEffect(() => {
    const unsub = subscribe(() => rerender((n) => n + 1));
    unsub();
  }, []);

  const items = _items;

  const createItem = useCallback((item: Omit<IItem, 'id'>) => {
    const newItem: IItem = { ...item, id: uuidv4() };
    _items = [..._items, newItem];
    notify();
    toast.success('Item adicionado!');
    return newItem;
  }, []);

  const updateItem = useCallback((updated: IItem) => {
    _items = _items.map((i) => (i.id === updated.id ? updated : i));
    notify();
    toast.success('Item atualizado!');
  }, []);

  const deleteItem = useCallback((id: string) => {
    _items = _items.filter((i) => i.id !== id);
    notify();
    toast.success('Item removido!');
  }, []);

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
