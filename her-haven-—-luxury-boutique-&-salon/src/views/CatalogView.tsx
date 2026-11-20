import React, { useState, useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';

export const CatalogView: React.FC = () => {
  const {
    navigateTo,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setConciergeOpen,
  } = useShop();

  const [sortOption, setSortOption] = useState<'bestselling' | 'price-asc' | 'price-desc' | 'rating'>('bestselling');
  const [activeFilters, setActiveFilters] = useState<string[]>(['Under ₹4,999', 'Silk & Chiffon', 'In Stock']);
  const [showFilterModal, setShowFilterModal] = useState(false);

  const categoryChips = [
    { label: 'All (184)', value: 'all' },
    { label: 'Women', value: 'women' },
    { label: 'Perfumes', value: 'perfumes' },
    { label: 'Footwear', value: 'footwear' },
    { label: 'Jewellery', value: 'jewellery' },
    { label: 'Makeup', value: 'makeup' },
    { label: 'Offers', value: 'offers', isOffer: true },
  ];

  // Filtering & Sorting
  const filteredProducts = useMemo(() => {
    let list = [...PRODUCTS];

    // Category filter
    if (selectedCategory !== 'all') {
      if (selectedCategory === 'offers') {
        list = list.filter((p) => p.originalPrice && p.originalPrice > p.price);
      } else {
        list = list.filter((p) => p.category === selectedCategory);
      }
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q) ||
          p.categoryLabel.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    // Active filters
    if (activeFilters.includes('Under ₹4,999')) {
      list = list.filter((p) => p.price <= 4999);
    }
    if (activeFilters.includes('In Stock')) {
      list = list.filter((p) => p.inStock);
    }

    // Sorting
    if (sortOption === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [selectedCategory, searchQuery, activeFilters, sortOption]);

  const removeFilter = (filterName: string) => {
    setActiveFilters((prev) => prev.filter((f) => f !== filterName));
  };

  const clearAllFilters = () => {
    setActiveFilters([]);
    setSearchQuery('');
    setSelectedCategory('all');
  };

  return (
    <div className="min-h-screen bg-background text-on-surface font-body-md antialiased pb-32">
      {/* Top App Bar Navigation Header */}
      <header className="sticky top-0 left-0 w-full z-40 bg-surface/90 backdrop-blur-md transition-shadow duration-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-margin-mobile h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigateTo('home')}
              aria-label="Go back"
              className="p-2 -ml-2 rounded-full text-secondary hover:text-primary active:scale-95 transition-all duration-150 flex items-center justify-center cursor-pointer"
            >
              <span className="material-symbols-outlined text-[22px]">arrow_back</span>
            </button>
            <h1 className="font-headline-sm text-headline-sm tracking-tight text-on-surface">Discover Haven</h1>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => {
                const el = document.getElementById('catalog-search-input');
                el?.focus();
              }}
              aria-label="Search items"
              className="w-10 h-10 rounded-full flex items-center justify-center text-secondary hover:text-primary active:scale-95 transition-transform duration-150"
            >
              <span className="material-symbols-outlined text-[22px]">search</span>
            </button>
            <button
              onClick={() => setShowFilterModal(true)}
              aria-label="Filter options"
              className="relative w-10 h-10 rounded-full flex items-center justify-center text-secondary hover:text-primary active:scale-95 transition-transform duration-150 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[22px]">tune</span>
              {activeFilters.length > 0 && (
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary ring-2 ring-surface"></span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Catalog Space */}
      <main className="max-w-7xl mx-auto w-full">
        {/* Search Input Bar Section */}
        <div className="px-margin-mobile pt-3 pb-2">
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-3.5 text-secondary pointer-events-none text-[20px]">
              search
            </span>
            <input
              id="catalog-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-11 pr-10 rounded-xl bg-surface-container-low border border-outline-variant/40 text-on-surface placeholder:text-secondary/70 font-body-md text-body-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all duration-200"
              placeholder="Search dresses, heels, perfumes, rings..."
              type="search"
            />
            {searchQuery ? (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 text-secondary hover:text-primary p-1"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            ) : (
              <button
                onClick={() => setSearchQuery('perfumes')}
                aria-label="Voice search"
                className="absolute right-3 text-secondary/60 hover:text-primary transition-colors flex items-center"
              >
                <span className="material-symbols-outlined text-[19px]">mic</span>
              </button>
            )}
          </div>
        </div>

        {/* Category Horizontal Chips Carousel */}
        <div className="py-2.5">
          <div className="flex items-center gap-2 overflow-x-auto px-margin-mobile no-scrollbar scroll-smooth">
            {categoryChips.map((chip) => {
              const isActive = selectedCategory === chip.value;
              return (
                <button
                  key={chip.value}
                  onClick={() => setSelectedCategory(chip.value)}
                  className={`shrink-0 px-4 py-2 rounded-full font-label-md text-label-md transition-all active:scale-95 flex items-center gap-1 cursor-pointer ${
                    isActive
                      ? 'bg-on-surface text-surface-container-lowest shadow-sm'
                      : chip.isOffer
                      ? 'bg-surface-container-low border border-outline-variant/30 text-primary hover:border-primary'
                      : 'bg-surface-container-low border border-outline-variant/30 text-secondary hover:border-primary hover:text-primary'
                  }`}
                >
                  {chip.isOffer && (
                    <span className="material-symbols-outlined text-[15px] fill-icon text-primary">local_offer</span>
                  )}
                  {chip.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Sort, Filter Count & Action Bar */}
        <div className="px-margin-mobile py-2.5 flex items-center justify-between border-y border-outline-variant/20 bg-surface-container-low/40">
          <span className="text-secondary font-label-md text-label-md">
            Showing <strong className="text-on-surface font-semibold">{filteredProducts.length} Products</strong>
          </span>

          <div className="flex items-center gap-3">
            {/* Sort Popover Trigger */}
            <div className="relative inline-block">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as any)}
                className="appearance-none bg-transparent pr-5 text-on-surface font-label-md text-label-md hover:text-primary focus:outline-none cursor-pointer"
              >
                <option value="bestselling">Sort: Bestselling</option>
                <option value="price-asc">Sort: Price Low to High</option>
                <option value="price-desc">Sort: Price High to Low</option>
                <option value="rating">Sort: Top Rated</option>
              </select>
              <span className="material-symbols-outlined text-[16px] text-secondary absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none">
                keyboard_arrow_down
              </span>
            </div>

            <div className="w-[1px] h-3.5 bg-outline-variant/40"></div>

            {/* Filter Modal Trigger */}
            <button
              onClick={() => setShowFilterModal(true)}
              className="flex items-center gap-1.5 text-primary font-label-md text-label-md active:scale-95 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">filter_list</span>
              <span>
                Filter{' '}
                <span className="bg-secondary-container text-on-secondary-container px-1.5 py-0.5 rounded-full text-[10px] font-bold">
                  {activeFilters.length}
                </span>
              </span>
            </button>
          </div>
        </div>

        {/* Selected Filter Dismissible Pills */}
        {activeFilters.length > 0 && (
          <div className="px-margin-mobile pt-3 pb-1 flex items-center gap-2 overflow-x-auto no-scrollbar">
            {activeFilters.map((f) => (
              <div
                key={f}
                className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container/60 border border-outline-variant/40 text-on-secondary-container font-label-sm text-label-sm"
              >
                <span>{f}</span>
                <button
                  onClick={() => removeFilter(f)}
                  aria-label={`Remove filter ${f}`}
                  className="hover:text-primary transition-colors flex items-center cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[13px]">close</span>
                </button>
              </div>
            ))}
            <button
              onClick={clearAllFilters}
              className="shrink-0 text-primary font-label-sm text-label-sm hover:underline ml-1 cursor-pointer"
            >
              Clear All
            </button>
          </div>
        )}

        {/* 2-Column Luxury Product Grid */}
        <div className="px-margin-mobile pt-4 grid grid-cols-2 gap-x-3 gap-y-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredProducts.map((prod) => {
            const wishlisted = isInWishlist(prod.id);
            return (
              <article
                key={prod.id}
                className="flex flex-col bg-surface-container-lowest rounded-xl p-2 border border-outline-variant/30 transition-all duration-200 hover:shadow-md group"
              >
                <div className="relative aspect-[4/5] w-full rounded-lg overflow-hidden bg-surface-container-low mb-2.5">
                  <img
                    onClick={() => navigateTo('product-detail', prod)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                    src={prod.image}
                    alt={prod.name}
                  />

                  {prod.tag && (
                    <div className="absolute top-2 left-2">
                      <span
                        className={`px-2 py-0.5 rounded-full font-label-sm text-label-sm uppercase tracking-wider shadow-sm ${
                          prod.tag === 'BESTSELLER'
                            ? 'bg-primary text-on-primary'
                            : 'bg-surface-container-highest/90 border border-outline-variant/40 text-on-surface-variant backdrop-blur-sm'
                        }`}
                      >
                        {prod.tag}
                      </span>
                    </div>
                  )}

                  <button
                    onClick={() => toggleWishlist(prod)}
                    aria-label="Save to Wishlist"
                    className="absolute top-2 right-2 w-7 h-7 rounded-full bg-surface-container-lowest/80 backdrop-blur-md flex items-center justify-center text-on-surface hover:text-primary active:scale-90 transition-transform cursor-pointer"
                  >
                    <span
                      className={`material-symbols-outlined text-[16px] ${
                        wishlisted ? 'text-primary' : ''
                      }`}
                      style={{ fontVariationSettings: wishlisted ? "'FILL' 1" : "'FILL' 0" }}
                    >
                      favorite
                    </span>
                  </button>
                </div>

                <div className="flex-1 flex flex-col justify-between px-1">
                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      <span className="material-symbols-outlined text-primary text-[14px] fill-icon">star</span>
                      <span className="font-label-md text-label-md font-semibold text-on-surface">{prod.rating}</span>
                      <span className="text-secondary font-body-sm text-body-sm">({prod.reviewsCount})</span>
                    </div>

                    <h3
                      onClick={() => navigateTo('product-detail', prod)}
                      className="font-headline-sm text-sm font-semibold text-on-surface line-clamp-1 leading-snug tracking-tight cursor-pointer hover:text-primary transition-colors"
                    >
                      {prod.name}
                    </h3>
                    <p className="text-secondary font-body-sm text-body-sm mt-0.5">{prod.subtitle}</p>
                  </div>

                  <div className="mt-2.5 flex items-center justify-between pt-1 border-t border-outline-variant/15">
                    <div>
                      <span className="font-price-display text-price-display text-primary">
                        ₹{prod.price.toLocaleString()}
                      </span>
                      {prod.originalPrice && (
                        <span className="font-body-sm text-body-sm text-secondary line-through ml-1">
                          ₹{prod.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => addToCart(prod)}
                      aria-label={`Quick add ${prod.name}`}
                      className="w-8 h-8 rounded-full bg-primary hover:bg-primary-container text-on-primary flex items-center justify-center active:scale-95 shadow-sm transition-all cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[18px]">add</span>
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Editorial Concierge Teaser / Brand Banner */}
        <div className="mt-8 px-margin-mobile">
          <div className="p-4 rounded-xl bg-surface-container border border-outline-variant/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-surface-container-lowest flex items-center justify-center text-primary shadow-sm">
                <span className="material-symbols-outlined text-[20px]">support_agent</span>
              </div>
              <div>
                <p className="font-headline-sm text-sm font-semibold text-on-surface">Haven Styling Concierge</p>
                <p className="font-body-sm text-body-sm text-secondary">Looking for bespoke bridal or gifting advice?</p>
              </div>
            </div>
            <button
              onClick={() => setConciergeOpen(true)}
              className="px-3 py-1.5 rounded-full bg-primary text-on-primary font-label-md text-label-md hover:bg-primary-container active:scale-95 transition-all cursor-pointer"
            >
              Chat
            </button>
          </div>
        </div>
      </main>

      {/* Filter Modal Drawer */}
      {showFilterModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div
            className="fixed inset-0 bg-on-surface/50 backdrop-blur-xs"
            onClick={() => setShowFilterModal(false)}
          />
          <div className="relative w-full max-w-md bg-surface rounded-t-2xl sm:rounded-2xl p-5 border border-outline-variant/40 shadow-2xl z-10 animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant/30">
              <h3 className="font-headline-sm text-headline-sm text-on-surface">Filter Catalog</h3>
              <button
                onClick={() => setShowFilterModal(false)}
                className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-secondary"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="py-4 space-y-4">
              <div>
                <span className="font-label-md text-label-md text-secondary uppercase font-semibold block mb-2">
                  Price Limit
                </span>
                <div className="flex flex-wrap gap-2">
                  {['Under ₹4,999', 'Under ₹10,000', 'Luxury Couture (₹10k+)'].map((filter) => (
                    <button
                      key={filter}
                      onClick={() => {
                        setActiveFilters((prev) =>
                          prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
                        );
                      }}
                      className={`px-3 py-1.5 rounded-full text-label-md border transition-all ${
                        activeFilters.includes(filter)
                          ? 'bg-primary text-on-primary border-primary'
                          : 'bg-surface-container-low text-secondary border-outline-variant/40'
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="font-label-md text-label-md text-secondary uppercase font-semibold block mb-2">
                  Material & Craft
                </span>
                <div className="flex flex-wrap gap-2">
                  {['Silk & Chiffon', '22k Gold & Kundan', 'Handcrafted Leather', 'Grasse Extraits'].map((mat) => (
                    <button
                      key={mat}
                      onClick={() => {
                        setActiveFilters((prev) =>
                          prev.includes(mat) ? prev.filter((f) => f !== mat) : [...prev, mat]
                        );
                      }}
                      className={`px-3 py-1.5 rounded-full text-label-md border transition-all ${
                        activeFilters.includes(mat)
                          ? 'bg-primary text-on-primary border-primary'
                          : 'bg-surface-container-low text-secondary border-outline-variant/40'
                      }`}
                    >
                      {mat}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="font-label-md text-label-md text-secondary uppercase font-semibold block mb-2">
                  Availability
                </span>
                <button
                  onClick={() => {
                    setActiveFilters((prev) =>
                      prev.includes('In Stock') ? prev.filter((f) => f !== 'In Stock') : [...prev, 'In Stock']
                    );
                  }}
                  className={`px-3 py-1.5 rounded-full text-label-md border transition-all ${
                    activeFilters.includes('In Stock')
                      ? 'bg-primary text-on-primary border-primary'
                      : 'bg-surface-container-low text-secondary border-outline-variant/40'
                  }`}
                >
                  In Stock Only
                </button>
              </div>
            </div>

            <div className="pt-3 border-t border-outline-variant/30 flex gap-2">
              <button
                onClick={() => {
                  setActiveFilters([]);
                  setShowFilterModal(false);
                }}
                className="flex-1 py-2.5 rounded-xl border border-outline-variant/50 text-secondary font-label-md"
              >
                Reset
              </button>
              <button
                onClick={() => setShowFilterModal(false)}
                className="flex-1 py-2.5 rounded-xl bg-primary text-on-primary font-label-md shadow-sm"
              >
                Apply Filters ({filteredProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
