import React, { useState, useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import { Product } from '../types';

export const WishlistView: React.FC = () => {
  const {
    wishlist,
    toggleWishlist,
    moveWishlistToBag,
    moveAllWishlistToBag,
    user,
    navigateTo,
    setConciergeOpen,
    showToast,
  } = useShop();

  const [activeTab, setActiveTab] = useState<'wishlist' | 'orders' | 'concierge' | 'privilege'>('wishlist');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [showEditProfile, setShowEditProfile] = useState<boolean>(false);
  const [profileName, setProfileName] = useState(user.name);
  const [profilePhone, setProfilePhone] = useState(user.phone);

  const filterChips = [
    { label: `All (${wishlist.length})`, value: 'all' },
    { label: 'Couture', value: 'women' },
    { label: 'Fragrances', value: 'perfumes' },
    { label: 'Jewellery', value: 'jewellery' },
    { label: 'Footwear', value: 'footwear' },
  ];

  const filteredWishlist = useMemo(() => {
    if (categoryFilter === 'all') return wishlist;
    return wishlist.filter((item) => item.category === categoryFilter);
  }, [wishlist, categoryFilter]);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    user.name = profileName;
    user.phone = profilePhone;
    setShowEditProfile(false);
    showToast('Patron profile updated');
  };

  return (
    <div className="min-h-screen bg-background text-on-surface font-body-md antialiased pb-32">
      {/* Top App Bar */}
      <header className="sticky top-0 left-0 w-full z-40 bg-surface/90 backdrop-blur-md transition-shadow duration-200 shadow-sm">
        <div className="max-w-md md:max-w-3xl mx-auto px-margin-mobile h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigateTo('home')}
              className="p-1.5 -ml-1.5 text-secondary hover:text-primary active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[22px]">arrow_back</span>
            </button>
            <h1 className="font-headline-sm text-headline-sm tracking-tight text-on-surface italic">
              Sanctuary
            </h1>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => showToast('No new notifications. You are all caught up.')}
              aria-label="Notifications"
              className="w-10 h-10 rounded-full flex items-center justify-center text-secondary hover:text-primary active:scale-95 transition-transform"
            >
              <span className="material-symbols-outlined text-[22px]">notifications</span>
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              aria-label="Order history"
              className="w-10 h-10 rounded-full flex items-center justify-center text-secondary hover:text-primary active:scale-95 transition-transform"
            >
              <span className="material-symbols-outlined text-[22px]">receipt_long</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Sanctuary Canvas */}
      <main className="max-w-md md:max-w-3xl mx-auto px-margin-mobile pt-3 space-y-4">
        {/* Patron Profile Card */}
        <section className="p-4 bg-surface-container-lowest rounded-2xl border border-outline-variant/30 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3.5">
            <div className="relative">
              <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-primary/40 bg-surface-container">
                <img
                  src={user.avatarUrl}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-primary ring-2 ring-surface flex items-center justify-center text-on-primary">
                <span className="material-symbols-outlined text-[9px]">star</span>
              </span>
            </div>
            <div>
              <h2 className="font-headline-sm text-headline-sm text-on-surface">{user.name}</h2>
              <p className="font-label-sm text-[11px] text-primary font-semibold tracking-wide mt-0.5">
                {user.membership} • {user.havenPoints.toLocaleString()} Pts
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowEditProfile(true)}
            className="px-3 py-1.5 rounded-full border border-outline-variant/50 text-secondary hover:text-primary hover:border-primary font-label-sm text-label-sm active:scale-95 transition-all cursor-pointer"
          >
            Edit Profile
          </button>
        </section>

        {/* Sanctuary Sub-tabs */}
        <div className="flex border-b border-outline-variant/25">
          <button
            onClick={() => setActiveTab('wishlist')}
            className={`flex-1 py-3 text-center font-label-md text-label-md transition-all relative cursor-pointer ${
              activeTab === 'wishlist'
                ? 'text-primary font-bold after:content-[\'\'] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary'
                : 'text-secondary hover:text-primary'
            }`}
          >
            Wishlist ({wishlist.length})
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex-1 py-3 text-center font-label-md text-label-md transition-all relative cursor-pointer ${
              activeTab === 'orders'
                ? 'text-primary font-bold after:content-[\'\'] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary'
                : 'text-secondary hover:text-primary'
            }`}
          >
            My Orders (3)
          </button>
          <button
            onClick={() => {
              setActiveTab('concierge');
              setConciergeOpen(true);
            }}
            className={`flex-1 py-3 text-center font-label-md text-label-md transition-all relative cursor-pointer ${
              activeTab === 'concierge'
                ? 'text-primary font-bold after:content-[\'\'] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary'
                : 'text-secondary hover:text-primary'
            }`}
          >
            Stylist Chat
          </button>
          <button
            onClick={() => setActiveTab('privilege')}
            className={`flex-1 py-3 text-center font-label-md text-label-md transition-all relative cursor-pointer ${
              activeTab === 'privilege'
                ? 'text-primary font-bold after:content-[\'\'] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary'
                : 'text-secondary hover:text-primary'
            }`}
          >
            Privilege Passes
          </button>
        </div>

        {/* TAB 1: WISHLIST */}
        {activeTab === 'wishlist' && (
          <div className="space-y-4">
            {/* Category Filter Chips & Move All button */}
            <div className="flex items-center justify-between gap-2 overflow-x-auto no-scrollbar pt-1">
              <div className="flex items-center gap-1.5">
                {filterChips.map((chip) => (
                  <button
                    key={chip.value}
                    onClick={() => setCategoryFilter(chip.value)}
                    className={`shrink-0 px-3 py-1 rounded-full font-label-sm text-label-sm transition-all ${
                      categoryFilter === chip.value
                        ? 'bg-on-surface text-surface-container-lowest font-semibold'
                        : 'bg-surface-container-low text-secondary border border-outline-variant/30 hover:border-primary'
                    }`}
                  >
                    {chip.label}
                  </button>
                ))}
              </div>

              {wishlist.length > 0 && (
                <button
                  onClick={moveAllWishlistToBag}
                  className="shrink-0 px-3 py-1 rounded-full bg-primary-fixed/40 text-primary font-label-sm text-label-sm font-semibold hover:bg-primary hover:text-on-primary active:scale-95 transition-all cursor-pointer"
                >
                  Move All to Bag
                </button>
              )}
            </div>

            {/* Wishlist 2-Column Grid */}
            {filteredWishlist.length === 0 ? (
              <div className="text-center py-12 bg-surface-container-lowest rounded-2xl border border-outline-variant/30 p-6">
                <div className="w-14 h-14 rounded-full bg-surface-container mx-auto flex items-center justify-center text-secondary mb-3">
                  <span className="material-symbols-outlined text-[28px]">favorite_border</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface mb-1">No items saved</h3>
                <p className="font-body-sm text-body-sm text-secondary max-w-xs mx-auto mb-4">
                  Browse our couture garments, rare fragrances, and bespoke jewels to build your wishlist.
                </p>
                <button
                  onClick={() => navigateTo('categories')}
                  className="px-5 py-2 bg-primary text-on-primary rounded-xl font-label-md text-label-md hover:bg-primary-container active:scale-95 transition-all"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-3">
                {filteredWishlist.map((prod) => (
                  <article
                    key={prod.id}
                    className="bg-surface-container-lowest rounded-xl p-2.5 border border-outline-variant/30 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow group"
                  >
                    {/* Image Box */}
                    <div className="relative aspect-[4/5] rounded-lg overflow-hidden bg-surface-container-low mb-2">
                      <img
                        onClick={() => navigateTo('product-detail', prod)}
                        src={prod.image}
                        alt={prod.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
                      />

                      {prod.tag && (
                        <span className="absolute top-2 left-2 bg-surface-container-lowest/90 backdrop-blur-xs text-primary font-label-sm text-[9px] px-2 py-0.5 rounded-full border border-outline-variant/30 font-bold uppercase">
                          {prod.tag}
                        </span>
                      )}

                      <button
                        onClick={() => toggleWishlist(prod)}
                        aria-label="Remove from wishlist"
                        className="absolute top-2 right-2 w-7 h-7 rounded-full bg-surface-container-lowest/80 backdrop-blur-xs flex items-center justify-center text-primary active:scale-90 transition-transform cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[17px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                          favorite
                        </span>
                      </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3
                          onClick={() => navigateTo('product-detail', prod)}
                          className="font-label-lg text-label-lg font-semibold text-on-surface line-clamp-1 hover:text-primary transition-colors cursor-pointer"
                        >
                          {prod.name}
                        </h3>
                        <p className="font-body-sm text-[11px] text-secondary mt-0.5 line-clamp-1">
                          {prod.subtitle}
                        </p>
                      </div>

                      <div className="mt-2 pt-2 border-t border-outline-variant/15 space-y-2">
                        <div className="flex items-baseline justify-between">
                          <span className="font-price-display text-price-display text-primary font-bold">
                            ₹{prod.price.toLocaleString()}
                          </span>
                          {prod.originalPrice && (
                            <span className="font-body-sm text-[11px] text-secondary line-through">
                              ₹{prod.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>

                        <button
                          onClick={() => moveWishlistToBag(prod)}
                          className="w-full py-2 rounded-lg bg-surface-container-high hover:bg-primary hover:text-on-primary text-on-surface font-label-md text-label-md font-semibold active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[16px]">shopping_bag</span>
                          <span>Move to Bag</span>
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: MY ORDERS */}
        {activeTab === 'orders' && (
          <div className="space-y-3">
            <div className="p-4 bg-surface-container-lowest rounded-xl border border-outline-variant/30 space-y-2 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-[11px] font-bold text-primary">ORDER #HH-9201</span>
                <span className="font-label-sm text-[11px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded font-medium">
                  Out for Delivery Today
                </span>
              </div>
              <p className="font-label-md text-label-md font-semibold text-on-surface">
                Jasmine Blanc Extrait de Parfum (100ml) & Silk Keepsake
              </p>
              <p className="font-body-sm text-[12px] text-secondary">Placed on Sep 7, 2026 • Courier: BlueDart Premier Express</p>
              <div className="flex items-center justify-between pt-2 border-t border-outline-variant/15">
                <span className="font-price-display text-[15px] font-bold text-on-surface">₹3,450.00</span>
                <button
                  onClick={() => showToast('Courier tracking refreshed: Driver 4 stops away')}
                  className="text-primary font-label-md text-label-md font-semibold hover:underline"
                >
                  Live Courier Tracking
                </button>
              </div>
            </div>

            <div className="p-4 bg-surface-container-lowest rounded-xl border border-outline-variant/30 space-y-2 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-[11px] font-bold text-secondary">ORDER #HH-8392</span>
                <span className="font-label-sm text-[11px] text-secondary bg-surface-container px-2 py-0.5 rounded font-medium">
                  Delivered Sep 4
                </span>
              </div>
              <p className="font-label-md text-label-md font-semibold text-on-surface">
                Hand-embroidered Velvet Noir Parfum & Kundan Bangles
              </p>
              <p className="font-body-sm text-[12px] text-secondary">Delivered to Bandra West, Mumbai</p>
              <div className="flex items-center justify-between pt-2 border-t border-outline-variant/15">
                <span className="font-price-display text-[15px] font-bold text-on-surface">₹7,490.00</span>
                <button
                  onClick={() => showToast('Invoice downloaded to device')}
                  className="text-primary font-label-md text-label-md font-semibold hover:underline"
                >
                  Download Atelier Tax Invoice
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: PRIVILEGE PASSES */}
        {activeTab === 'privilege' && (
          <div className="space-y-3">
            <div className="p-5 bg-gradient-to-br from-primary-container to-secondary-container text-on-primary rounded-2xl shadow-sm space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <span className="font-label-sm text-[10px] uppercase tracking-widest text-primary-fixed block">
                    SANCTUARY TIER
                  </span>
                  <h3 className="font-headline-sm text-headline-sm font-light">Gold Patron Circle</h3>
                </div>
                <span className="material-symbols-outlined text-[28px] text-primary-fixed">diamond</span>
              </div>
              <p className="font-body-sm text-[13px] text-on-primary/90">
                You enjoy priority allocation for haute couture shows, private fragrance blending sessions in Mumbai, and 48-hour complimentary return pickups.
              </p>
              <div className="pt-2 flex justify-between items-center text-[12px] border-t border-white/20">
                <span>Next Tier: Diamond Sovereign (at 10,000 pts)</span>
                <span className="font-bold">4,850 / 10,000 Pts</span>
              </div>
            </div>

            <div className="p-4 bg-surface-container-lowest rounded-xl border border-outline-variant/30 space-y-2">
              <span className="font-label-sm text-[10px] text-primary font-bold uppercase tracking-wider block">
                Active Vouchers
              </span>
              <div className="p-3 bg-surface-container-low rounded-lg flex items-center justify-between">
                <div>
                  <p className="font-label-md text-label-md font-bold text-on-surface">HAVEN10</p>
                  <p className="font-body-sm text-[11px] text-secondary">10% Privilege on all catalog orders</p>
                </div>
                <span className="font-label-sm text-[11px] text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full font-bold">
                  Active
                </span>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Edit Profile Modal */}
      {showEditProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-on-surface/50 backdrop-blur-xs" onClick={() => setShowEditProfile(false)} />
          <form onSubmit={handleSaveProfile} className="relative bg-surface rounded-2xl p-5 max-w-sm w-full z-10 shadow-2xl border border-outline-variant/40 space-y-3">
            <div className="flex justify-between items-center pb-2 border-b border-outline-variant/20">
              <h3 className="font-headline-sm text-headline-sm text-on-surface">Edit Patron Profile</h3>
              <button type="button" onClick={() => setShowEditProfile(false)} className="w-7 h-7 rounded-full bg-surface-container flex items-center justify-center">
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            </div>
            <div>
              <label className="font-label-sm text-secondary block mb-1">Full Name</label>
              <input
                type="text"
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
                className="w-full h-10 px-3 bg-surface-container-low rounded-xl border border-outline-variant/40 font-body-sm text-on-surface focus:outline-none focus:border-primary"
                required
              />
            </div>
            <div>
              <label className="font-label-sm text-secondary block mb-1">Concierge Telephone</label>
              <input
                type="text"
                value={profilePhone}
                onChange={(e) => setProfilePhone(e.target.value)}
                className="w-full h-10 px-3 bg-surface-container-low rounded-xl border border-outline-variant/40 font-body-sm text-on-surface focus:outline-none focus:border-primary"
                required
              />
            </div>
            <div className="pt-2 flex gap-2">
              <button
                type="button"
                onClick={() => setShowEditProfile(false)}
                className="flex-1 py-2 rounded-xl border border-outline-variant/50 text-secondary font-label-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2 rounded-xl bg-primary text-on-primary font-label-md font-semibold shadow-sm"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
