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
      {/* Main floating button */}
      <a
        href="https://wa.me/13156364022"
        target="_blank"
        rel="noreferrer"
        className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 text-white flex items-center justify-center shadow-lg hover:shadow-green-500/20 hover:scale-110 active:scale-95 transition-all duration-300 relative duration-300"
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
