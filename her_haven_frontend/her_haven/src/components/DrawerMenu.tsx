import React from 'react';
import { useShop } from '../context/ShopContext';

export const DrawerMenu: React.FC = () => {
  const { isDrawerOpen, setDrawerOpen, navigateTo, setSelectedCategory, setConciergeOpen, user } = useShop();

  if (!isDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-on-surface/40 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setDrawerOpen(false)}
      />

      {/* Drawer Panel */}
      <aside className="relative w-full max-w-xs bg-surface text-on-surface h-full shadow-2xl z-10 flex flex-col justify-between border-r border-outline-variant/30 animate-in slide-in-from-left duration-300">
        <div>
          {/* Header */}
          <div className="p-5 border-b border-outline-variant/30 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="font-headline-sm text-headline-sm italic text-primary">Her Haven</span>
              <span className="font-label-sm text-[10px] text-secondary tracking-widest uppercase">
                Haute Atelier & Salon
              </span>
            </div>
            <button
              onClick={() => setDrawerOpen(false)}
              aria-label="Close menu"
              className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-secondary hover:text-primary active:scale-95"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          {/* User Preview */}
          <div
            onClick={() => {
              setDrawerOpen(false);
              navigateTo('wishlist');
            }}
            className="p-4 bg-surface-container-low border-b border-outline-variant/20 flex items-center gap-3 cursor-pointer hover:bg-surface-container transition-colors"
          >
            <div className="w-11 h-11 rounded-full overflow-hidden ring-1 ring-primary/40">
              <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="font-label-md text-label-md font-semibold text-on-surface">{user.name}</p>
              <span className="font-label-sm text-[10px] text-primary font-medium">{user.membership}</span>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="p-4 space-y-1">
            <button
              onClick={() => {
                setDrawerOpen(false);
                navigateTo('home');
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-label-md text-label-md text-on-surface hover:bg-surface-container hover:text-primary transition-colors text-left"
            >
              <span className="material-symbols-outlined text-[20px] text-primary">home</span>
              <span>Sanctuary Storefront</span>
            </button>

            <button
              onClick={() => {
                setSelectedCategory('all');
                setDrawerOpen(false);
                navigateTo('categories');
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-label-md text-label-md text-on-surface hover:bg-surface-container hover:text-primary transition-colors text-left"
            >
              <span className="material-symbols-outlined text-[20px] text-primary">auto_awesome</span>
              <span>Discover Catalog (All)</span>
            </button>

            <button
              onClick={() => {
                setSelectedCategory('women');
                setDrawerOpen(false);
                navigateTo('categories');
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-label-md text-label-md text-on-surface hover:bg-surface-container hover:text-primary transition-colors text-left"
            >
              <span className="material-symbols-outlined text-[20px] text-secondary">styler</span>
              <span>Women's Wear & Couture</span>
            </button>

            <button
              onClick={() => {
                setSelectedCategory('perfumes');
                setDrawerOpen(false);
                navigateTo('categories');
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-label-md text-label-md text-on-surface hover:bg-surface-container hover:text-primary transition-colors text-left"
            >
              <span className="material-symbols-outlined text-[20px] text-secondary">local_florist</span>
              <span>The Fragrance Lounge</span>
            </button>

            <button
              onClick={() => {
                setSelectedCategory('jewellery');
                setDrawerOpen(false);
                navigateTo('categories');
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-label-md text-label-md text-on-surface hover:bg-surface-container hover:text-primary transition-colors text-left"
            >
              <span className="material-symbols-outlined text-[20px] text-secondary">diamond</span>
              <span>Artisanal Heritage Jewellery</span>
            </button>

            <button
              onClick={() => {
                setDrawerOpen(false);
                navigateTo('wishlist');
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-label-md text-label-md text-on-surface hover:bg-surface-container hover:text-primary transition-colors text-left"
            >
              <span className="material-symbols-outlined text-[20px] text-secondary">favorite</span>
              <span>Sanctuary Hub & Orders</span>
            </button>

            <button
              onClick={() => {
                setDrawerOpen(false);
                setConciergeOpen(true);
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-label-md text-label-md text-primary bg-primary-fixed/20 hover:bg-primary-fixed/40 transition-colors text-left"
            >
              <span className="material-symbols-outlined text-[20px] text-primary">support_agent</span>
              <span>Boutique Stylist Concierge</span>
            </button>
          </nav>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-outline-variant/30 text-center">
          <p className="font-body-sm text-[11px] text-secondary">
            Complimentary Pan-India Delivery • Code: <strong className="text-primary">HAVEN10</strong>
          </p>
          <p className="font-label-sm text-[10px] text-secondary/70 mt-1">© 2026 Her Haven Private Atelier</p>
        </div>
      </aside>
    </div>
  );
};
