import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { CATEGORIES, PRODUCTS, PATRON_REVIEWS } from '../data/products';

export const HomeView: React.FC = () => {
  const {
    navigateTo,
    setSelectedCategory,
    addToCart,
    toggleWishlist,
    isInWishlist,
    cartItems,
    setDrawerOpen,
    showToast,
  } = useShop();

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // New arrivals products for Screen 1
  const newArrivals = [
    PRODUCTS.find((p) => p.id === 'ethereal-chanderi-anarkali') || PRODUCTS[2],
    PRODUCTS.find((p) => p.id === 'velvet-noir-parfum') || PRODUCTS[3],
    PRODUCTS.find((p) => p.id === 'rose-cut-kundan-bangles') || PRODUCTS[4],
    PRODUCTS.find((p) => p.id === 'satin-wrap-cocktail-dress') || PRODUCTS[5],
  ];

  const handleCategoryClick = (catSlug: string) => {
    setSelectedCategory(catSlug);
    navigateTo('categories');
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setIsSubscribed(true);
    showToast('Welcome to The Haven Concierge Circle! 10% privilege applied.');
    setNewsletterEmail('');
  };

  return (
    <div className="min-h-screen bg-background text-on-surface font-body-md antialiased pb-28">
      {/* Top Announcement Ticker / Flash Banner */}
      <aside
        aria-label="Announcement"
        className="bg-secondary-container/60 text-on-secondary-container border-b border-outline-variant/30 py-2 px-margin-mobile text-center"
      >
        <p className="font-label-sm text-label-sm tracking-widest flex items-center justify-center gap-1.5">
          <span className="material-symbols-outlined text-[13px] text-primary">local_shipping</span>
          <span>
            Complimentary Pan-India Delivery on orders above ₹1,999 • Use Code:{' '}
            <strong className="text-primary font-bold tracking-wider">HAVEN10</strong>
          </span>
        </p>
      </aside>

      {/* Shared Component: TopAppBar */}
      <header className="sticky top-0 left-0 w-full z-40 bg-surface/90 backdrop-blur-md border-b border-outline-variant/30 shadow-sm transition-all duration-200">
        <div className="flex justify-between items-center px-margin-mobile h-16 max-w-7xl mx-auto">
          {/* Leading Icon / Drawer Trigger */}
          <button
            onClick={() => setDrawerOpen(true)}
            aria-label="Open Navigation Menu"
            className="text-primary active:scale-95 transition-transform duration-150 p-1.5 -ml-1.5 rounded-full hover:bg-surface-container/50"
            type="button"
          >
            <span className="material-symbols-outlined text-[24px]">menu</span>
          </button>

          {/* Brand Logo Headline */}
          <button
            onClick={() => navigateTo('home')}
            className="font-headline-lg-mobile text-headline-lg-mobile tracking-tight text-on-surface italic font-medium hover:text-primary transition-colors"
          >
            Her Haven
          </button>

          {/* Trailing Cluster: Search & Shopping Bag with Badge */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => navigateTo('categories')}
              aria-label="Search Collection"
              className="text-primary active:scale-95 transition-transform duration-150 p-2 rounded-full hover:bg-surface-container/50"
              type="button"
            >
              <span className="material-symbols-outlined text-[22px]">search</span>
            </button>

            <button
              onClick={() => navigateTo('bag')}
              aria-label="Shopping Bag"
              className="text-primary active:scale-95 transition-transform duration-150 p-2 rounded-full hover:bg-surface-container/50 relative"
              type="button"
            >
              <span className="material-symbols-outlined text-[22px]">shopping_bag</span>
              {totalCartCount > 0 && (
                <span className="absolute top-1.5 right-1 bg-primary text-on-primary font-label-sm text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {totalCartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Storefront Content Canvas */}
      <main className="w-full max-w-md md:max-w-4xl lg:max-w-6xl mx-auto">
        {/* Hero Editorial Stage */}
        <section className="relative px-margin-mobile pt-3 pb-8">
          <div className="relative w-full rounded-xl overflow-hidden shadow-sm border border-outline-variant/30 aspect-[4/5] sm:aspect-[16/9] flex items-end">
            <img
              className="absolute inset-0 w-full h-full object-cover object-top"
              alt="Editorial portrait of an elegant South Asian woman draped in champagne and terracotta silk couture"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDs5C8Y_7H9HOsR6xUv75SpF5oXgLaUIsVF3Sp-l8EM4uNSzcPIW-Mq7Chi0dX--DGQT6FVbtVqFYO6aDU7gWQ2unGLE5OleU6gh1RVvKdWpNC-CC2ATGzBEdHqA3a5Wf7wzRflwEyjZjrRCrjIgeuAHQ8iXCfX6sGfLHYrWAo_7IVmJkUmxuns70YtRzw90nzuAQUr2QYVCm8bY7dUzrkHrMeMkcKEI0106ybLX12x5-E_zDLjIQnn"
            />
            {/* Atmospheric Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-on-surface/90 via-on-surface/35 to-transparent"></div>

            {/* Hero Copy & CTAs */}
            <div className="relative z-10 p-5 sm:p-8 w-full text-surface-container-lowest">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-lowest/20 backdrop-blur-md border border-white/20 mb-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-fixed"></span>
                <span className="font-label-sm text-label-sm tracking-widest text-surface-container-lowest uppercase">
                  Summer Haute Edition
                </span>
              </div>
              <h1 className="font-display-lg-mobile text-display-lg-mobile text-surface-container-lowest leading-tight tracking-tight mb-2 font-light">
                Your Style.<br />
                <span className="italic font-normal">Your Beauty.</span> Your Haven.
              </h1>
              <p className="font-body-sm text-body-sm text-surface-container-high/90 max-w-xs mb-5 font-normal">
                Curated fashion, fine fragrances & artisanal jewellery crafted for the modern woman.
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    navigateTo('categories');
                  }}
                  className="flex-1 sm:flex-none text-center bg-primary-container hover:bg-primary text-on-primary font-label-md text-label-md py-3 px-6 rounded-xl active:scale-95 transition-transform duration-150 shadow-sm"
                >
                  Shop Now
                </button>
                <button
                  onClick={() => {
                    const jasmine = PRODUCTS.find((p) => p.id === 'jasmine-blanc-extrait') || PRODUCTS[0];
                    navigateTo('product-detail', jasmine);
                  }}
                  className="flex-1 sm:flex-none text-center bg-surface-container-lowest/25 hover:bg-surface-container-lowest/40 backdrop-blur-md text-surface-container-lowest border border-white/40 font-label-md text-label-md py-3 px-5 rounded-xl active:scale-95 transition-transform duration-150"
                >
                  Explore Collection
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Story / Category Circles Rail */}
        <section className="py-2 border-b border-outline-variant/20 mb-6">
          <div className="px-margin-mobile flex justify-between items-baseline mb-3">
            <h2 className="font-headline-sm text-headline-sm text-on-surface">Curated Realms</h2>
            <span className="font-label-sm text-label-sm text-secondary tracking-wider">SWIPE TO BROWSE</span>
          </div>
          <div className="flex gap-4 overflow-x-auto hide-scrollbar px-margin-mobile pb-3 snap-x">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.slug)}
                className="flex flex-col items-center flex-shrink-0 group snap-start cursor-pointer text-left"
              >
                <div className="w-16 h-16 rounded-full p-0.5 border border-outline-variant/50 group-hover:border-primary transition-all duration-200">
                  <div className="w-full h-full rounded-full overflow-hidden bg-surface-container">
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      src={cat.image}
                      alt={cat.name}
                    />
                  </div>
                </div>
                <span className="font-label-md text-label-md text-on-surface mt-2 group-hover:text-primary transition-colors text-center max-w-[70px] truncate">
                  {cat.name}
                </span>
              </button>
            ))}

            {/* Cat 7: New In */}
            <button
              onClick={() => {
                setSelectedCategory('all');
                navigateTo('categories');
              }}
              className="flex flex-col items-center flex-shrink-0 group snap-start cursor-pointer"
            >
              <div className="w-16 h-16 rounded-full p-0.5 border border-primary text-primary flex items-center justify-center bg-primary-fixed/20 group-hover:bg-primary group-hover:text-on-primary transition-all duration-200">
                <span className="material-symbols-outlined text-[24px]">auto_awesome</span>
              </div>
              <span className="font-label-md text-label-md text-on-surface mt-2 group-hover:text-primary transition-colors">
                New In
              </span>
            </button>
          </div>
        </section>

        {/* Section 1: New Arrivals Product Grid */}
        <section className="px-margin-mobile mb-10">
          <div className="flex justify-between items-baseline mb-4">
            <div>
              <span className="font-label-sm text-label-sm tracking-widest text-primary uppercase">The Seasonal Edit</span>
              <h2 className="font-headline-sm text-headline-sm text-on-surface">New Arrivals</h2>
            </div>
            <button
              onClick={() => {
                setSelectedCategory('all');
                navigateTo('categories');
              }}
              className="font-label-md text-label-md text-primary flex items-center gap-0.5 hover:underline"
            >
              View All <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </button>
          </div>

          {/* 2-Column Responsive Grid */}
          <div className="grid grid-cols-2 gap-3 sm:gap-5">
            {newArrivals.map((prod) => {
              const wishlisted = isInWishlist(prod.id);
              return (
                <article
                  key={prod.id}
                  className="bg-surface-container-lowest rounded-xl border border-outline-variant/40 p-2 flex flex-col justify-between group shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="relative w-full aspect-[4/5] rounded-lg overflow-hidden bg-surface-container mb-2.5">
                    <img
                      onClick={() => navigateTo('product-detail', prod)}
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300 cursor-pointer"
                      src={prod.image}
                      alt={prod.name}
                    />

                    {prod.tag && (
                      <span className="absolute top-2 left-2 bg-surface-container-lowest/90 backdrop-blur-sm text-primary font-label-sm text-[9px] px-2 py-0.5 rounded-full border border-outline-variant/30">
                        {prod.tag}
                      </span>
                    )}

                    <button
                      onClick={() => toggleWishlist(prod)}
                      aria-label="Add to Wishlist"
                      className={`absolute top-2 right-2 w-7 h-7 rounded-full bg-surface/85 backdrop-blur-md flex items-center justify-center transition-colors ${
                        wishlisted ? 'text-primary' : 'text-secondary hover:text-primary'
                      }`}
                      type="button"
                    >
                      <span
                        className="material-symbols-outlined text-[18px]"
                        style={{ fontVariationSettings: wishlisted ? "'FILL' 1" : "'FILL' 0" }}
                      >
                        favorite
                      </span>
                    </button>
                  </div>

                  <div className="px-1 flex flex-col flex-1 justify-between">
                    <div>
                      <div className="flex items-center gap-1 mb-1">
                        <div className="flex text-primary">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className="material-symbols-outlined fill-icon text-[13px]">
                              star
                            </span>
                          ))}
                        </div>
                        <span className="font-body-sm text-[11px] text-secondary">({prod.reviewsCount})</span>
                      </div>
                      <h3
                        onClick={() => navigateTo('product-detail', prod)}
                        className="font-label-lg text-label-lg text-on-surface leading-tight line-clamp-1 group-hover:text-primary transition-colors cursor-pointer"
                      >
                        {prod.name}
                      </h3>
                      <p className="font-body-sm text-[11px] text-secondary mt-0.5">{prod.subtitle}</p>
                    </div>

                    <div className="mt-2.5 pt-2 border-t border-outline-variant/20 flex items-center justify-between">
                      <div>
                        <span className="font-price-display text-price-display text-on-surface">
                          ₹{prod.price.toLocaleString()}
                        </span>
                        {prod.originalPrice && (
                          <span className="font-body-sm text-[11px] text-secondary line-through ml-1">
                            ₹{prod.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => addToCart(prod)}
                        aria-label="Add to bag"
                        className="w-7 h-7 rounded-lg bg-surface-container text-primary flex items-center justify-center active:scale-95 transition-transform hover:bg-primary hover:text-on-primary"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[16px]">add</span>
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Curated Spotlight 1: The Fragrance Lounge (Sensory Banner) */}
        <section className="px-margin-mobile mb-10">
          <div className="relative rounded-xl overflow-hidden bg-on-surface text-surface border border-outline-variant/40 p-6 sm:p-8 flex flex-col justify-end min-h-[360px]">
            <img
              className="absolute inset-0 w-full h-full object-cover opacity-35 mix-blend-screen"
              alt="Artistic perfume composition with raw bergamot slices and frosted artisan fragrance flacons"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDqkh_qozY1riBFkPp5yRiPAEfP1SXv2VhrLKWyWpi700Zn0_44qAQrTUwMpmGLEvX5Z1AtALGbS-T73INDRkkL4V1FfX7kUykI9BTZTkH7yPthPwy5c1Rh1ysFw1Vkq3OGV6xSDd0WX9Gf-J8yOkrW8jUp-vwqRLrSV1XLd2xI3C0Ayt8mXTmwrCPSZKNNUVHHkoksq82q_lUiuE5m2s0sVRKBAEWaErao8wDlF1VuvCG571vdmSdB"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-on-surface via-on-surface/80 to-transparent"></div>
            <div className="relative z-10 max-w-sm">
              <span className="font-label-sm text-label-sm tracking-widest text-primary-fixed uppercase mb-2 block">
                Sensory Atelier
              </span>
              <h3 className="font-headline-lg-mobile text-headline-lg-mobile text-surface font-light leading-tight mb-2">
                The Fragrance Lounge
              </h3>
              <p className="font-body-sm text-body-sm text-surface-variant mb-4">
                Distilled in Grasse, poured by hand. Notes of sun-warmed fig, sandalwood, and desert oud crafted to leave an unforgettable imprint.
              </p>
              <div className="flex flex-wrap gap-2 mb-5">
                <span className="bg-surface/10 backdrop-blur-sm border border-white/20 text-surface font-label-sm text-[10px] px-2.5 py-1 rounded-full">
                  Top: Bergamot & Fig
                </span>
                <span className="bg-surface/10 backdrop-blur-sm border border-white/20 text-surface font-label-sm text-[10px] px-2.5 py-1 rounded-full">
                  Heart: White Jasmine
                </span>
                <span className="bg-surface/10 backdrop-blur-sm border border-white/20 text-surface font-label-sm text-[10px] px-2.5 py-1 rounded-full">
                  Base: Smoked Oud
                </span>
              </div>
              <button
                onClick={() => {
                  const jasmine = PRODUCTS.find((p) => p.id === 'jasmine-blanc-extrait') || PRODUCTS[0];
                  navigateTo('product-detail', jasmine);
                }}
                className="inline-flex items-center gap-2 bg-primary-container text-on-primary font-label-md text-label-md px-5 py-2.5 rounded-xl hover:bg-primary transition-all active:scale-95"
              >
                <span>Discover Olfactory Notes</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </section>

        {/* Curated Spotlight 2: Artisanal Jewellery Grid & Feature */}
        <section className="px-margin-mobile mb-12">
          <div className="flex justify-between items-baseline mb-4">
            <div>
              <span className="font-label-sm text-label-sm tracking-widest text-primary uppercase">Handcrafted Legacy</span>
              <h2 className="font-headline-sm text-headline-sm text-on-surface">Artisanal Jewellery</h2>
            </div>
            <button
              onClick={() => {
                setSelectedCategory('jewellery');
                navigateTo('categories');
              }}
              className="font-label-md text-label-md text-primary hover:underline"
            >
              Explore Suite
            </button>
          </div>

          {/* Bento-style Showcase */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Main Feature Bento Card */}
            <div className="sm:col-span-2 bg-surface-container rounded-xl p-5 border border-outline-variant/30 flex flex-col justify-between relative overflow-hidden">
              <div className="relative z-10 max-w-xs mb-6">
                <span className="font-label-sm text-label-sm text-secondary tracking-wider">ROYAL KUNDAN & MEENA</span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface mt-1 mb-2">
                  Bespoke Bangles & Heirloom Rings
                </h3>
                <p className="font-body-sm text-body-sm text-secondary">
                  Forged by generational masters using unrefined gold foil and natural gemstones.
                </p>
              </div>
              <div className="relative z-10">
                <button
                  onClick={() => {
                    setSelectedCategory('jewellery');
                    navigateTo('categories');
                  }}
                  className="inline-block bg-on-surface text-surface font-label-md text-label-md px-4 py-2 rounded-xl active:scale-95"
                >
                  Shop The Jewels
                </button>
              </div>
              <img
                className="absolute right-0 bottom-0 w-1/2 h-full object-cover object-left opacity-90"
                alt="Editorial top-down composition of heritage Indian jewellery"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8TB9nqaSL_caVVAPuN1uuUzL9EAIc0kBpaEs5quCjxiMspfkNozefh4HG91NoSW93m3R1ygx42WTsdPDfAtHQqFycoZdnBTv8awPIeJOOzp4Q8K21juF3Keoe2Mbts6a6tqND9A6tH95aXLf7FtbyoKLR8jHAp9goozJguD_XUkhvrE5aj9A-bGpkzrBkYQDNe_F0SM9zvwrDr53QQePqn6lNObpYqqNVeZRUOodAQIt7TIKjZs-x"
              />
            </div>

            {/* Secondary Jewel Card */}
            <div className="bg-surface-container-lowest rounded-xl p-4 border border-outline-variant/40 flex flex-col justify-between">
              <div className="relative aspect-square rounded-lg overflow-hidden bg-surface-container mb-3">
                <img
                  className="w-full h-full object-cover"
                  alt="Macro photography of emerald and gold ring"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAUseYMN9Ffi5F_0WgUMt-ap_1x7O9mYGjd2DCNvREGdGDfFK-R2W2KzzcGIwoFgqa32hAPIzKOrEGou2C3xNsc45MFnSvFzZ4m0h4GZVE3O9ASIIAQ0eNmHwPHJEDVQGOnLeH8r-eHveWDixM4-WYI-6kegYdphAgodwZtT8CLU0u-2nYLnSwlJ9kqGOvVEQ-ENdOJoOVg29cbKPwG-Jib9sCi50B92aoJsXwU-obgeiSmEbBJDW-w"
                />
              </div>
              <div>
                <span className="font-label-sm text-label-sm text-primary uppercase">Hand-carved</span>
                <h4 className="font-label-lg text-label-lg text-on-surface">Emerald Solitaire Band</h4>
                <div className="flex items-center justify-between mt-1">
                  <span className="font-price-display text-price-display text-on-surface">₹7,200</span>
                  <button
                    onClick={() => {
                      const ring = PRODUCTS.find((p) => p.id === 'emerald-solitaire-cocktail-ring') || PRODUCTS[9];
                      navigateTo('product-detail', ring);
                    }}
                    className="text-primary hover:underline font-label-md text-label-md"
                    type="button"
                  >
                    Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Customer Praise / Testimonial Carousel */}
        <section className="py-6 bg-surface-container-low border-y border-outline-variant/20 mb-12">
          <div className="px-margin-mobile mb-4 text-center">
            <span className="font-label-sm text-label-sm tracking-widest text-primary uppercase">Patron Voices</span>
            <h2 className="font-headline-sm text-headline-sm text-on-surface mt-0.5">Treasured Experiences</h2>
          </div>
          <div className="flex gap-4 overflow-x-auto hide-scrollbar px-margin-mobile pb-2 snap-x">
            {PATRON_REVIEWS.map((rev) => (
              <div
                key={rev.id}
                className="flex-shrink-0 w-72 bg-surface-container-lowest rounded-xl p-4 border border-outline-variant/30 shadow-sm snap-center"
              >
                <div className="flex items-center gap-1 text-primary mb-2">
                  {[...Array(rev.rating)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined fill-icon text-[15px]">
                      star
                    </span>
                  ))}
                </div>
                <p className="font-body-sm text-body-sm text-on-surface italic mb-3">"{rev.comment}"</p>
                <div className="flex items-center justify-between pt-2 border-t border-outline-variant/20">
                  <span className="font-label-md text-label-md text-on-surface">{rev.author}</span>
                  <span className="font-label-sm text-[10px] text-secondary flex items-center gap-0.5">
                    <span className="material-symbols-outlined text-[13px] text-primary">verified</span> Verified Patron
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* VIP Club / Newsletter Signup Card */}
        <section className="px-margin-mobile mb-10">
          <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 p-6 text-center shadow-sm relative overflow-hidden">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-secondary-container/50 text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">loyalty</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface mb-1.5">The Haven Concierge Circle</h3>
            <p className="font-body-sm text-body-sm text-secondary max-w-xs mx-auto mb-5">
              Receive private invitations to seasonal private viewings, bespoke sizing, and a 10% welcome privilege.
            </p>

            {isSubscribed ? (
              <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-200 text-body-sm text-[13px]">
                You have joined the Concierge Circle. Use code <strong>HAVEN10</strong> on your orders.
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="space-y-2.5 max-w-sm mx-auto">
                <div className="relative">
                  <input
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="w-full h-12 bg-surface-container-low text-on-surface placeholder:text-secondary/70 border border-outline-variant/50 rounded-xl px-4 text-body-md focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none transition-all"
                    placeholder="Enter your email address"
                    required
                    type="email"
                  />
                </div>
                <button
                  className="w-full h-12 bg-primary-container hover:bg-primary text-on-primary font-label-md text-label-md rounded-xl transition-all duration-150 active:scale-98 shadow-sm cursor-pointer"
                  type="submit"
                >
                  Join Haven Club
                </button>
              </form>
            )}

            <p className="font-label-sm text-[10px] text-secondary mt-3">
              By joining, you respect our privacy terms. Unsubscribe at any salon notice.
            </p>
          </div>
        </section>

        {/* Boutique Assurance Badges */}
        <section className="px-margin-mobile grid grid-cols-3 gap-2 text-center pt-2 pb-6 border-t border-outline-variant/20">
          <div className="p-2">
            <span className="material-symbols-outlined text-primary text-[22px] mb-1">eco</span>
            <h4 className="font-label-md text-[11px] text-on-surface">Pure Silks & Gems</h4>
            <p className="font-body-sm text-[10px] text-secondary">100% Certified Origin</p>
          </div>
          <div className="p-2 border-x border-outline-variant/20">
            <span className="material-symbols-outlined text-primary text-[22px] mb-1">lock</span>
            <h4 className="font-label-md text-[11px] text-on-surface">Secure Concierge</h4>
            <p className="font-body-sm text-[10px] text-secondary">Encrypted Payments</p>
          </div>
          <div className="p-2">
            <span className="material-symbols-outlined text-primary text-[22px] mb-1">sync</span>
            <h4 className="font-label-md text-[11px] text-on-surface">Effortless Returns</h4>
            <p className="font-body-sm text-[10px] text-secondary">7-day doorstep pickup</p>
          </div>
        </section>
      </main>
    </div>
  );
};
