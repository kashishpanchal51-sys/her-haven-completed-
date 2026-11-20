export type ScreenType = 'home' | 'categories' | 'product-detail' | 'bag' | 'wishlist';

export interface PresentationVariant {
  id: string;
  name: string;
  price: number;
  label?: string;
  isBestValue?: boolean;
}

export interface OlfactoryArchitecture {
  topLayer: {
    title: string;
    duration: string;
    notes: string;
  };
  heartAccord: {
    title: string;
    duration: string;
    notes: string;
  };
  baseResonance: {
    title: string;
    duration: string;
    notes: string;
  };
}

export interface Product {
  id: string;
  name: string;
  category: 'women' | 'perfumes' | 'jewellery' | 'footwear' | 'makeup';
  categoryLabel: string;
  subtitle: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  tag?: string; // "NEW SEASON" | "SIGNATURE" | "LIMITED" | "BESTSELLER" | "EXCLUSIVE"
  image: string;
  galleryImages?: string[];
  description: string;
  variants?: PresentationVariant[];
  olfactory?: OlfactoryArchitecture;
  specs?: {
    material?: string;
    origin?: string;
    sizes?: string[];
    heelHeight?: string;
    purity?: string;
  };
  crossSell?: {
    name: string;
    spec: string;
    price: number;
    image: string;
  };
  accordions?: {
    title: string;
    content: string;
  }[];
  stockAlert?: string; // "Only 2 Left" | "In Stock" | "Restocked" | "Limited Edition" | "EU 38"
  inStock: boolean;
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  selectedVariant?: PresentationVariant;
  size?: string;
  color?: string;
  volume?: string;
  quantity: number;
  price: number;
  tagLabel?: string;
}

export interface PatronReview {
  id: string;
  author: string;
  verified: boolean;
  rating: number;
  comment: string;
}

export interface UserProfile {
  name: string;
  email: string;
  membership: string;
  havenCoins: number;
  tier: string;
  avatarUrl: string;
  primaryAddress: {
    name: string;
    line1: string;
    city: string;
    pincode: string;
  };
}

export interface OrderTrackItem {
  id: string;
  orderNumber: string;
  status: string;
  statusDetail: string;
  date: string;
  total: number;
  itemsCount: number;
  currentStep: number; // 0, 1, 2, 3
}
