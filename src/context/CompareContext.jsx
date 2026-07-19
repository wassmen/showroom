import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { cars } from '../data/cars';

const CompareContext = createContext(null);

const STORAGE_KEY = 'autoshowroom_compare';
const MAX_COMPARE = 3;

export function CompareProvider({ children }) {
  const [compareIds, setCompareIds] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(compareIds));
  }, [compareIds]);

  const toggleCompare = useCallback((id) => {
    setCompareIds(prev => {
      if (prev.includes(id)) return prev.filter(cid => cid !== id);
      if (prev.length >= MAX_COMPARE) return prev;
      return [...prev, id];
    });
  }, []);

  const removeFromCompare = useCallback((id) => {
    setCompareIds(prev => prev.filter(cid => cid !== id));
  }, []);

  const clearCompare = useCallback(() => {
    setCompareIds([]);
  }, []);

  const isInCompare = useCallback((id) => {
    return compareIds.includes(id);
  }, [compareIds]);

  const isMaxed = compareIds.length >= MAX_COMPARE;
  const compareList = cars.filter(c => compareIds.includes(c.id));

  return (
    <CompareContext.Provider value={{
      compareIds,
      compareList,
      toggleCompare,
      removeFromCompare,
      clearCompare,
      isInCompare,
      isMaxed,
      count: compareIds.length,
    }}>
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const ctx = useContext(CompareContext);
  if (!ctx) throw new Error('useCompare must be used within CompareProvider');
  return ctx;
}
