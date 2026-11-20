import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';

export const ConciergeChatModal: React.FC = () => {
  const { isConciergeOpen, setConciergeOpen, showToast } = useShop();
  const [messages, setMessages] = useState<Array<{ sender: 'stylist' | 'user'; text: string; time: string }>>([
    {
      sender: 'stylist',
      text: 'Namaste Priya. Welcome to Her Haven Private Concierge. I am Ananya, your dedicated boutique stylist. How may I assist your wardrobe, bespoke bridal curation, or fragrance pairing today?',
      time: 'Just now',
    },
  ]);
  const [input, setInput] = useState('');

  if (!isConciergeOpen) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input.trim();
    const newMsg = {
      sender: 'user' as const,
      text: userText,
      time: 'Just now',
    };
    setMessages((prev) => [...prev, newMsg]);
    setInput('');

    // Simulate thoughtful boutique stylist reply
    setTimeout(() => {
      let reply = "Our head artisan in Lyon and master jewelers in Jaipur would love to tailor this for you. I've noted this in your Sanctuary Profile and can arrange a private preview appointment.";
      const lower = userText.toLowerCase();

      if (lower.includes('fragrance') || lower.includes('jasmine') || lower.includes('perfume') || lower.includes('scent')) {
        reply = "For fragrance layering, Jasmine Blanc pairs magnificently with warm amber and sandalwood. Its top notes of Bergamot and White Pear develop into lush Sambac Jasmine over 14 hours. Each 100ml flacon also comes with an artisanal silk scarf from Lyon.";
      } else if (lower.includes('lehenga') || lower.includes('chanderi') || lower.includes('size') || lower.includes('fit') || lower.includes('bridal')) {
        reply = "For our Celestial Organza Lehenga and Chanderi suits, we offer complimentary bespoke sizing. Our master tailor will contact you via WhatsApp for your exact blouse and skirt length measurements before dispatch.";
      } else if (lower.includes('delivery') || lower.includes('shipping') || lower.includes('time')) {
        reply = "All our boutique orders ship with priority insured dispatch. For Mumbai metro addresses, delivery typically concludes within 24 to 48 hours in our signature terracotta keepsake box.";
      } else if (lower.includes('discount') || lower.includes('coupon') || lower.includes('offer')) {
        reply = "You can use your VIP welcome privilege code HAVEN10 for a complimentary 10% privilege on orders above ₹1,999.";
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: 'stylist',
          text: reply,
          time: 'Just now',
        },
      ]);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-on-surface/50 backdrop-blur-xs"
        onClick={() => setConciergeOpen(false)}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-md bg-surface rounded-2xl shadow-2xl overflow-hidden border border-outline-variant/40 flex flex-col h-[560px] z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 bg-surface-container-high border-b border-outline-variant/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[20px]">support_agent</span>
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-600 ring-2 ring-surface"></span>
            </div>
            <div>
              <h3 className="font-headline-sm text-[16px] text-on-surface leading-tight">Haven Concierge</h3>
              <p className="font-label-sm text-[10px] text-primary flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                Senior Stylist Online
              </p>
            </div>
          </div>
          <button
            onClick={() => setConciergeOpen(false)}
            aria-label="Close concierge"
            className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-secondary hover:text-primary active:scale-95"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Chat History */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-surface-container-low/40">
          <div className="text-center my-1">
            <span className="font-label-sm text-[10px] text-secondary bg-surface px-2.5 py-0.5 rounded-full border border-outline-variant/20">
              End-to-End Encrypted Sanctuary Line
            </span>
          </div>

          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[82%] p-3 rounded-2xl text-body-sm text-[13px] leading-relaxed shadow-xs ${
                  msg.sender === 'user'
                    ? 'bg-primary text-on-primary rounded-tr-xs'
                    : 'bg-surface-container-lowest text-on-surface border border-outline-variant/30 rounded-tl-xs'
                }`}
              >
                {msg.text}
              </div>
              <span className="text-[9px] text-secondary mt-1 px-1">{msg.time}</span>
            </div>
          ))}
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-3 py-1.5 bg-surface-container-low border-t border-outline-variant/20 flex gap-1.5 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setInput('Can I customize the lehenga blouse sizing?')}
            className="shrink-0 font-label-sm text-[10px] bg-surface-container-lowest px-2.5 py-1 rounded-full border border-outline-variant/30 text-secondary hover:text-primary active:scale-95"
          >
            Bespoke Sizing
          </button>
          <button
            onClick={() => setInput('Tell me about Jasmine Blanc fragrance longevity.')}
            className="shrink-0 font-label-sm text-[10px] bg-surface-container-lowest px-2.5 py-1 rounded-full border border-outline-variant/30 text-secondary hover:text-primary active:scale-95"
          >
            Fragrance Notes
          </button>
          <button
            onClick={() => setInput('What is the shipping time to Mumbai?')}
            className="shrink-0 font-label-sm text-[10px] bg-surface-container-lowest px-2.5 py-1 rounded-full border border-outline-variant/30 text-secondary hover:text-primary active:scale-95"
          >
            Express Shipping
          </button>
        </div>

        {/* Input Field */}
        <form onSubmit={handleSend} className="p-3 bg-surface border-t border-outline-variant/30 flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your styling inquiry..."
            className="flex-1 h-11 px-3.5 bg-surface-container-low rounded-xl border border-outline-variant/40 text-on-surface font-body-sm text-[13px] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30"
          />
          <button
            type="submit"
            className="w-11 h-11 bg-primary text-on-primary rounded-xl flex items-center justify-center hover:bg-primary-container active:scale-95 transition-all shadow-sm shrink-0"
          >
            <span className="material-symbols-outlined text-[18px]">send</span>
          </button>
        </form>
      </div>
    </div>
  );
};
