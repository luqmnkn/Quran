import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FAQS } from '../data';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggleFAQ = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faqs" className="py-24 md:py-36 lg:py-48 bg-white border-t border-[#ECECE6] relative overflow-hidden">
      
      {/* Background radial highlight */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-[#C8A24A]/3 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header content with luxury system alignment */}
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-5">
          <div className="inline-flex items-center space-x-2 bg-[#FAFAF5] border border-[#ECECE6] px-4 py-2 rounded-full shadow-sm">
            <HelpCircle size={14} className="text-[#8A6B20]" />
            <span className="text-xs font-bold text-[#8A6B20] uppercase tracking-widest font-mono">
              Got Questions?
            </span>
          </div>
          
          <h2 className="font-display font-[900] text-3xl sm:text-[45px] text-[#0A1A14] tracking-[-0.03em] leading-[1.05]">
            Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8A6B20] via-[#C8A24A] to-[#D8BB72] underline underline-offset-8 decoration-4">Questions</span>
          </h2>
          
          <p className="text-sm sm:text-base text-[#526B62] max-w-lg mx-auto leading-relaxed">
            Find immediate answers regarding lesson formats, teacher gender options, scheduling flexibility, and billing.
          </p>
        </div>

        {/* Collapsible Accordion Grid with Framer Motion Layout */}
        <div className="space-y-4 max-w-3xl mx-auto">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className={`bg-[#FAFAF8] border rounded-2xl overflow-hidden transition-all duration-300 ${
                  isOpen ? 'border-[#C8A24A] shadow-md shadow-amber-500/5' : 'border-[#ECECE6]'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between font-display font-extrabold text-[#0A1A14] duration-200 outline-none select-none cursor-pointer"
                >
                  <span className="pr-4 text-sm sm:text-base">{faq.question}</span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                    isOpen ? 'bg-[#0A1A14] text-white' : 'bg-white border border-[#ECECE6] text-[#8A6B20]'
                  }`}>
                    {isOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 text-sm sm:text-[15px] text-[#4E625A] leading-relaxed border-t border-[#F2F2EC] pt-4 text-left">
                        <p>{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
