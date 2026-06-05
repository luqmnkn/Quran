import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Show Tooltip bubble after 5 seconds to prompt user interaction gently
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 5000);

    // Hide tooltip after 10 more seconds to prevent distraction
    const hideTimer = setTimeout(() => {
      setShowTooltip(false);
    }, 15000);

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <div className="fixed bottom-24 md:bottom-6 right-6 z-40 flex items-center group">
      {/* Interactive Tooltip Callout */}
      {showTooltip && (
        <div className="mr-3 bg-emerald-custom-950 text-white rounded-xl shadow-xl border border-white/10 p-3 text-xs font-medium max-w-xs animate-in fade-in slide-in-from-right-4 duration-300 relative">
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute -top-1.5 -right-1.5 bg-gray-600 hover:bg-gray-700 text-white rounded-full w-4 h-4 text-[9px] flex items-center justify-center outline-none border border-white/10"
          >
            ×
          </button>
          <p className="pr-1 text-left">
            Have questions? <strong className="text-gold-accent-400">Ask us on WhatsApp!</strong> We answer in minutes.
          </p>
          {/* Tooltip Arrow */}
          <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 bg-emerald-custom-950 border-r border-t border-white/10 rotate-45"></div>
        </div>
      )}

      {/* Main floating button */}
      <a
        href="https://wa.me/13156364022"
        target="_blank"
        rel="noreferrer"
        className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 text-white flex items-center justify-center shadow-lg hover:shadow-green-500/20 hover:scale-110 active:scale-95 transition-all duration-300 relative duration-300"
        onMouseEnter={() => setShowTooltip(true)}
        aria-label="Contact support on WhatsApp"
        id="whatsapp-floater"
      >
        {/* Pulsing ring indicator */}
        <span className="absolute inset-0 rounded-full border-4 border-green-500 inline-flex animate-ping opacity-60"></span>
        
        <MessageCircle size={28} className="fill-white/10 text-white stroke-[2]" />
      </a>
    </div>
  );
}
