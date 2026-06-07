import React from 'react';
import { motion } from 'motion/react';
import { TRUST_STATS } from '../data';
import { CheckCircle2, ShieldAlert, Award } from 'lucide-react';

export default function TrustCredibility() {
  return (
    <section id="statistics" className="py-[100px] md:py-[140px] lg:py-[180px] bg-[#0A1A14] relative overflow-hidden">
      
      {/* Luxurious Glowing Backdrops */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#C8A24A]/5 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-[#112A22]/40 rounded-full blur-[130px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Section Header with premium metrics */}
        <div className="max-w-2xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full backdrop-blur-md">
            <Award size={14} className="text-[#D8BB72]" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#D8BB72]">
              Credibility & Experience
            </span>
          </div>
          <h2 className="font-display font-[900] text-3xl sm:text-[40px] text-white tracking-[-0.03em] leading-[1.1]">
            An International Academy Built on Trust & Devotion
          </h2>
          <p className="text-sm sm:text-base text-[#89A296] max-w-lg mx-auto leading-relaxed">
            We hold ourselves to the highest benchmarks of traditional Arabic pedagogy and certified Ijazah chains.
          </p>
        </div>

        {/* Custom Bento stats grid - highly optimized to take less space on mobile */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 max-w-5xl mx-auto">
          {TRUST_STATS.map((stat, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              key={idx}
              className="bg-white/[0.02] border border-white/5 hover:border-[#C8A24A]/30 rounded-2xl sm:rounded-[28px] p-3 xs:p-4 sm:p-8 flex flex-col items-center justify-between text-center backdrop-blur-md group hover:bg-white/[0.04] transition-all duration-300 shadow-xl"
            >
              <div className="space-y-1.5 sm:space-y-3">
                <span className="font-display font-[900] text-xl xs:text-2xl sm:text-4xl lg:text-5xl text-transparent bg-clip-text bg-gradient-to-br from-[#D8BB72] to-[#8A6B20] block tracking-tighter">
                  {stat.value}
                </span>
                <h4 className="font-display font-extrabold text-[10px] xs:text-xs sm:text-sm text-white tracking-tight leading-snug">
                  {stat.label}
                </h4>
              </div>
              <p className="text-[9px] xs:text-[11px] sm:text-xs text-[#89A296] leading-normal xs:leading-relaxed mt-2.5 pt-2.5 sm:mt-4 sm:pt-4 border-t border-white/5 w-full">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Certifications Assurances Slider */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 bg-white/[0.02] border border-white/5 max-w-lg lg:max-w-3xl mx-auto p-6 sm:p-8 rounded-[28px] flex flex-col sm:flex-row items-center justify-center sm:space-x-5 space-y-4 sm:space-y-0 text-left backdrop-blur-md shadow-2xl"
        >
          <div className="w-12 h-12 rounded-xl bg-[#C8A24A]/10 border border-[#C8A24A]/20 flex items-center justify-center text-[#D8BB72] shrink-0">
            <CheckCircle2 size={24} />
          </div>
          <div className="text-xs sm:text-sm text-[#89A296] leading-relaxed">
            <strong className="text-white block font-extrabold text-[#D8BB72] mb-1 font-display">100% Authorized Ijazah Recitation Chains</strong>
            All our senior tutors hold certified chains of narration tracing back directly to classical scholars. Your family receives authentic, beautifully articulated preservation classes.
          </div>
        </motion.div>

      </div>
    </section>
  );
}
