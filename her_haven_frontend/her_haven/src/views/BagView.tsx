import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';

export const BagView: React.FC = () => {
  const {
    cartItems,
    removeFromCart,
    updateCartQty,
    appliedCoupon,
    applyCouponCode,
    removeCouponCode,
    cartSubtotal,
    couponDiscount,
    cartTotal,
    amountNeededForFreeTier,
    freeShippingProgress,
    user,
    setCheckoutOpen,
    navigateTo,
  } = useShop();

  const [couponInput, setCouponInput] = useState('HAVEN10');
  const [showAddressChange, setShowAddressChange] = useState(false);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);

  const addresses = [
    { name: 'Priya Sharma', tag: 'HOME', line1: 'Bandra West, Mumbai 400050' },
    { name: 'Priya Sharma', tag: 'OFFICE', line1: 'BKC Corporate Plaza, Mumbai 400051' },
    { name: 'Family Retreat', tag: 'DELHI', line1: 'Vasant Vihar, New Delhi 110057' },
  ];

  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    applyCouponCode(couponInput);
  };

  return (
    <div className="min-h-screen bg-background text-on-surface font-body-md antialiased pb-36">
      {/* Top App Bar Navigation Header */}
      <header className="sticky top-0 left-0 w-full z-40 bg-surface/90 backdrop-blur-md transition-shadow duration-200 shadow-sm">
        <div className="max-w-md md:max-w-3xl mx-auto px-margin-mobile h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigateTo('home')}
              aria-label="Go back"
              className="p-2 -ml-2 rounded-full text-secondary hover:text-primary active:scale-95 transition-all duration-150 flex items-center justify-center cursor-pointer"
            >
              <span className="material-symbols-outlined text-[22px]">arrow_back</span>
            </button>
            <div>
              <p className="font-label-sm text-label-sm text-secondary uppercase tracking-widest leading-none">
                Your Curation
              </p>
              <h1 className="font-headline-sm text-headline-sm tracking-tight text-on-surface">My Haven Bag</h1>
            </div>
          </div>
          <div className="flex items-center">
            <span className="bg-secondary-container text-on-secondary-container px-2.5 py-1 rounded-full font-label-sm text-label-sm font-bold">
              {totalItemsCount} items
            </span>
          </div>
        </div>
      </header>

      {/* Main Bag Canvas */}
      <main className="max-w-md md:max-w-3xl mx-auto px-margin-mobile pt-3 space-y-4">
        {/* Delivery Address Snippet */}
        <section className="p-3.5 bg-surface-container-lowest rounded-xl border border-outline-variant/30 flex items-center justify-between shadow-xs">
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-primary text-[20px] mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>
              location_on
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-label-sm text-[10px] uppercase tracking-wider text-secondary font-bold">
                  Delivery Address: {addresses[selectedAddressIndex].tag}
                </span>
              </div>
              <p className="font-label-md text-label-md font-semibold text-on-surface">
                {addresses[selectedAddressIndex].name}
              </p>
              <p className="font-body-sm text-[12px] text-secondary">
                {addresses[selectedAddressIndex].line1}
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowAddressChange(true)}
            className="text-primary font-label-md text-label-md font-bold hover:underline cursor-pointer"
          >
            CHANGE
          </button>
        </section>

        {/* Free Shipping & Gift Tier Progress Banner */}
        <section className="p-4 bg-surface-container-low rounded-xl border border-outline-variant/30 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-primary text-[18px]">card_giftcard</span>
              <span className="font-label-sm text-label-sm text-on-surface font-semibold">
                {amountNeededForFreeTier === 0
                  ? 'Complimentary Silk Scarf & Keepsake Gift Box Unlocked!'
                  : `Add ₹${amountNeededForFreeTier.toLocaleString()} more to unlock a complimentary artisan silk scarf & gift box`}
              </span>
            </div>
          </div>
          <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
            <div
              className="bg-primary h-full rounded-full transition-all duration-500"
              style={{ width: `${freeShippingProgress}%` }}
            ></div>
          </div>
        </section>

        {/* Cart Items List */}
        {cartItems.length === 0 ? (
          <div className="text-center py-12 bg-surface-container-lowest rounded-2xl border border-outline-variant/30 p-6">
            <div className="w-16 h-16 rounded-full bg-surface-container mx-auto flex items-center justify-center text-secondary mb-3">
              <span className="material-symbols-outlined text-[32px]">shopping_bag</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface mb-1">Your Haven Bag is empty</h3>
            <p className="font-body-sm text-body-sm text-secondary max-w-xs mx-auto mb-4">
              Explore our curated ateliers to fill your haven with high fashion, scents, and jewels.
            </p>
            <button
              onClick={() => navigateTo('categories')}
              className="px-6 py-2.5 bg-primary text-on-primary rounded-xl font-label-md text-label-md hover:bg-primary-container active:scale-95 transition-all shadow-sm"
            >
              Explore Catalog
            </button>
          </div>
        ) : (
          <section className="space-y-3">
            {cartItems.map((item) => (
              <article
                key={item.id}
                className="p-3.5 bg-surface-container-lowest rounded-xl border border-outline-variant/30 flex gap-3 shadow-xs"
              >
                {/* Product Thumbnail */}
                <div
                  onClick={() => navigateTo('product-detail', item.product)}
                  className="w-20 h-24 rounded-lg overflow-hidden bg-surface-container-low shrink-0 border border-outline-variant/20 cursor-pointer"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {item.tagLabel && (
                          <span className="bg-secondary-container/60 text-primary font-label-sm text-[9px] px-2 py-0.5 rounded-full font-bold uppercase">
                            {item.tagLabel}
                          </span>
                        )}
                        <h3
                          onClick={() => navigateTo('product-detail', item.product)}
                          className="font-label-lg text-label-lg font-semibold text-on-surface line-clamp-1 hover:text-primary transition-colors cursor-pointer"
                        >
                          {item.product.name}
                        </h3>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        aria-label="Remove item"
                        className="text-secondary hover:text-primary transition-colors p-1"
                      >
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                    </div>

                    <p className="font-body-sm text-[12px] text-secondary mt-0.5">
                      {item.size && <span>Size: {item.size} • </span>}
                      {item.color && <span>Color: {item.color} • </span>}
                      {item.volume && <span>Vol: {item.volume} • </span>}
                      <span>In Stock</span>
                    </p>
                  </div>

                  {/* Price & Quantity Stepper */}
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-outline-variant/15">
                    <div>
                      <span className="font-price-display text-price-display text-primary font-bold">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </span>
                      {item.quantity > 1 && (
                        <span className="text-[11px] text-secondary ml-1">
                          (₹{item.price.toLocaleString()} each)
                        </span>
                      )}
                    </div>

                    {/* Stepper */}
                    <div className="flex items-center bg-surface-container-high rounded-lg p-0.5 border border-outline-variant/40">
                      <button
                        onClick={() => updateCartQty(item.id, -1)}
                        className="w-7 h-7 rounded flex items-center justify-center text-on-surface hover:bg-surface active:scale-95 transition-all cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[16px]">remove</span>
                      </button>
                      <span className="w-7 text-center font-label-md text-label-md font-bold text-on-surface">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQty(item.id, 1)}
                        className="w-7 h-7 rounded flex items-center justify-center text-on-surface hover:bg-surface active:scale-95 transition-all cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[16px]">add</span>
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </section>
        )}

        {/* Haven Privilege Coupon Card */}
        {cartItems.length > 0 && (
          <section className="p-3.5 bg-surface-container-lowest rounded-xl border border-outline-variant/30 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-primary text-[18px]">sell</span>
                <span className="font-label-sm text-[10px] uppercase font-bold text-secondary tracking-wider">
                  Haven Privilege Code
                </span>
              </div>
              {appliedCoupon && (
                <span className="font-label-sm text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded font-bold">
                  APPLIED (10% OFF)
                </span>
              )}
            </div>

            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <input
                type="text"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                placeholder="Enter promo code (e.g. HAVEN10)"
                className="flex-1 h-10 px-3 bg-surface-container-low rounded-lg border border-outline-variant/40 font-label-md text-label-md text-on-surface uppercase focus:outline-none focus:border-primary"
              />
              {appliedCoupon === couponInput.trim().toUpperCase() ? (
                <button
                  type="button"
                  onClick={removeCouponCode}
                  className="px-4 h-10 rounded-lg border border-outline-variant/60 text-secondary hover:text-primary font-label-md text-label-md cursor-pointer"
                >
                  Remove
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-4 h-10 rounded-lg bg-primary text-on-primary font-label-md text-label-md font-semibold hover:bg-primary-container active:scale-95 transition-all cursor-pointer"
                >
                  Apply
                </button>
              )}
            </form>

            {appliedCoupon && (
              <p className="font-body-sm text-[11px] text-emerald-700 flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">check_circle</span>
                10% off your haven order • You save ₹{couponDiscount.toLocaleString()}.00
              </p>
            )}
          </section>
        )}

        {/* Order Summary Breakdown */}
        {cartItems.length > 0 && (
          <section className="p-4 bg-surface-container-lowest rounded-xl border border-outline-variant/30 space-y-2.5">
            <h3 className="font-label-md text-label-md font-bold uppercase text-on-surface tracking-wider">
              Order Summary
            </h3>

            <div className="space-y-1.5 text-body-sm text-[13px]">
              <div className="flex justify-between text-secondary">
                <span>Subtotal</span>
                <span className="text-on-surface font-medium">₹{cartSubtotal.toLocaleString()}.00</span>
              </div>

              {appliedCoupon && (
                <div className="flex justify-between text-primary font-medium">
                  <span>Haven Privilege ({appliedCoupon})</span>
                  <span>-₹{couponDiscount.toLocaleString()}.00</span>
                </div>
              )}

              <div className="flex justify-between text-secondary">
                <span>Pan-India Delivery</span>
                <span className="text-emerald-700 font-medium flex items-center gap-1">
                  <span className="line-through text-secondary text-[11px]">₹350</span> FREE
                </span>
              </div>

              <div className="flex justify-between text-secondary">
                <span>Luxury Gift Packaging</span>
                <span className="text-emerald-700 font-medium flex items-center gap-1">
                  <span className="line-through text-secondary text-[11px]">₹250</span> COMPLIMENTARY
                </span>
              </div>
            </div>

            <div className="pt-2.5 border-t border-outline-variant/20 flex justify-between items-baseline">
              <div>
                <span className="font-label-lg text-label-lg font-bold text-on-surface">Total Payable</span>
                <span className="font-body-sm text-[10px] text-secondary block">Inclusive of all duties and GST</span>
              </div>
              <span className="font-price-display text-[22px] font-bold text-primary">
                ₹{cartTotal.toLocaleString()}.00
              </span>
            </div>
          </section>
        )}

        {/* Concierge Assurance Badges */}
        <section className="p-3 bg-surface-container-low rounded-xl border border-outline-variant/20 flex items-center justify-around text-center">
          <div className="flex flex-col items-center">
            <span className="material-symbols-outlined text-primary text-[18px]">verified</span>
            <span className="text-[10px] font-medium text-secondary mt-0.5">100% Authentic</span>
          </div>
          <div className="w-[1px] h-6 bg-outline-variant/30"></div>
          <div className="flex flex-col items-center">
            <span className="material-symbols-outlined text-primary text-[18px]">published_with_changes</span>
            <span className="text-[10px] font-medium text-secondary mt-0.5">7-Day Exchange</span>
          </div>
          <div className="w-[1px] h-6 bg-outline-variant/30"></div>
          <div className="flex flex-col items-center">
            <span className="material-symbols-outlined text-primary text-[18px]">lock</span>
            <span className="text-[10px] font-medium text-secondary mt-0.5">Safe Handover</span>
          </div>
        </section>
      </main>

      {/* Sticky Bottom Action Bar */}
      {cartItems.length > 0 && (
        <div className="fixed bottom-16 sm:bottom-0 left-0 w-full z-40 bg-surface/95 backdrop-blur-md border-t border-outline-variant/30 shadow-lg">
          <div className="max-w-md md:max-w-3xl mx-auto px-margin-mobile py-3 flex items-center justify-between gap-3">
            <div>
              <p className="font-label-sm text-[11px] text-secondary leading-none">Total Payable</p>
              <p className="font-price-display text-[20px] font-bold text-primary mt-0.5">
                ₹{cartTotal.toLocaleString()}
              </p>
            </div>
            <button
              onClick={() => setCheckoutOpen(true)}
              className="flex-1 max-w-xs h-12 bg-primary hover:bg-primary-container text-on-primary rounded-xl font-label-md text-label-md font-semibold flex items-center justify-center gap-2 shadow-md active:scale-98 transition-all cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
        </div>
      )}

      {/* Address Switcher Modal */}
      {showAddressChange && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-on-surface/50 backdrop-blur-xs" onClick={() => setShowAddressChange(false)} />
          <div className="relative bg-surface rounded-2xl p-5 max-w-sm w-full z-10 shadow-2xl border border-outline-variant/40">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-headline-sm text-headline-sm text-on-surface">Select Address</h3>
              <button onClick={() => setShowAddressChange(false)} className="w-7 h-7 rounded-full bg-surface-container flex items-center justify-center">
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            </div>
            <div className="space-y-2">
              {addresses.map((addr, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedAddressIndex(idx);
                    setShowAddressChange(false);
                  }}
                  className={`w-full p-3 rounded-xl border text-left flex items-start justify-between transition-all ${
                    selectedAddressIndex === idx
                      ? 'border-primary bg-primary-fixed/20 text-on-surface'
                      : 'border-outline-variant/30 hover:border-primary/50'
                  }`}
                >
                  <div>
                    <span className="font-label-sm text-[10px] text-primary uppercase font-bold tracking-wider block">
                      {addr.tag}
                    </span>
                    <p className="font-label-md text-label-md font-semibold text-on-surface">{addr.name}</p>
                    <p className="font-body-sm text-[12px] text-secondary">{addr.line1}</p>
                  </div>
                  {selectedAddressIndex === idx && (
                    <span className="material-symbols-outlined text-primary text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      check_circle
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
