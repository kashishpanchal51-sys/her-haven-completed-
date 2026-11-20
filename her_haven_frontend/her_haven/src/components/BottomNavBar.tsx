import React from 'react';
import { useShop } from '../context/ShopContext';
import { ScreenType } from '../types';

export const BottomNavBar: React.FC = () => {
  const { currentScreen, navigateTo, cartItems, setSearchQuery } = useShop();

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleNav = (screen: ScreenType) => {
    if (screen === 'categories' && currentScreen === 'categories') {
      setSearchQuery('');
    }
    navigateTo(screen);
  };

  return (
    <nav
      aria-label="Mobile Navigation"
      className="fixed bottom-0 left-0 right-0 z-50 flex justify-center items-center pointer-events-none pb-safe"
    >
      <div className="w-full max-w-md px-margin-mobile mb-4 pointer-events-auto">
        <div className="w-full bg-surface/95 backdrop-blur-lg border border-outline-variant/40 shadow-lg rounded-full px-3 py-2 flex justify-around items-center">
          {/* Tab 1: Home */}
          <button
            onClick={() => handleNav('home')}
            aria-current={currentScreen === 'home' ? 'page' : undefined}
            className={`flex flex-col items-center justify-center transition-all duration-150 active:scale-95 py-1 px-3 ${
              currentScreen === 'home'
                ? "text-primary font-semibold relative after:content-[''] after:w-1 after:h-1 after:bg-primary after:rounded-full after:mt-1"
                : 'text-secondary font-normal hover:text-primary'
            }`}
          >
            <span
              className={`material-symbols-outlined text-[20px] ${
                currentScreen === 'home' ? 'fill-icon' : ''
              }`}
            >
              home
            </span>
            <span className="font-label-sm text-label-sm">Home</span>
          </button>

          {/* Tab 2: Categories */}
          <button
            onClick={() => handleNav('categories')}
            aria-current={currentScreen === 'categories' ? 'page' : undefined}
            className={`flex flex-col items-center justify-center transition-all duration-150 active:scale-95 py-1 px-3 ${
              currentScreen === 'categories'
                ? "text-primary font-semibold relative after:content-[''] after:w-1 after:h-1 after:bg-primary after:rounded-full after:mt-1"
                : 'text-secondary font-normal hover:text-primary'
            }`}
          >
            <span
              className={`material-symbols-outlined text-[20px] ${
                currentScreen === 'categories' ? 'fill-icon' : ''
              }`}
            >
              grid_view
            </span>
            <span className="font-label-sm text-label-sm">Categories</span>
          </button>

          {/* Tab 3: Search */}
          <button
            onClick={() => {
              handleNav('categories');
            }}
            className="flex flex-col items-center justify-center text-secondary font-normal hover:text-primary transition-all duration-150 active:scale-95 py-1 px-3"
          >
            <span className="material-symbols-outlined text-[20px]">search</span>
            <span className="font-label-sm text-label-sm">Search</span>
          </button>

          {/* Tab 4: Wishlist */}
          <button
            onClick={() => handleNav('wishlist')}
            aria-current={currentScreen === 'wishlist' ? 'page' : undefined}
            className={`flex flex-col items-center justify-center transition-all duration-150 active:scale-95 py-1 px-3 ${
              currentScreen === 'wishlist'
                ? "text-primary font-semibold relative after:content-[''] after:w-1 after:h-1 after:bg-primary after:rounded-full after:mt-1"
                : 'text-secondary font-normal hover:text-primary'
            }`}
          >
            <span
              className={`material-symbols-outlined text-[20px] ${
                currentScreen === 'wishlist' ? 'fill-icon' : ''
              }`}
            >
              favorite
            </span>
            <span className="font-label-sm text-label-sm">Wishlist</span>
          </button>

          {/* Tab 5: Bag */}
          <button
            onClick={() => handleNav('bag')}
            aria-current={currentScreen === 'bag' ? 'page' : undefined}
            className={`flex flex-col items-center justify-center transition-all duration-150 active:scale-95 py-1 px-3 relative ${
              currentScreen === 'bag'
                ? "text-primary font-semibold relative after:content-[''] after:w-1 after:h-1 after:bg-primary after:rounded-full after:mt-1"
                : 'text-secondary font-normal hover:text-primary'
            }`}
          >
            <span
              className={`material-symbols-outlined text-[20px] ${
                currentScreen === 'bag' ? 'fill-icon' : ''
              }`}
            >
              shopping_bag
            </span>
            <span className="font-label-sm text-label-sm">Bag</span>
            {totalCartCount > 0 && (
              <span className="absolute top-1 right-2.5 bg-primary text-on-primary font-label-sm text-[9px] min-w-4 h-4 px-1 rounded-full flex items-center justify-center font-bold">
                {totalCartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};
