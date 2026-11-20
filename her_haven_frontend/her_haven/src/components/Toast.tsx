import React from 'react';
import { useShop } from '../context/ShopContext';

export const Toast: React.FC = () => {
  const { toastMessage } = useShop();

  if (!toastMessage) return null;

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 pointer-events-none px-4 w-full max-w-sm animate-in fade-in slide-in-from-top-3 duration-200">
      <div className="bg-on-surface text-surface px-4 py-2.5 rounded-xl shadow-xl border border-outline-variant/40 flex items-center justify-between gap-3 text-center">
        <div className="flex items-center gap-2 mx-auto">
          <span className="material-symbols-outlined text-primary-fixed text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            check_circle
          </span>
          <span className="font-label-md text-label-md text-surface font-medium">{toastMessage}</span>
        </div>
      </div>
    </div>
  );
};
