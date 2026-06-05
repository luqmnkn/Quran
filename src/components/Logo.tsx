import React from 'react';

interface LogoProps {
  className?: string;
  isDarkBg?: boolean;
}

export default function Logo({ className = '', isDarkBg = true }: LogoProps) {
  return (
    <div id="quranrise-brand-logo" className={`flex items-center select-none ${className}`}>
      <img
        src="https://quranrise.com/wp-content/uploads/2025/05/logo-design.png.webp"
        alt="QuranRise Academy of Excellence Logo"
        referrerPolicy="no-referrer"
        loading="eager"
        className="h-9 sm:h-11 md:h-12 w-auto object-contain transition-all hover:scale-[1.01]"
        style={{
          imageRendering: 'auto',
          maxWidth: '100%',
        }}
      />
    </div>
  );
}
