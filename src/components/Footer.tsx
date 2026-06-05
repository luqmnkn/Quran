import React from 'react';
import { Phone, Mail, Clock, MessageSquare, ArrowUpRight } from 'lucide-react';
import Logo from './Logo';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const target = document.querySelector(id);
    if (target) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = target.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="bg-emerald-custom-950 text-white pt-16 pb-8 border-t border-emerald-custom-900 relative">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-custom-700 via-gold-accent-500 to-emerald-custom-600"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 border-b border-white/10 pb-12 mb-10 text-left">
          
          {/* Column 1: Brand Info */}
          <div className="md:col-span-4 space-y-4">
            <a
              href="#home"
              onClick={(e) => handleLinkClick(e, '#home')}
              className="flex items-center group"
            >
              <Logo isDarkBg={true} className="transition-transform duration-300 group-hover:scale-[1.02]" />
            </a>
            
            <p className="text-xs text-emerald-custom-100/70 leading-relaxed max-w-sm">
              An international online Quran academy providing personalized 1-on-1 certified live instruction for children and adults. Helping families master Tajweed and Quran memorization at home.
            </p>
          </div>

          {/* Column 2: Quick Navigation */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="font-display font-bold text-xs uppercase tracking-widest text-gold-accent-400">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs text-emerald-custom-100/75 font-medium">
              <li>
                <a href="#home" onClick={(e) => handleLinkClick(e, '#home')} className="hover:text-white hover:underline transition-colors">Home</a>
              </li>
              <li>
                <a href="#about" onClick={(e) => handleLinkClick(e, '#about')} className="hover:text-white hover:underline transition-colors">About Us</a>
              </li>
              <li>
                <a href="#courses" onClick={(e) => handleLinkClick(e, '#courses')} className="hover:text-white hover:underline transition-colors">Programs</a>
              </li>
              <li>
                <a href="#why-us" onClick={(e) => handleLinkClick(e, '#why-us')} className="hover:text-white hover:underline transition-colors">Why Learn Here</a>
              </li>
              <li>
                <a href="#faqs" onClick={(e) => handleLinkClick(e, '#faqs')} className="hover:text-white hover:underline transition-colors">Questions</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Programs */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-display font-bold text-xs uppercase tracking-widest text-gold-accent-400">
              Our Programs
            </h4>
            <ul className="space-y-2.5 text-xs text-emerald-custom-100/75 font-medium">
              <li className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-custom-600 shrink-0"></span>
                <span>Noorani Qaida Basics</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-custom-600 shrink-0"></span>
                <span>Quran Recitation Reading</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-custom-600 shrink-0"></span>
                <span>Master Tajweed Rules</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-custom-600 shrink-0"></span>
                <span>Quran Memorization (Hifz)</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Core */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-display font-bold text-xs uppercase tracking-widest text-gold-accent-400">
              Active Support
            </h4>
            <ul className="space-y-3.5 text-xs text-emerald-custom-100/75">
              <li className="flex items-start space-x-2.5">
                <Phone size={14} className="text-gold-accent-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] block uppercase text-emerald-custom-100/40">WhatsApp Number</span>
                  <a href="https://wa.me/13156364022" target="_blank" rel="noreferrer" className="text-white hover:text-gold-accent-400 font-semibold block mt-0.5">
                    +1 (315) 636-4022
                  </a>
                </div>
              </li>

              <li className="flex items-start space-x-2.5">
                <Mail size={14} className="text-gold-accent-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] block uppercase text-emerald-custom-100/40">Email Help desk</span>
                  <a href="mailto:support@quranrise.com" className="text-white hover:text-gold-accent-400 font-semibold block mt-0.5">
                    support@quranrise.com
                  </a>
                </div>
              </li>

              <li className="flex items-start space-x-2.5">
                <Clock size={14} className="text-gold-accent-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] block uppercase text-emerald-custom-100/40">School Timing</span>
                  <p className="text-white font-medium mt-0.5">24/7 (Flexible Custom Hours)</p>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Brand Bottom line */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-custom-100/50">
          <p>© {currentYear} QuranRise Academy. All Rights Reserved. Recite with Beauty.</p>
          <div className="flex items-center space-x-4">
            <span>Designed with complete respect for Quranic learning</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
