import React from 'react';
import logo from '../assets/images/logo.png';
interface LogoProps {
  className?: string;
  isDarkBg?: boolean;
}

export default function Logo({ className = '', isDarkBg = true }: LogoProps) {
  return (
    <div id="quranrise-brand-logo" className={`flex items-center select-none ${className}`}>
      <img
        src={logo}
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
