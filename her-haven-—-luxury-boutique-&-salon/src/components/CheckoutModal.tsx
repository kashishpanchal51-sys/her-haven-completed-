import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';

export const CheckoutModal: React.FC = () => {
  const { isCheckoutOpen, setCheckoutOpen, cartItems, cartTotal, appliedCoupon, user, clearCart, navigateTo } = useShop();
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'cards' | 'netbanking' | 'cod'>('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  if (!isCheckoutOpen) return null;

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsCompleted(true);
      clearCart();
    }, 1200);
  };

  const handleClose = () => {
    setIsCompleted(false);
    setCheckoutOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-on-surface/60 backdrop-blur-xs transition-opacity"
        onClick={handleClose}
      />

      {/* Modal Sheet */}
      <div className="relative w-full max-w-md bg-surface rounded-t-2xl sm:rounded-2xl shadow-2xl border border-outline-variant/40 overflow-hidden z-10 max-h-[90vh] flex flex-col animate-in slide-in-from-bottom sm:zoom-in-95 duration-200">
        {!isCompleted ? (
          <>
            {/* Header */}
            <div className="p-4 bg-surface-container-high border-b border-outline-variant/30 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  lock
                </span>
                <h3 className="font-headline-sm text-[18px] text-on-surface">Sanctuary Checkout</h3>
              </div>
              <button
                onClick={handleClose}
                className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-secondary hover:text-primary active:scale-95"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            {/* Content Body */}
            <div className="p-4 overflow-y-auto space-y-4 flex-1">
              {/* Shipping Destination */}
              <div className="p-3.5 rounded-xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs">
                <div className="flex justify-between items-start mb-1">
                  <span className="font-label-sm text-[10px] uppercase text-primary font-bold tracking-wider">
                    Shipping Destination
                  </span>
                  <span className="font-label-sm text-[11px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded font-medium">
                    Verified Sanctuary Address
                  </span>
                </div>
                <p className="font-label-md text-label-md font-semibold text-on-surface">{user.primaryAddress.name}</p>
                <p className="font-body-sm text-[12px] text-secondary mt-0.5">{user.primaryAddress.line1}</p>
                <p className="font-body-sm text-[12px] text-secondary">
                  {user.primaryAddress.city} - {user.primaryAddress.pincode}
                </p>
                <p className="font-label-sm text-[10px] text-primary mt-2 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">local_shipping</span>
                  Complimentary Pan-India Express (24-48 Hours)
                </p>
              </div>

              {/* Items Preview */}
              <div className="p-3.5 rounded-xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs">
                <span className="font-label-sm text-[10px] uppercase text-secondary font-bold tracking-wider block mb-2">
                  Order Items ({cartItems.length})
                </span>
                <div className="space-y-2 max-h-32 overflow-y-auto no-scrollbar">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between text-body-sm text-[12px]">
                      <span className="truncate max-w-[200px] text-on-surface">
                        {item.product.name} {item.quantity > 1 ? `× ${item.quantity}` : ''}
                      </span>
                      <span className="font-semibold text-primary">₹{(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment Selection */}
              <div className="p-3.5 rounded-xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs">
                <span className="font-label-sm text-[10px] uppercase text-secondary font-bold tracking-wider block mb-2.5">
                  Select Payment Method
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`p-2.5 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                      paymentMethod === 'upi'
                        ? 'border-primary bg-primary-fixed/20 text-primary'
                        : 'border-outline-variant/40 bg-surface-container-low text-secondary'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">account_balance_wallet</span>
                    <div className="overflow-hidden">
                      <span className="font-label-md text-label-md font-bold block leading-tight">Instant UPI</span>
                      <span className="text-[9px] text-secondary">GPay, PhonePe, Paytm</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cards')}
                    className={`p-2.5 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                      paymentMethod === 'cards'
                        ? 'border-primary bg-primary-fixed/20 text-primary'
                        : 'border-outline-variant/40 bg-surface-container-low text-secondary'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">credit_card</span>
                    <div className="overflow-hidden">
                      <span className="font-label-md text-label-md font-bold block leading-tight">Debit / Credit</span>
                      <span className="text-[9px] text-secondary">Visa, Mastercard, Amex</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('netbanking')}
                    className={`p-2.5 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                      paymentMethod === 'netbanking'
                        ? 'border-primary bg-primary-fixed/20 text-primary'
                        : 'border-outline-variant/40 bg-surface-container-low text-secondary'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">account_balance</span>
                    <div className="overflow-hidden">
                      <span className="font-label-md text-label-md font-bold block leading-tight">NetBanking</span>
                      <span className="text-[9px] text-secondary">All Indian Banks</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-2.5 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                      paymentMethod === 'cod'
                        ? 'border-primary bg-primary-fixed/20 text-primary'
                        : 'border-outline-variant/40 bg-surface-container-low text-secondary'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">payments</span>
                    <div className="overflow-hidden">
                      <span className="font-label-md text-label-md font-bold block leading-tight">Bespoke COD</span>
                      <span className="text-[9px] text-secondary">Pay on Handover</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Total Summary */}
              <div className="flex justify-between items-baseline pt-2 border-t border-outline-variant/20">
                <div>
                  <span className="font-label-md text-label-md text-secondary block">Total Payable Amount</span>
                  <span className="font-label-sm text-[10px] text-secondary/80">Inclusive of all taxes & luxury gift box</span>
                </div>
                <span className="font-headline-lg-mobile text-[24px] font-bold text-primary">
                  ₹{cartTotal.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Footer CTA */}
            <div className="p-4 bg-surface-container-lowest border-t border-outline-variant/30">
              <button
                onClick={handlePlaceOrder}
                disabled={isProcessing}
                className="w-full h-12 bg-primary hover:bg-primary-container text-on-primary rounded-xl font-label-md text-label-md font-semibold flex items-center justify-center gap-2 shadow-md active:scale-98 transition-all disabled:opacity-75"
              >
                {isProcessing ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>Securing Reservation...</span>
                  </>
                ) : (
                  <>
                    <span>Confirm & Authorize Payment (₹{cartTotal.toLocaleString()})</span>
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </>
                )}
              </button>
            </div>
          </>
        ) : (
          /* Order Placed Celebration State */
          <div className="p-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 mx-auto flex items-center justify-center">
              <span className="material-symbols-outlined text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                check_circle
              </span>
            </div>

            <h3 className="font-headline-sm text-headline-sm text-on-surface">Order Reserved Successfully</h3>
            <p className="font-body-sm text-[13px] text-secondary max-w-xs mx-auto">
              Your bespoke atelier packaging is being prepared. Order <strong className="text-on-surface">#HH-9482</strong> is scheduled for express courier dispatch in 24 hours.
            </p>

            <div className="p-3.5 bg-surface-container-low rounded-xl border border-outline-variant/30 text-left text-body-sm text-[12px] space-y-1">
              <div className="flex justify-between">
                <span className="text-secondary">Recipient:</span>
                <span className="font-medium text-on-surface">{user.primaryAddress.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary">Destination:</span>
                <span className="font-medium text-on-surface">{user.primaryAddress.city}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary">Payment Method:</span>
                <span className="font-medium text-on-surface uppercase">{paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary">Packaging:</span>
                <span className="font-medium text-primary">Terracotta Keepsake Gift Box</span>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <button
                onClick={() => {
                  handleClose();
                  navigateTo('wishlist');
                }}
                className="w-full py-3 bg-primary text-on-primary rounded-xl font-label-md text-label-md font-semibold hover:bg-primary-container active:scale-98 transition-all shadow-sm"
              >
                Track In Sanctuary Hub
              </button>
              <button
                onClick={() => {
                  handleClose();
                  navigateTo('home');
                }}
                className="w-full py-2.5 bg-surface-container text-on-surface rounded-xl font-label-md text-label-md hover:bg-surface-container-high active:scale-98 transition-all"
              >
                Continue Browsing
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
