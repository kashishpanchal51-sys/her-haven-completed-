import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, ScreenType, UserProfile, PresentationVariant } from '../types';
import { PRODUCTS, INITIAL_USER } from '../data/products';

interface ShopContextType {
  currentScreen: ScreenType;
  selectedProduct: Product;
  cartItems: CartItem[];
  wishlist: Product[];
  appliedCoupon: string | null;
  couponDiscount: number;
  user: UserProfile;
  isDrawerOpen: boolean;
  isConciergeOpen: boolean;
  isCheckoutOpen: boolean;
  toastMessage: string | null;
  searchQuery: string;
  selectedCategory: string;
  
  // Navigation & View Actions
  navigateTo: (screen: ScreenType, product?: Product) => void;
  setSelectedProduct: (product: Product) => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (cat: string) => void;
  setDrawerOpen: (open: boolean) => void;
  setConciergeOpen: (open: boolean) => void;
  setCheckoutOpen: (open: boolean) => void;
  showToast: (msg: string) => void;
  
  // Cart Actions
  addToCart: (product: Product, variant?: PresentationVariant, options?: { size?: string; color?: string; volume?: string; quantity?: number }) => void;
  removeFromCart: (id: string) => void;
  updateCartQty: (id: string, delta: number) => void;
  applyCouponCode: (code: string) => boolean;
  removeCouponCode: () => void;
  clearCart: () => void;
  
  // Wishlist Actions
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  moveWishlistToBag: (product: Product) => void;
  moveAllWishlistToBag: () => void;
  
  // Calculations
  cartSubtotal: number;
  cartTotal: number;
  freeShippingProgress: number; // 0 to 100
  amountNeededForFreeTier: number;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product>(PRODUCTS[0]);
  const [user] = useState<UserProfile>(INITIAL_USER);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>('HAVEN10');
  const [isDrawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [isConciergeOpen, setConciergeOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setCheckoutOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Initial cart items matching Screen 4
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'cart-1',
      productId: 'celestial-organza-lehenga',
      product: PRODUCTS[1], // Celestial Organza
      size: 'M',
      color: 'Alabaster Rose',
      quantity: 1,
      price: 8499,
      tagLabel: 'Couture',
    },
    {
      id: 'cart-2',
      productId: 'jasmine-blanc-extrait',
      product: PRODUCTS[0], // Jasmine Blanc
      volume: '100ml',
      quantity: 1,
      price: 3450,
      tagLabel: 'Pure Essence',
    },
    {
      id: 'cart-3',
      productId: 'rose-cut-kundan-bangles',
      product: PRODUCTS[4], // Rose Cut Kundan Bangles
      size: '2.6',
      quantity: 1,
      price: 2890,
      tagLabel: 'Fine Jewelry',
    },
  ]);

  // Initial wishlist items matching Screen 5
  const [wishlist, setWishlist] = useState<Product[]>([
    PRODUCTS[9], // Emerald Solitaire
    PRODUCTS[6], // Gilded Stiletto
    PRODUCTS[5], // Satin Wrap
    PRODUCTS[7], // Meenakari Kada
    PRODUCTS[1], // Celestial Organza
    PRODUCTS[0], // Jasmine Blanc
  ]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 2600);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const navigateTo = (screen: ScreenType, product?: Product) => {
    if (product) {
      setSelectedProduct(product);
    }
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCart = (
    product: Product,
    variant?: PresentationVariant,
    options?: { size?: string; color?: string; volume?: string; quantity?: number }
  ) => {
    const qty = options?.quantity || 1;
    const itemPrice = variant ? variant.price : product.price;

    setCartItems((prev) => {
      const existing = prev.find(
        (item) =>
          item.productId === product.id &&
          (!variant || item.selectedVariant?.id === variant.id) &&
          (!options?.size || item.size === options.size)
      );

      if (existing) {
        return prev.map((item) =>
          item.id === existing.id ? { ...item, quantity: item.quantity + qty } : item
        );
      }

      const newItem: CartItem = {
        id: `cart-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        productId: product.id,
        product,
        selectedVariant: variant,
        size: options?.size || 'Standard',
        color: options?.color,
        volume: options?.volume || (variant ? variant.name : undefined),
        quantity: qty,
        price: itemPrice,
        tagLabel: product.categoryLabel,
      };
      return [...prev, newItem];
    });

    showToast(`Added "${product.name}" to your Haven Bag`);
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    showToast('Item removed from your bag');
  };

  const updateCartQty = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const applyCouponCode = (code: string): boolean => {
    const trimmed = code.trim().toUpperCase();
    if (trimmed === 'HAVEN10' || trimmed === 'WELCOME10') {
      setAppliedCoupon(trimmed);
      showToast(`Coupon ${trimmed} applied! Saved 10%`);
      return true;
    }
    showToast('Invalid coupon code. Try HAVEN10');
    return false;
  };

  const removeCouponCode = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed');
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const toggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        showToast(`Removed "${product.name}" from Wishlist`);
        return prev.filter((p) => p.id !== product.id);
      } else {
        showToast(`Saved "${product.name}" to Sanctuary Wishlist`);
        return [...prev, product];
      }
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((p) => p.id === productId);
  };

  const moveWishlistToBag = (product: Product) => {
    addToCart(product);
    setWishlist((prev) => prev.filter((p) => p.id !== product.id));
    showToast(`Moved "${product.name}" to your bag`);
  };

  const moveAllWishlistToBag = () => {
    wishlist.forEach((prod) => addToCart(prod));
    setWishlist([]);
    showToast(`Moved all ${wishlist.length} saved items to your bag`);
  };

  // Pricing calculations
  const cartSubtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const couponDiscount = appliedCoupon ? Math.round(cartSubtotal * 0.1) : 0;
  const cartTotal = Math.max(0, cartSubtotal - couponDiscount);

  // Free shipping & gift box tier goal is ₹15,000
  const TIER_GOAL = 15000;
  const freeShippingProgress = Math.min(100, Math.round((cartSubtotal / TIER_GOAL) * 100));
  const amountNeededForFreeTier = Math.max(0, TIER_GOAL - cartSubtotal);

  return (
    <ShopContext.Provider
      value={{
        currentScreen,
        selectedProduct,
        cartItems,
        wishlist,
        appliedCoupon,
        couponDiscount,
        user,
        isDrawerOpen,
        isConciergeOpen,
        isCheckoutOpen,
        toastMessage,
        searchQuery,
        selectedCategory,
        navigateTo,
        setSelectedProduct,
        setSearchQuery,
        setSelectedCategory,
        setDrawerOpen,
        setConciergeOpen,
        setCheckoutOpen,
        showToast,
        addToCart,
        removeFromCart,
        updateCartQty,
        applyCouponCode,
        removeCouponCode,
        clearCart,
        toggleWishlist,
        isInWishlist,
        moveWishlistToBag,
        moveAllWishlistToBag,
        cartSubtotal,
        cartTotal,
        freeShippingProgress,
        amountNeededForFreeTier,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
