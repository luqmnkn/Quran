import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import Logo from './Logo';

interface HeaderProps {
  onOpenTrialModal: () => void;
}

export default function Header({ onOpenTrialModal }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Courses', href: '#courses' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      const headerOffset = 100;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="fixed top-4 left-0 right-0 z-40 flex justify-center px-4">
      <div
        className={`flex items-center gap-5 sm:gap-8 glassmorphic-nav rounded-full px-5 sm:px-6 shadow-2xl transition-all duration-300 border border-white/[0.08] backdrop-blur-xl ${
          isScrolled
            ? 'bg-[#05110E]/95 shadow-[0_12px_40px_rgba(0,0,0,0.5)] h-14 md:h-16 border-white/15'
            : 'bg-[#05110E]/60 h-14 md:h-16'
        }`}
        style={{
          maxWidth: 'fit-content',
          width: 'auto',
        }}
      >
        {/* Logo permanently on the left side of the navbar */}
        <a
          href="#home"
          onClick={(e) => handleLinkClick(e, '#home')}
          className="flex items-center shrink-0"
        >
          <Logo isDarkBg={true} className="h-6 sm:h-7" />
        </a>

        {/* Minimal Links on the right of the logo */}
        <nav className="flex items-center space-x-4 sm:space-x-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="font-display font-black text-[10px] sm:text-xs uppercase tracking-widest text-[#89A296] hover:text-[#C8A24A] transition-colors duration-200"
            >
              {link.name}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
