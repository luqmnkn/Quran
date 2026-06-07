import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TESTIMONIALS } from '../data';
import { Star, Quote } from 'lucide-react';
import PremiumCarousel from './PremiumCarousel';

export default function Testimonials() {
  const [activeTab, setActiveTab] = useState<'all' | 'Parent' | 'Adult Student'>('all');

  const filtered = activeTab === 'all'
    ? TESTIMONIALS
    : TESTIMONIALS.filter(t => t.role === activeTab);

  const renderCardContent = (testimonial: typeof TESTIMONIALS[0]) => (
    <div className="bg-[#FAFAF8] rounded-2xl border border-[#ECECE6] p-6 sm:p-7 md:p-8 flex flex-col justify-between h-full relative overflow-hidden group hover:border-[#C8A24A]/40 hover:shadow-[0_15px_35px_rgba(200,162,74,0.06)] transition-all duration-300 text-left min-h-[260px]">
      {/* Decorative styling */}
      <Quote className="absolute -bottom-6 -right-6 w-24 h-24 text-[#C8A24A]/5 select-none" />

      <div className="space-y-3 relative z-10">
        {/* Five Star rating */}
        <div className="flex items-center space-x-0.5">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} size={13} className="text-[#C8A24A] fill-[#C8A24A]" />
          ))}
        </div>

        {/* Feedback block */}
        <p className="text-xs sm:text-sm text-[#2C3B35] leading-relaxed italic font-medium">
          "{testimonial.feedback}"
        </p>
      </div>

      {/* Profile info block */}
      <div className="flex items-center space-x-3 pt-4 border-t border-[#ECECE6] relative z-10 mt-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0A1A14] to-[#122F24] text-white flex items-center justify-center font-display font-black text-xs select-none shadow">
          {testimonial.avatarInitials}
        </div>
        <div>
          <h4 className="font-display font-[800] text-[#0A1A14] text-xs">
            {testimonial.name}
          </h4>
          <p className="text-[9px] font-mono font-bold uppercase text-[#8A6B20] tracking-wider mt-0.5">
            {testimonial.role} • {testimonial.location}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <section className="py-[100px] md:py-[140px] lg:py-[180px] bg-white relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C8A24A]/3 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Header display segment */}
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-6">
          <div className="inline-flex items-center space-x-2 bg-[#FAFAF5] border border-[#ECECE6] px-4 py-2 rounded-full shadow-sm">
            <Quote size={14} className="text-[#8A6B20]" />
            <span className="text-xs font-bold text-[#8A6B20] uppercase tracking-widest font-mono">
              Success Stories
            </span>
          </div>
          
          <h2 className="font-display font-[900] text-3xl sm:text-[45px] lg:text-[64px] text-[#0A1A14] tracking-[-0.04em] leading-[1.05]">
            Hear From Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8A6B20] via-[#C8A24A] to-[#D8BB72] underline underline-offset-8 decoration-4">Quran Learners</span>
          </h2>
          
          <p className="font-sans font-medium text-[18px] text-[#526B62] max-w-lg mx-auto leading-relaxed">
            Discover how school children and adults are improving Arabic letter articulation and Tajweed rules at home.
          </p>

          {/* Filtering tabs */}
          <div className="flex items-center justify-center gap-2 pt-6">
            {(['all', 'Parent', 'Adult Student'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-350 border cursor-pointer ${
                  activeTab === tab
                    ? 'bg-[#0A1A14] text-white border-[#0A1A14] shadow'
                    : 'bg-[#FAFAF8] text-[#526B62] border-[#ECECE6] hover:bg-[#F2F2EC]'
                }`}
              >
                {tab === 'all' ? 'All Reviews' : `${tab}s`}
              </button>
            ))}
          </div>
        </div>

        {/* 1. DESKTOP VIEW: Adaptive Grid Layout */}
        <div className="hidden lg:grid grid-cols-2 gap-8 max-w-5xl mx-auto">
          <AnimatePresence mode="popLayout">
            {filtered.map((testimonial) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                key={testimonial.id}
              >
                {renderCardContent(testimonial)}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* 2. MOBILE VIEW: Horizontal Snap-Center Carousel */}
        <div className="block lg:hidden">
          <PremiumCarousel key={activeTab}>
            {filtered.map((testimonial) => (
              <div key={testimonial.id} className="h-full">
                {renderCardContent(testimonial)}
              </div>
            ))}
          </PremiumCarousel>
        </div>

      </div>
    </section>
  );
}
