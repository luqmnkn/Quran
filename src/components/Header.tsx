import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import Logo from './Logo';

interface HeaderProps {
  onOpenTrialModal: () => void;
  currentPage: 'home' | 'pricing' | 'blogs';
  activeSection: 'home' | 'pricing' | 'courses' | 'blogs';
  onNavigate: (page: 'home' | 'pricing' | 'blogs', sectionId?: string) => void;
}

export default function Header({ onOpenTrialModal, currentPage, activeSection, onNavigate }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', page: 'home' as const, activeKey: 'home' as const, href: '#home' },
    { name: 'Pricing', page: 'pricing' as const, activeKey: 'pricing' as const, href: '#pricing' },
    { name: 'Courses', page: 'home' as const, activeKey: 'courses' as const, href: '#courses' },
    { name: 'Blogs', page: 'blogs' as const, activeKey: 'blogs' as const, href: '#blogs' }
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, page: 'home' | 'pricing' | 'blogs', href: string) => {
    e.preventDefault();
    onNavigate(page, href);
  };

  return (
    <div className="fixed top-4 left-0 right-0 z-40 flex justify-center px-1.5 xs:px-4">
      <div
        className={`flex items-center justify-between sm:justify-start gap-2 sm:gap-8 glassmorphic-nav rounded-full px-3 sm:px-6 shadow-[0_8px_32px_rgba(10,26,20,0.06)] transition-all duration-300 border backdrop-blur-xl w-[96%] sm:w-auto max-w-[560px] sm:max-w-none ${
          isScrolled
            ? 'bg-white/95 border-[#C8A24A]/25 shadow-[0_12px_40px_rgba(10,26,20,0.12)] h-14 md:h-16'
            : 'bg-white/80 border-[#ECECE6] h-14 md:h-16'
        }`}
      >
        {/* Logo permanently on the left side of the navbar */}
        <a
          href="#home"
          onClick={(e) => handleLinkClick(e, 'home', '#home')}
          className="flex items-center shrink-0 pr-1"
        >
          <Logo isDarkBg={false} className="h-4.5 xs:h-5 sm:h-7" />
        </a>

        {/* Minimal Links on the right of the logo */}
        <nav className="flex items-center space-x-2.5 sm:space-x-6">
          {navLinks.map((link) => {
            const isActive = activeSection === link.activeKey;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.page, link.href)}
                className={`font-display uppercase text-[9.5px] sm:text-xs tracking-wider sm:tracking-widest transition-all duration-300 relative py-1.5 ${
                  isActive
                    ? 'text-[#010804] font-[900] pointer-events-none'
                    : 'text-[#4E625A] hover:text-[#C8A24A] font-[600]'
                }`}
              >
                <span>{link.name}</span>
                {isActive && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#C8A24A] rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
