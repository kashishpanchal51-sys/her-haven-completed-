import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { HomeView } from './views/HomeView';
import { CatalogView } from './views/CatalogView';
import { ProductDetailView } from './views/ProductDetailView';
import { BagView } from './views/BagView';
import { WishlistView } from './views/WishlistView';
import { BottomNavBar } from './components/BottomNavBar';
import { DrawerMenu } from './components/DrawerMenu';
import { ConciergeChatModal } from './components/ConciergeChatModal';
import { CheckoutModal } from './components/CheckoutModal';
import { Toast } from './components/Toast';

const MainNavigator: React.FC = () => {
  const { currentScreen } = useShop();

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeView />;
      case 'categories':
        return <CatalogView />;
      case 'product-detail':
        return <ProductDetailView />;
      case 'bag':
        return <BagView />;
      case 'wishlist':
        return <WishlistView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="relative min-h-screen bg-background text-on-surface select-none">
      {/* Active Screen View */}
      {renderScreen()}

      {/* Floating Capsule Bottom Navigation Bar (Screens 1, 2, 4, 5) */}
      {currentScreen !== 'product-detail' && <BottomNavBar />}

      {/* Slide-out Atelier Menu Drawer */}
      <DrawerMenu />

      {/* Haven Styling Concierge Chat */}
      <ConciergeChatModal />

      {/* Seamless Express Checkout Drawer */}
      <CheckoutModal />

      {/* Toast Notification Container */}
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <MainNavigator />
    </ShopProvider>
  );
}
