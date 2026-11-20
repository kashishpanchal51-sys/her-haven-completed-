import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { PresentationVariant } from '../types';
import { PRODUCTS } from '../data/products';

export const ProductDetailView: React.FC = () => {
  const {
    selectedProduct,
    navigateTo,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setCheckoutOpen,
    showToast,
  } = useShop();

  const product = selectedProduct || PRODUCTS[0];
  const wishlisted = isInWishlist(product.id);

  // Gallery slider state
  const galleryImages =
    product.galleryImages && product.galleryImages.length > 0
      ? product.galleryImages
      : [product.image, product.image, product.image, product.image];

  const [activeSlide, setActiveSlide] = useState(0);
  const [show360Modal, setShow360Modal] = useState(false);

  // Presentation variant selection
  const defaultVariant = product.variants ? product.variants[1] || product.variants[0] : undefined;
  const [selectedVariant, setSelectedVariant] = useState<PresentationVariant | undefined>(defaultVariant);
  const [quantity, setQuantity] = useState(1);

  // Accordion open/close state
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({
    'acc-0': false,
    'acc-1': false,
    'acc-2': false,
  });

  const toggleAccordion = (key: string) => {
    setOpenAccordions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.subtitle,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText?.(window.location.href);
      showToast('Sanctuary product link copied to clipboard');
    }
  };

  const currentPrice = selectedVariant ? selectedVariant.price : product.price;

  const handleAddToCart = () => {
    addToCart(product, selectedVariant, { quantity });
  };

  const handleBuyNow = () => {
    addToCart(product, selectedVariant, { quantity });
    setCheckoutOpen(true);
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface antialiased pb-36">
      {/* Top App Bar */}
      <header className="fixed top-0 left-0 w-full z-40 bg-surface/90 backdrop-blur-md transition-all duration-200 shadow-sm">
        <div className="max-w-md mx-auto h-16 px-margin-mobile flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => navigateTo('categories')}
              aria-label="Go back"
              className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface hover:text-primary active:scale-95 transition-transform duration-150 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[24px]">arrow_back</span>
            </button>
            <div className="overflow-hidden">
              <p className="font-label-sm text-label-sm text-secondary uppercase tracking-widest leading-tight">
                Maison
              </p>
              <h1 className="font-label-md text-label-md font-semibold text-on-surface truncate max-w-[180px]">
                {product.name}
              </h1>
            </div>
          </div>

          <div className="flex items-center space-x-1">
            <button
              onClick={handleShare}
              aria-label="Share product"
              className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface hover:text-primary active:scale-95 transition-transform duration-150 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">share</span>
            </button>

            <button
              onClick={() => toggleWishlist(product)}
              aria-label="Toggle wishlist"
              className={`w-10 h-10 rounded-full flex items-center justify-center active:scale-95 transition-transform duration-150 cursor-pointer ${
                wishlisted ? 'text-primary' : 'text-on-surface hover:text-primary'
              }`}
            >
              <span
                className="material-symbols-outlined text-[22px]"
                style={{ fontVariationSettings: wishlisted ? "'FILL' 1" : "'FILL' 0" }}
              >
                favorite
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Canvas */}
      <main className="pt-16 max-w-md mx-auto overflow-x-hidden">
        {/* Full-Bleed High-Res Media Gallery */}
        <section className="relative w-full aspect-[4/5] bg-surface-container-low overflow-hidden">
          {/* Active Image */}
          <div className="w-full h-full relative">
            <img
              src={galleryImages[activeSlide]}
              alt={`${product.name} view ${activeSlide + 1}`}
              className="w-full h-full object-cover transition-all duration-300"
            />
          </div>

          {/* Navigation Overlay Arrows */}
          <button
            onClick={() => setActiveSlide((prev) => (prev > 0 ? prev - 1 : galleryImages.length - 1))}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-surface-container-lowest/70 backdrop-blur-md flex items-center justify-center text-on-surface hover:bg-surface-container-lowest shadow-sm cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">chevron_left</span>
          </button>
          <button
            onClick={() => setActiveSlide((prev) => (prev < galleryImages.length - 1 ? prev + 1 : 0))}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-surface-container-lowest/70 backdrop-blur-md flex items-center justify-center text-on-surface hover:bg-surface-container-lowest shadow-sm cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">chevron_right</span>
          </button>

          {/* Interactive Overlay Badges */}
          <div className="absolute bottom-4 left-margin-mobile flex items-center space-x-2 z-10">
            <button
              onClick={() => setShow360Modal(true)}
              className="bg-surface-container-lowest/80 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center space-x-1.5 shadow-sm border border-outline-variant/30 text-on-surface active:scale-95 transition-transform duration-150 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px] text-primary">360</span>
              <span className="font-label-sm text-label-sm font-semibold tracking-wider uppercase">360° View</span>
            </button>
          </div>

          <div className="absolute bottom-4 right-margin-mobile z-10">
            <div className="bg-surface-container-lowest/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-outline-variant/30 shadow-sm font-label-sm text-label-sm text-secondary font-medium">
              <span>{activeSlide + 1}</span>/{galleryImages.length}
            </div>
          </div>
        </section>

        {/* Thumbnail Track */}
        <div className="flex gap-2 px-margin-mobile py-2 overflow-x-auto no-scrollbar">
          {galleryImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveSlide(idx)}
              className={`w-14 h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                activeSlide === idx ? 'border-primary shadow-sm scale-105' : 'border-transparent opacity-70'
              }`}
            >
              <img src={img} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>

        {/* Product Title & Header */}
        <section className="px-margin-mobile pt-space-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="font-label-sm text-label-sm text-primary tracking-widest uppercase font-semibold bg-secondary-container/40 px-2.5 py-1 rounded-full">
              {product.categoryLabel.toUpperCase()}
            </span>

            {/* Rating Pill */}
            <div className="flex items-center space-x-1 bg-surface-container-lowest px-2.5 py-1 rounded-full border border-outline-variant/30 shadow-sm">
              <span className="material-symbols-outlined text-[14px] text-primary fill-icon">star</span>
              <span className="font-label-md text-label-md font-semibold text-on-surface">{product.rating}</span>
              <span className="font-body-sm text-body-sm text-secondary">({product.reviewsCount} reviews)</span>
            </div>
          </div>

          <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface font-medium tracking-tight mb-2">
            {product.name}
          </h2>
          <p className="font-body-md text-body-md text-secondary leading-relaxed">{product.subtitle}</p>

          {/* Pricing Block */}
          <div className="mt-space-md p-space-md bg-surface-container-lowest rounded-xl border border-outline-variant/40 shadow-sm">
            <div className="flex items-baseline space-x-3">
              <span className="font-price-display text-[26px] font-bold text-primary">
                ₹{currentPrice.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="font-body-md text-body-md text-secondary line-through">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
              )}
              <span className="font-label-sm text-label-sm text-primary font-bold bg-primary-fixed px-2 py-0.5 rounded-full">
                25% OFF
              </span>
            </div>
            <div className="mt-2 flex items-center space-x-2 text-secondary font-label-md text-label-md">
              <span className="material-symbols-outlined text-[16px] text-primary">local_shipping</span>
              <span>Taxes included • Free Express Shipping</span>
            </div>
          </div>
        </section>

        {/* Variant / Bottle Size Selector */}
        {product.variants && product.variants.length > 0 && (
          <section className="px-margin-mobile pt-space-xl">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-label-lg text-label-lg text-on-surface font-semibold">Select Presentation</h3>
              <span className="font-label-sm text-label-sm text-secondary uppercase">Pure Extrait Concentrate</span>
            </div>
            <div className="grid grid-cols-3 gap-2.5">
              {product.variants.map((variant) => {
                const isSelected = selectedVariant?.id === variant.id;
                return (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(variant)}
                    className={`relative flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-200 active:scale-95 cursor-pointer ${
                      isSelected
                        ? 'border-2 border-primary bg-surface-container-low shadow-sm'
                        : 'border border-outline-variant/50 bg-surface-container-lowest hover:border-primary/50'
                    }`}
                  >
                    {variant.label && (
                      <span className="absolute -top-2.5 bg-primary text-on-primary font-label-sm text-[9px] px-1.5 py-0.5 rounded-full uppercase tracking-wider font-bold">
                        {variant.label}
                      </span>
                    )}
                    <span
                      className={`font-label-md text-label-md ${
                        isSelected ? 'font-bold text-primary' : 'font-semibold text-on-surface'
                      }`}
                    >
                      {variant.name}
                    </span>
                    <span
                      className={`font-body-sm text-body-sm mt-0.5 ${
                        isSelected ? 'text-on-surface font-semibold' : 'text-secondary'
                      }`}
                    >
                      ₹{variant.price.toLocaleString()}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {/* Fragrance Notes Infographic / Olfactory Architecture */}
        {product.olfactory && (
          <section className="px-margin-mobile pt-space-xl">
            <div className="bg-surface-container-low/70 rounded-2xl p-space-md border border-outline-variant/30">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-headline-sm text-headline-sm text-on-surface">Olfactory Architecture</h3>
                <span className="font-label-sm text-label-sm text-primary uppercase font-bold tracking-wider">
                  Pyramid
                </span>
              </div>
              <div className="space-y-3">
                {/* Top Notes */}
                <div className="flex items-start space-x-3 p-3 bg-surface-container-lowest rounded-xl border border-outline-variant/20">
                  <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center flex-shrink-0 text-primary">
                    <span className="material-symbols-outlined text-[18px]">wb_twilight</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider font-bold">
                        {product.olfactory.topLayer.title}
                      </span>
                      <span className="font-body-sm text-body-sm text-secondary">
                        {product.olfactory.topLayer.duration}
                      </span>
                    </div>
                    <p className="font-label-md text-label-md font-medium text-on-surface mt-0.5">
                      {product.olfactory.topLayer.notes}
                    </p>
                  </div>
                </div>

                {/* Heart Notes */}
                <div className="flex items-start space-x-3 p-3 bg-surface-container-lowest rounded-xl border border-outline-variant/20">
                  <div className="w-8 h-8 rounded-full bg-secondary-container/60 flex items-center justify-center flex-shrink-0 text-primary">
                    <span className="material-symbols-outlined text-[18px]">local_florist</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider font-bold">
                        {product.olfactory.heartAccord.title}
                      </span>
                      <span className="font-body-sm text-body-sm text-secondary">
                        {product.olfactory.heartAccord.duration}
                      </span>
                    </div>
                    <p className="font-label-md text-label-md font-medium text-on-surface mt-0.5">
                      {product.olfactory.heartAccord.notes}
                    </p>
                  </div>
                </div>

                {/* Base Notes */}
                <div className="flex items-start space-x-3 p-3 bg-surface-container-lowest rounded-xl border border-outline-variant/20">
                  <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center flex-shrink-0 text-primary">
                    <span className="material-symbols-outlined text-[18px]">nature</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider font-bold">
                        {product.olfactory.baseResonance.title}
                      </span>
                      <span className="font-body-sm text-body-sm text-secondary">
                        {product.olfactory.baseResonance.duration}
                      </span>
                    </div>
                    <p className="font-label-md text-label-md font-medium text-on-surface mt-0.5">
                      {product.olfactory.baseResonance.notes}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Product Highlights Badges */}
        <section className="px-margin-mobile pt-space-lg">
          <div className="grid grid-cols-3 gap-2">
            <div className="p-3 bg-surface-container-lowest rounded-xl border border-outline-variant/30 text-center flex flex-col items-center">
              <span className="material-symbols-outlined text-primary text-[22px] mb-1">cruelty_free</span>
              <span className="font-label-sm text-label-sm font-semibold text-on-surface leading-tight">
                100% Cruelty-Free
              </span>
            </div>
            <div className="p-3 bg-surface-container-lowest rounded-xl border border-outline-variant/30 text-center flex flex-col items-center">
              <span className="material-symbols-outlined text-primary text-[22px] mb-1">schedule</span>
              <span className="font-label-sm text-label-sm font-semibold text-on-surface leading-tight">
                Lasts 14+ Hours
              </span>
            </div>
            <div className="p-3 bg-surface-container-lowest rounded-xl border border-outline-variant/30 text-center flex flex-col items-center">
              <span className="material-symbols-outlined text-primary text-[22px] mb-1">wine_bar</span>
              <span className="font-label-sm text-label-sm font-semibold text-on-surface leading-tight">
                Artisanal Glass
              </span>
            </div>
          </div>
        </section>

        {/* Complete the Haven Look (Cross-Sell) */}
        {product.crossSell && (
          <section className="px-margin-mobile pt-space-xl">
            <div className="p-space-md rounded-2xl bg-surface-container-lowest border border-outline-variant/40 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">
                  Curated Pairing
                </span>
                <span className="font-label-sm text-label-sm text-secondary">Complete the Haven Look</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-20 h-20 rounded-lg overflow-hidden bg-surface-container-low flex-shrink-0 border border-outline-variant/30">
                  <img src={product.crossSell.image} alt={product.crossSell.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <p className="font-label-md text-label-md font-semibold text-on-surface leading-snug">
                    {product.crossSell.name}
                  </p>
                  <p className="font-body-sm text-body-sm text-secondary">{product.crossSell.spec}</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="font-label-md text-label-md font-bold text-primary">
                      ₹{product.crossSell.price.toLocaleString()}
                    </span>
                    <button
                      onClick={() => {
                        const ring = PRODUCTS.find((p) => p.id === 'emerald-solitaire-cocktail-ring') || PRODUCTS[9];
                        addToCart(ring);
                      }}
                      className="px-3 py-1 bg-surface-container-high hover:bg-secondary-container text-on-surface rounded-full font-label-sm text-label-sm font-semibold active:scale-95 transition-all duration-150 cursor-pointer"
                    >
                      + Add Look
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Collapsible Accordions */}
        <section className="px-margin-mobile pt-space-xl space-y-2">
          {/* Accordion 1: Ingredients & Scent Story */}
          <div className="border border-outline-variant/30 rounded-xl bg-surface-container-lowest overflow-hidden">
            <button
              onClick={() => toggleAccordion('acc-0')}
              className="w-full px-4 py-3.5 flex items-center justify-between text-left text-on-surface hover:text-primary transition-colors duration-150 cursor-pointer"
            >
              <span className="font-label-lg text-label-lg font-semibold">Ingredients & Scent Story</span>
              <span
                className={`material-symbols-outlined text-[20px] transition-transform duration-200 ${
                  openAccordions['acc-0'] ? 'rotate-180' : ''
                }`}
              >
                expand_more
              </span>
            </button>
            {openAccordions['acc-0'] && (
              <div className="px-4 pb-4 pt-1 font-body-sm text-body-sm text-secondary leading-relaxed border-t border-outline-variant/20 animate-in fade-in duration-200">
                Harvested at twilight in Grasse, the petals of Sambac Jasmine are combined with non-GMO organic sugarcane
                alcohol, distilled Italian bergamot, and sustainable sandalwood essence. Free of synthetic phthalates,
                parabens, and endocrine disruptors.
              </div>
            )}
          </div>

          {/* Accordion 2: Shipping & Returns */}
          <div className="border border-outline-variant/30 rounded-xl bg-surface-container-lowest overflow-hidden">
            <button
              onClick={() => toggleAccordion('acc-1')}
              className="w-full px-4 py-3.5 flex items-center justify-between text-left text-on-surface hover:text-primary transition-colors duration-150 cursor-pointer"
            >
              <span className="font-label-lg text-label-lg font-semibold">Shipping & Easy 7-Day Returns</span>
              <span
                className={`material-symbols-outlined text-[20px] transition-transform duration-200 ${
                  openAccordions['acc-1'] ? 'rotate-180' : ''
                }`}
              >
                expand_more
              </span>
            </button>
            {openAccordions['acc-1'] && (
              <div className="px-4 pb-4 pt-1 font-body-sm text-body-sm text-secondary leading-relaxed border-t border-outline-variant/20 animate-in fade-in duration-200">
                Complimentary express delivery across metro cities within 48 hours. Each flacon comes accompanied by a 2ml
                discovery vial so you may test the scent on your skin before opening the sealed box for a full, hassle-free refund.
              </div>
            )}
          </div>

          {/* Accordion 3: Gifting & Packaging */}
          <div className="border border-outline-variant/30 rounded-xl bg-surface-container-lowest overflow-hidden">
            <button
              onClick={() => toggleAccordion('acc-2')}
              className="w-full px-4 py-3.5 flex items-center justify-between text-left text-on-surface hover:text-primary transition-colors duration-150 cursor-pointer"
            >
              <span className="font-label-lg text-label-lg font-semibold">Gifting & Packaging</span>
              <span
                className={`material-symbols-outlined text-[20px] transition-transform duration-200 ${
                  openAccordions['acc-2'] ? 'rotate-180' : ''
                }`}
              >
                expand_more
              </span>
            </button>
            {openAccordions['acc-2'] && (
              <div className="px-4 pb-4 pt-1 font-body-sm text-body-sm text-secondary leading-relaxed border-t border-outline-variant/20 animate-in fade-in duration-200">
                Arrives nestled inside our signature terracotta-tinted presentation keepsake box with raw cotton ribbons,
                personalized wax-sealed note card, and silk dust pouch.
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Sticky Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 w-full z-50 bg-surface-container-lowest/95 backdrop-blur-lg border-t border-outline-variant/30 shadow-[0_-8px_30px_rgba(50,36,32,0.06)]">
        <div className="max-w-md mx-auto px-margin-mobile py-3 flex items-center space-x-3">
          {/* Quantity Selector */}
          <div className="flex items-center bg-surface-container-high rounded-xl p-1 border border-outline-variant/40">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              aria-label="Decrease quantity"
              className="w-8 h-8 rounded-lg flex items-center justify-center text-on-surface active:scale-90 transition-transform cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">remove</span>
            </button>
            <span className="w-6 text-center font-label-md text-label-md font-bold text-on-surface">{quantity}</span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              aria-label="Increase quantity"
              className="w-8 h-8 rounded-lg flex items-center justify-center text-on-surface active:scale-90 transition-transform cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
            </button>
          </div>

          {/* Add to Bag */}
          <button
            onClick={handleAddToCart}
            className="flex-1 py-3 px-3 rounded-xl border border-primary text-primary font-label-md text-label-md font-semibold hover:bg-secondary-container/30 active:scale-95 transition-all duration-150 flex items-center justify-center space-x-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
            <span>Add to Bag</span>
          </button>

          {/* Buy Now Primary Button */}
          <button
            onClick={handleBuyNow}
            className="flex-[1.2] py-3 px-3 rounded-xl bg-primary text-on-primary font-label-md text-label-md font-semibold shadow-md hover:bg-primary-container active:scale-95 transition-all duration-150 flex flex-col items-center justify-center cursor-pointer"
          >
            <div className="flex items-center space-x-1">
              <span>Buy Now</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </div>
            <span className="text-[9px] uppercase tracking-wider font-medium text-primary-fixed opacity-90">
              Instant Checkout
            </span>
          </button>
        </div>
      </div>

      {/* 360 Degree View Interactive Modal */}
      {show360Modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-on-surface/60 backdrop-blur-sm" onClick={() => setShow360Modal(false)} />
          <div className="relative bg-surface rounded-2xl p-5 max-w-sm w-full z-10 text-center shadow-2xl border border-outline-variant/40">
            <div className="flex justify-between items-center mb-3">
              <span className="font-label-sm text-primary uppercase font-bold tracking-wider">360° Inspection</span>
              <button
                onClick={() => setShow360Modal(false)}
                className="w-7 h-7 rounded-full bg-surface-container flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            </div>
            <div className="aspect-square rounded-xl overflow-hidden bg-surface-container-low mb-3 relative">
              <img
                src={galleryImages[activeSlide]}
                alt="360 rotation"
                className="w-full h-full object-cover animate-pulse"
              />
              <div className="absolute inset-0 flex items-center justify-between px-3 pointer-events-none">
                <span className="material-symbols-outlined text-white/80 text-[24px]">swipe_left</span>
                <span className="material-symbols-outlined text-white/80 text-[24px]">swipe_right</span>
              </div>
            </div>
            <p className="font-body-sm text-[12px] text-secondary">
              Hand-spun French flacon with polished brass fluted collar and hand-printed silk label.
            </p>
            <div className="flex gap-2 justify-center mt-3">
              {galleryImages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveSlide(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    activeSlide === i ? 'bg-primary scale-125' : 'bg-outline-variant/60'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
